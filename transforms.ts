import Bun from "bun";

await Bun.build({
  entrypoints: [
    "./public/linkedin.css",
  ],
  outdir: "./build",
  minify: true,
  splitting: true,
  sourcemap: "none",
  format: "esm",
  target: "browser",
  // loader: {
  //   ".css": "css",
  // },
  // --css-chunking
});
