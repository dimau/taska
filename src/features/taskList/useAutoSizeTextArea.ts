import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  minHeight: number | null = null,
  maxHeight: number | null = null
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      let scrollHeight = textAreaRef.scrollHeight;

      // Apply min-height and max-height if it's specified
      if (minHeight && scrollHeight < minHeight) scrollHeight = minHeight;
      if (maxHeight && scrollHeight > maxHeight) scrollHeight = maxHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
