const KEY = "mindmate_entries";

export function getEntries() {
  const raw =
    localStorage.getItem(KEY);

  return raw
    ? JSON.parse(raw)
    : [];
}

export function saveEntries(
  entries: unknown[]
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(entries)
  );
}