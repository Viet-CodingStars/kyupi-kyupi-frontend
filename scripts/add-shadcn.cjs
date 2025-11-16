#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require("child_process");

const components = process.argv.slice(2);

if (components.length === 0) {
  console.error(
    "Usage: pnpm run shadcn:add <component> [component2] [component3]..."
  );
  console.error("Example: pnpm run shadcn:add button input card");
  process.exit(1);
}

try {
  // Add shadcn components
  console.log(`Adding components: ${components.join(", ")}...`);
  execSync(`npx shadcn@latest add ${components.join(" ")}`, {
    stdio: "inherit",
    cwd: process.cwd(),
  });

  // Generate exports
  execSync("node scripts/generate-shadcn-exports.cjs", {
    stdio: "inherit",
    cwd: process.cwd(),
  });

  console.log("\n✓ Done!");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
