import { createRoot } from 'react-dom/client';
import type { JSX } from 'react/jsx-runtime';
import App from './app.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  const target = document.getElementById('root')!;
  createRoot(target).render(<App />);
}

export async function prerender(data: JSX.IntrinsicAttributes) {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { parseLinks } = await import('vite-prerender-plugin/parse');

  const html = await renderToStaticMarkup(<App {...data} />);
  const links = parseLinks(html);

  return { html, links: new Set(links) };
}
