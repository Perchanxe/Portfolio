import { defineConfig } from "vite";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";
import glob from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all HTML files in the site directory
const siteHtmlFiles = glob
  .sync("site/**/*.html")
  .map((file) => [
    relative("site", file).replace(/\.html$/, ""), // key
    resolve(__dirname, file),                     // absolute path
  ]);

// Combine with root index.html
const htmlFiles = Object.fromEntries([
  ["index", resolve(__dirname, "index.html")],
  ...siteHtmlFiles,
]);

export default defineConfig({
  // remove tailwind plugin if you aren't using it
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
