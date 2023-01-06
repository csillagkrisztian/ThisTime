export const getTime = (date = new Date()) => {
  const dateTime = new Date(date).toLocaleString("en-US", { hour12: false });
  const timeArray = dateTime.split(" ")[1].split(":");
  return `${timeArray[0] === "24" ? "00" : timeArray[0]}:${timeArray[1]}`;
};
