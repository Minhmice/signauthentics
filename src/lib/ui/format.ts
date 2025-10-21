export function formatDate(dateISO: string, locale: string = "vi") {
  const d = new Date(dateISO);
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(d);
}

export function compactNumber(value: number, locale: string = "en") {
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(value);
}


