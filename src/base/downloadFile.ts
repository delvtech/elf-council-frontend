export enum DownloadType {
  CSS = "css",
  CSV = "csv",
  HTML = "html",
  JPG = "jpg",
  JS = "js",
  JSON = "json",
  JSX = "jsx",
  PNG = "png",
  SVG = "svg",
  TEXT = "txt",
  TS = "ts",
  TSX = "tsx",
  WEBP = "webp",
}

const MIMETypes = {
  css: "text/css",
  csv: "text/csv",
  html: "text/html",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "text/json",
  jsx: "text/javascript",
  png: "image/png",
  svg: "image/svg+xml",
  ts: "text/javascript",
  tsx: "text/javascript",
  txt: "text/plain",
  webp: "image/webp",
};

export function getDownloadLink(
  content: string,
  type: DownloadType = DownloadType.TEXT,
): string {
  return `data:${MIMETypes[type]};charset=utf-8,${encodeURIComponent(content)}`;
}

export default function downloadFile(
  name: string,
  content: string,
  type: DownloadType = DownloadType.TEXT,
): void {
  const link = document.createElement("a");
  link.setAttribute("href", getDownloadLink(content, type));
  link.setAttribute("download", `${name}.${type}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
