export function getPreviousMonth(year, month) {
  const currentDate = new Date(year, month - 1, 1);
  currentDate.setMonth(currentDate.getMonth() - 1);

  const prevYear = currentDate.getFullYear();
  const prevMonth = currentDate.getMonth() + 1;

  return { prevYear, prevMonth };
}
