import esbuild from "esbuild";
import fs from "fs-extra";
import { globby } from "globby";

/**
 * Clean dist
 */
await fs.remove("dist");

/**
 * Collect all file path
 */
const entryPoints = await globby("src/**/*.ts", { ignore: ["**/*.d.ts"] });

/**
 * Build app
 */
await esbuild.build({
  entryPoints,
  bundle: false,
  platform: "node",
  target: "node20",
  format: "esm",
  outdir: "dist",
});
