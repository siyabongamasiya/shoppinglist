// Returns today's date as "YYYY-MM-DD"
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Generates a unique ID as a string
export function generateUniqueId(): string {
  return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
