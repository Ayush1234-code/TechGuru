import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const port = process.env.PORT || 4173;
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

createServer((req, res) => {
  const requested = normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, requested === "/" ? "index.html" : requested);
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) filePath = join(root, "index.html");
  res.setHeader("Content-Type", types[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).on("error", () => {
    res.statusCode = 500;
    res.end("Unable to read asset");
  }).pipe(res);
}).listen(port, () => {
  console.log(`Tech Guru frontend running at http://localhost:${port}`);
});
