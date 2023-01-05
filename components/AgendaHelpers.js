export const parseDay = (day) => {
  const date = new Date(day.timestamp + 0 * 24 * 60 * 60 * 1000);
  return date.toISOString().split("T")[0];
};
