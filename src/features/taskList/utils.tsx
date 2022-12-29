const daysRussian = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const monthsRussian = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// Prettier for dates in task list
// Function waiting for the string like "2022-12-19T00:00:00.000Z" and return "19.12.2022, вторник"
export function datePrettier(uglyDate: string | undefined): string {
  if (!uglyDate || uglyDate === "undefined") return "Без даты";

  const date = new Date(uglyDate);
  return `${date.getDate()} ${
    monthsRussian[date.getMonth()]
  } ${date.getFullYear()}, ${daysRussian[date.getDay()]}`;
}
