import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import type { JSX } from "react/jsx-runtime";

if (typeof window !== "undefined") {
  const target = document.getElementById("root")!;

  createRoot(target).render(<App />);
}

export async function prerender(data: JSX.IntrinsicAttributes) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = await renderToString(<App {...data} />);
  const links = parseLinks(html);

  return { html, links: new Set(links) };
}
