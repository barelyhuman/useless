import parse from "date-fns/parse";

export default function timestringParser(
  timestring: string,
  refDate = new Date()
) {
  const parsers = ["HH:mm:ss", "HH:mm:ssx", "HH:mm:ssxxx"];
  const validDate = parsers
    .map((parser) => {
      try {
        const val = parse(timestring, parser, new Date(refDate));
        return String(val).startsWith("Invalid Date") ? null : val;
      } catch (err) {
        return null;
      }
    })
    .find((x) => x);

  return validDate;
}
