import { ReactElement } from "react";

export function Spinner(): ReactElement {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className="w-8 h-8 border-2 m-auto border-blue-400 border-solid rounded-full animate-spin"
    />
  );
}
