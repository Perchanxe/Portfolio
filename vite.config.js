import { defineConfig } from "vite";
import { resolve } from 'path';
import { glob } from 'glob';
import path from 'path';

// Find all HTML files in the site directory
const siteHtmlFiles = glob.sync('site/**/*.html').map(file => [
    path.relative('site', file).replace(/\.html$/, ''),
    resolve(__dirname, file)
]);

// Combine with root index.html
const htmlFiles = Object.fromEntries([
    ['index', resolve(__dirname, 'index.html')], // Root index.html
    ...siteHtmlFiles
]);

export default defineConfig({
    build: {
        rollupOptions: {
            input: htmlFiles
        }
    }
});