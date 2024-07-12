export function formatDateAndTime(dateTime: any) {
  const data = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
  };
  if (data) {
    return dateTime?.toLocaleString(undefined, data);
  }
}
