import endOfMonth from "date-fns/endOfMonth";

export default function toUTCEndOfMonth(date: Date) {
  date = new Date(date);
  const offset = date.getTimezoneOffset();
  const endDate = endOfMonth(date);
  return new Date(
    new Date(endDate).setMinutes(new Date(endDate).getMinutes() - offset)
  );
}
