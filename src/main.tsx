import { createRoot } from 'react-dom/client';
import type { JSX } from 'react/jsx-runtime';
import './index.css';
import { Root } from './root.tsx';

if (typeof window !== 'undefined') {
  const target = document.getElementById('root')!;
  createRoot(target).render(<Root />);
}

export async function prerender(data: JSX.IntrinsicAttributes) {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { parseLinks } = await import('vite-prerender-plugin/parse');

  const html = await renderToStaticMarkup(<Root {...data} />);
  const links = parseLinks(html);

  return { html, links: new Set(links) };
}
