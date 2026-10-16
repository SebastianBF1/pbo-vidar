// Runs after the static export (GitHub Pages build). Writes the root redirect page and .nojekyll.
import { copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = "out";
if (!existsSync(out)) throw new Error("out/ not found — run the pages build first");

// `/` → `/en/` (relative, so it works under any base path). Meta refresh + JS + a visible link.
writeFileSync(
  `${out}/index.html`,
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PBO VIDAR</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=./en/">
<link rel="canonical" href="./en/">
<style>html,body{margin:0;height:100%;background:#051019;color:#9caab2;font:14px/1.5 system-ui,sans-serif}body{display:grid;place-items:center}a{color:#1ed6f2}</style>
<script>location.replace("./en/" + location.hash);</script>
</head>
<body><a href="./en/">PBO VIDAR</a></body>
</html>
`,
);
writeFileSync(`${out}/.nojekyll`, "");

// Segment prefetch files: the export writes them nested (`__next.$d$locale/__PAGE__.txt`) but the client
// requests them flat (`__next.$d$locale.__PAGE__.txt`). Write a flat copy next to each nested one so
// prefetching works on a plain static host (otherwise every prefetch 404s and falls back to a full fetch).
let flattened = 0;
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      const files = (d) =>
        readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(d, e.name)) : [join(d, e.name)]));
      for (const file of files(full)) {
        const flat = join(dir, `${entry.name}.${relative(full, file).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(file, flat);
          flattened++;
        }
      }
    } else {
      walk(full);
    }
  }
};
walk(out);
console.log(`postexport: wrote out/index.html, out/.nojekyll, ${flattened} flat prefetch segment files`);
