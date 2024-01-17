export const getTime = (date) => {
  const DateFormat = new Date(date);
  const year = DateFormat.getFullYear();
  const month = DateFormat.getMonth();
  const day = DateFormat.getDate();
  return `${normalize(day)}.${normalize(month + 1)}.${year}`;
}

const normalize = (num) => num < 10 ? `0${num}` : num;