/** Join class names, dropping falsey entries. Tiny classnames/clsx stand-in. */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
