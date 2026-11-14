import pt from '../data/strings.pt-BR.json';

type Key = keyof typeof pt;

/** Look up a UI string and fill `{name}` placeholders. */
export function t(key: Key | string, vars: Record<string, string | number> = {}): string {
  const raw = (pt as Record<string, string>)[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
