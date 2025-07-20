export const textToHtml = (text?: string): string =>
  text && text.length > 0
    ? text
        .split("\n")
        .map((d) => `<div>${d === "" ? "<br>" : d}</div>`)
        .join("")
    : text || "";

export const htmlToText = (html: string): string =>
  html
    .replace(/<br>/g, "\n")
    .replace(/<\/?div>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
