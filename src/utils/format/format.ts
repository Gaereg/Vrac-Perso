export const formatTime = (
  time: number,
  format: "hh:mm" | "mm:ss" = "hh:mm"
): string => {
  const dateObj = new Date(time * 1000);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  if (format === "hh:mm") {
    return `${doubleDigit(hours)}:${doubleDigit(minutes)}`;
  }
  return `${doubleDigit(minutes)}:${doubleDigit(seconds)}`;
};

// receive 1 return '01'
const doubleDigit = (number: number):string => `${number < 10 ? `0${number}`: number}`; 