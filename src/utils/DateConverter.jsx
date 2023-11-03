export const DateConverter = (timeInMillis) => {

  const localDate = new Date(timeInMillis);
  const year = localDate.getFullYear();
  const month = localDate.getMonth() + 1;
  const day = localDate.getDate() < 10 ? "0" + localDate.getDate() : localDate.getDate();
  const hours = ("0" + localDate.getHours()).slice(-2);
  const minutes = ("0" + localDate.getMinutes()).slice(-2);
  const today = new Date().getDate();

  if (day === today) {
    return `${hours}:${minutes}`;
  } else {
    return `${year}.${month}.${day}`;
  }
}
