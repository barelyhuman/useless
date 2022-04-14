export default function classnames(...args: (string | object)[]) {
  const classlist = [];
  for (let index = 0; index < args.length; index++) {
    const classNameExpr = args[index];
    if (typeof classNameExpr === "string") {
      const _normalise = classNameExpr.trim();
      _normalise.length && classlist.push(_normalise);
    }
    if (typeof classNameExpr === "object") {
      Object.keys(classNameExpr).forEach((_className) => {
        const condition = classNameExpr[_className];
        if (condition) {
          classlist.push(_className);
        }
      });
    }
  }

  return classlist.join(" ");
}
