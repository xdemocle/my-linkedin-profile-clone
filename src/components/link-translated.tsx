import { useLocale } from '@/hooks';
import { getPageUrlFromPath } from '@/lib';
import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'wouter';

interface LinkTranslatedProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children?: React.ReactNode;
}

/**
 * A locale-aware Link component that automatically adds the current locale prefix to URLs.
 *
 * Usage:
 * ```tsx
 * <LinkTranslated href="/experience">Experience</LinkTranslated>
 * // On /it/ context: renders as <Link href="/it/experience">
 * // On /en/ context: renders as <Link href="/experience">
 * ```
 */
export function LinkTranslated({ href, children, ...props }: LinkTranslatedProps) {
  const { locale } = useLocale();

  // Convert the href to a locale-aware URL
  const localizedHref = getPageUrlFromPath(locale, href);

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
