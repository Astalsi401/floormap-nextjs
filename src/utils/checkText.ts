export const checkText = ({
  targets,
  keyword,
}: {
  targets: (string | undefined)[];
  keyword: RegExp;
}) =>
  keyword.test(
    targets
      .filter((t) => Boolean(t))
      .join(" ")
      .replace(/\r|\n/g, "")
      .replace(/臺/g, "台")
  );
