"use client";

import { RefObject, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { textToHtml } from "@/utils/text-to-html";

export const ContentEdit: React.FC<{
  value: string;
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  wrap?: boolean;
}> = ({ value, className, onChange, placeholder, wrap = true }) => {
  const text = useRef<string>(value);
  const html = useRef<string>(textToHtml(value));
  const container = useRef<HTMLDivElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    if (!container.current) return;
    // update display html
    const currHtml = e.target.value;
    html.current = /^(<div><br><\/div>|<br>)$/g.test(currHtml)
      ? ""
      : wrap
      ? currHtml
      : currHtml.replace(/<\/?[a-z]+>/g, "");
    // update current value (actual string db use)
    const currText = (
      (wrap ? container.current.innerText : container.current.textContent) || ""
    ).replace(/^\n$/, "");
    text.current = currText;
    onChange?.(currText);
  };

  return (
    <ContentEditable
      className={className}
      innerRef={container as RefObject<HTMLDivElement>}
      html={html.current}
      onChange={handleChange}
      data-placeholder={placeholder}
    />
  );
};
