import { useCallback, useEffect, useRef, useState } from "react";

interface UseUploaderOptions {
  accept?: string | string[];
}

// TODO:
//  - upload function to handle dropped files
export default function useFile(options?: UseUploaderOptions): {
  file?: string | ArrayBuffer,
  openFileBrowser: () => void
} {
  const [file, setFile] = useState<string | ArrayBuffer>();
  const { accept } = options || {};
  const inputRef = useRef<HTMLInputElement | null>();

  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = handleChange;
    input.style.cssText = `
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      overflow: hidden;
      pointer-events: none;
    `
    if (accept) {
      input.setAttribute("accept", accept.toString());
    }
    inputRef.current = input;
  }, [accept]);

  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const fileReader = new FileReader();
    if (input.files && input.files.length) {
      fileReader.readAsText(input.files[0], "UTF-8");
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) setFile(e.target.result);
      };
    }
  };

  const openFileBrowser = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    inputRef.current = document.body.appendChild(inputRef.current);
    inputRef.current.click();
    inputRef.current.remove();
  }, []);

  return {
    file,
    openFileBrowser,
  };
}
