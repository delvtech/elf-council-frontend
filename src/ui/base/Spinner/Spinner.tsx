import { ReactElement } from "react";

export function Spinner(): ReactElement {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className="m-auto h-8 w-8 animate-spin rounded-full border-2 border-solid border-blue-400"
    />
  );
}
