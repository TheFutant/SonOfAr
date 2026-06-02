# Telemetry log drain → Logflare

Durable capture of the anonymous `USAGE` telemetry (`src/utils/usage.ts` →
nginx `usage_fmt` → container stdout) into a **dedicated Logflare source** for
sonofar.

## Why a sonofar-specific shipper

The org-wide `montejirasim-log-shipper` (in the same `personal` Fly org) reads
`logs.>` and forwards the whole org stream to the *montejirasim* Logflare
source — so it already captures sonofar's `USAGE` lines too. That's fine for a
quick look, but mixes sonofar in with montejirasim/bunn-forecast.

`sonofar-log-shipper` is a second, scoped shipper: `SUBJECT=logs.sonofar.>`
means it forwards **only** sonofar's logs, into sonofar's own source. (The
org-wide shipper still also copies sonofar into the montejirasim source — a
harmless duplicate you can filter out there, or remove later by narrowing that
shipper.)

## Sink: Logflare source

- **Source:** `sonofar`
- **Source token (`LOGFLARE_SOURCE_TOKEN`):** `481371d1-c1b2-4fe0-bd2d-287689aa9ab1`
- **Ingest key (`LOGFLARE_API_KEY`):** the same Logflare *account* ingest key
  already used by `montejirasim-log-shipper` — Logflare ingest is keyed by the
  account API key + a per-source token, so only the source token differs.

## Provision (one-time — needs Fly + the Logflare ingest key)

From `log-shipper/`:

1. **Create the app** (config in `log-shipper/fly.toml`):
   ```fish
   cd log-shipper
   fly apps create sonofar-log-shipper
   ```

2. **Fly org read token** — lets the shipper read the log stream:
   ```fish
   fly secrets set ACCESS_TOKEN=(fly tokens create readonly personal) -a sonofar-log-shipper
   ```

3. **Logflare + scope** — source token, the shared ingest key, and the
   sonofar-only subject:
   ```fish
   fly secrets set \
     LOGFLARE_API_KEY=<same-ingest-key-as-montejirasim> \
     LOGFLARE_SOURCE_TOKEN=481371d1-c1b2-4fe0-bd2d-287689aa9ab1 \
     SUBJECT=logs.sonofar.> \
     -a sonofar-log-shipper
   ```

4. **Deploy:**
   ```fish
   fly deploy -a sonofar-log-shipper
   ```

No secret is ever committed — everything is a `fly secrets` value.

## Isolate the USAGE lines

The drain ships *all* sonofar stdout (nginx also logs normal access lines). The
telemetry records are single JSON lines prefixed `USAGE ` (see
`src/utils/usage.ts` / `nginx.conf`). In Logflare, filter the source on the
message containing `USAGE` (then parse the trailing JSON: `app`, `evt`, `lbl`,
`ts`). The records self-identify with `"app":"sonofar"` regardless of Fly
metadata.

## Verify

1. Hit a beacon: `curl "https://sonofar.fly.dev/t?evt=session_start"` (or open
   the site — `session_start` fires on load, `ending`/`detour` as you play).
2. Confirm the line on the machine: `fly logs -a sonofar | grep USAGE`.
3. In the **sonofar** Logflare source, confirm `USAGE` records arrive within
   seconds, tagged `"app":"sonofar"`.

## Events

`session_start` (once per page load), `new_game`, `ending` (label = ending id),
`detour` (entering the optional Drive). To add one: extend the `UsageEvent`
union in `src/utils/usage.ts` **and** the `map $arg_evt $usage_evt` whitelist in
`nginx.conf` — an event missing from either is silently dropped.
