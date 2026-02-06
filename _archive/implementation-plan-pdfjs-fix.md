# Implementation Plan: Fix pdfjs-dist Webpack Parsing Error

## Problem Analysis
The error occurs because:
1. **`pdfjs-dist@2.16.105`** uses private class fields (`#docId`) and optional chaining (`?.`)
2. **Next.js 10.2.3** uses **Webpack 4** by default.
3. Webpack 4's JavaScript parser doesn't understand private class fields syntax without transpilation.
4. The project's custom `next.config.js` forces Webpack 4.

## Proposed Solution: Solution B (Use Legacy Build)
The `pdfjs-dist` package includes a **legacy build** at `pdfjs-dist/legacy/build/pdf` that's transpiled for older JavaScript environments.

## File Structure
- `components/logic/extractText.js`: Modify imports and worker configuration.

## Step-by-Step Instructions

1.  **Update `components/logic/extractText.js`**:
    - Change `import("pdfjs-dist/build/pdf")` to `import("pdfjs-dist/legacy/build/pdf")`.
    - Update `pdfjsLib.GlobalWorkerOptions.workerSrc` to use the legacy worker URL: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.legacy.min.js`.

2.  **Clear Next.js Build Cache**:
    - Delete the `.next` directory to ensure a fresh build.

3.  **Verification**:
    - Restart the development server.
    - Test PDF file upload and text extraction.

## Verification Steps
1. Run `pnpm dev`.
2. Open the application.
3. Navigate to "Custom Text Mode".
4. Upload a PDF file.
5. Verify that the text is extracted and displayed for typing without any Webpack errors in the console.
