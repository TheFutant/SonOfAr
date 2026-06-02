// Anonymous usage telemetry. Mirrors MonteJiraSim's usage.py contract: answers
// "did anyone use this, and which surfaces?" and nothing more. By design it
// records NO identity — no name, IP, save contents, or free text — only an
// event name and an optional low-cardinality label (e.g. an ending id).
//
// We're a static SPA, so there's no server process to print() a line. Instead
// the browser fires a fire-and-forget beacon to `/t?evt=<event>[&lbl=<label>]`;
// nginx turns each *known* event into a single `USAGE {json}` stdout line (see
// nginx.conf), which the org-wide fly-log-shipper forwards to Logflare with no
// per-app wiring. Beacons are best-effort: failures (e.g. local `npm run dev`,
// where there is no nginx and `/t` 404s) are swallowed.

export type UsageEvent = "session_start" | "new_game" | "ending" | "detour";

function beacon(evt: UsageEvent, lbl?: string): void {
  const qs = new URLSearchParams({ evt });
  // nginx only honours labels matching ^[a-z0-9_]{1,40}$; anything else is dropped.
  if (lbl) qs.set("lbl", lbl);
  const url = `/t?${qs.toString()}`;
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      void fetch(url, { method: "GET", keepalive: true, cache: "no-store" });
    }
  } catch {
    // Telemetry must never break the app.
  }
}

let sessionLogged = false;

/** One `session_start` per page load (deduped so React StrictMode double-mounts
 *  and re-renders stay silent). */
export function trackSession(): void {
  if (sessionLogged) return;
  sessionLogged = true;
  beacon("session_start");
}

/** A one-off feature/surface event (a new game, an ending reached, a detour). */
export function trackEvent(evt: UsageEvent, lbl?: string): void {
  beacon(evt, lbl);
}
