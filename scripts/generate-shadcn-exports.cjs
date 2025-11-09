#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const shadcnDir = path.join(__dirname, "../src/shared/ui/base");
const indexPath = path.join(shadcnDir, "index.ts");

// Get all .tsx files in the shadcn directory (excluding index.ts)
const componentFiles = fs
  .readdirSync(shadcnDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => path.basename(file, ".tsx"))
  .sort();

// Read existing index.ts content
let existingContent = "";
let existingExports = new Set();

if (fs.existsSync(indexPath)) {
  existingContent = fs.readFileSync(indexPath, "utf-8");

  // Extract existing exports using regex
  // Matches: export * from './filename'; or export { ... } from './filename';
  const exportRegex = /export\s+(?:\*|{[^}]*})\s+from\s+['"]\.\/(.*?)['"]/g;
  let match;

  while ((match = exportRegex.exec(existingContent)) !== null) {
    existingExports.add(match[1]);
  }
}

// Find new components that need to be exported
const newComponents = componentFiles.filter(
  (component) => !existingExports.has(component)
);

if (newComponents.length === 0) {
  console.log(
    "✓ No new components to export. All components are already exported."
  );
  process.exit(0);
}

// Generate new export statements
const newExportStatements = newComponents
  .map((file) => `export * from './${file}';`)
  .join("\n");

// Append new exports to existing content
const updatedContent =
  existingContent.trimEnd() + "\n" + newExportStatements + "\n";

// Write to index.ts
fs.writeFileSync(indexPath, updatedContent);

console.log(
  `✓ Added ${newComponents.length} new export(s): ${newComponents.join(", ")}`
);
