import startOfMonth from "date-fns/startOfMonth";

export default function toUTCStartOfMonth(date: Date) {
  date = new Date(date);
  const offset = date.getTimezoneOffset();
  const startDate = startOfMonth(date);
  return new Date(
    new Date(startDate).setMinutes(new Date(startDate).getMinutes() - offset)
  );
}
