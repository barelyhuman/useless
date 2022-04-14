export default function toTitleCase(toConvert: string) {
  return toConvert
    .split(/[_ ]/g)
    .map((item) => {
      if (!item.length) {
        return "";
      }
      return item[0].toUpperCase() + item.slice(1);
    })
    .join(" ");
}
