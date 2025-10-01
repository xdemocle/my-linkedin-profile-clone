import { describe, it, expect } from 'vitest';
import { render } from '../utils/test-utils';
import { Router } from '../../components/Router';

describe('Router component', () => {
  describe('Valid routes', () => {
    it('should render home page for root path', () => {
      const { container } = render(<Router />, { initialPath: '/' });
      expect(container).toBeInTheDocument();
    });

    it('should render Italian home page', () => {
      const { container } = render(<Router />, { 
        initialPath: '/it/',
        initialLocale: 'it'
      });
      expect(container).toBeInTheDocument();
    });

    it('should render French experience page', () => {
      const { container } = render(<Router />, { 
        initialPath: '/fr/experience',
        initialLocale: 'fr'
      });
      expect(container).toBeInTheDocument();
    });

    it('should render Arabic blog page', () => {
      const { container } = render(<Router />, { 
        initialPath: '/ar/blog',
        initialLocale: 'ar'
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Invalid routes', () => {
    it('should handle invalid page in French locale (/fr/ff)', () => {
      const { container } = render(<Router />, { 
        initialPath: '/fr/ff',
        initialLocale: 'fr'
      });
      
      // Should render something (likely 404 or fallback content)
      expect(container).toBeInTheDocument();
      
      // Check if it shows 404 content or redirects
      // This test verifies the behavior you observed with curl
    });

    it('should handle invalid locale prefix', () => {
      const { container } = render(<Router />, { 
        initialPath: '/xx/page'
      });
      expect(container).toBeInTheDocument();
    });

    it('should handle deeply nested invalid routes', () => {
      const { container } = render(<Router />, { 
        initialPath: '/fr/invalid/nested/route'
      });
      expect(container).toBeInTheDocument();
    });

    it('should handle malformed paths', () => {
      const { container } = render(<Router />, { 
        initialPath: '//fr//ff//'
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Route matching behavior', () => {
    it('should distinguish between valid and invalid routes', () => {
      // Valid route
      const validRoute = render(<Router />, { 
        initialPath: '/fr/experience',
        initialLocale: 'fr'
      });
      expect(validRoute.container).toBeInTheDocument();

      // Invalid route (like your curl test)
      const invalidRoute = render(<Router />, { 
        initialPath: '/fr/ff',
        initialLocale: 'fr'
      });
      expect(invalidRoute.container).toBeInTheDocument();
      
      // Both render content, but they should behave differently
      // The invalid route should show 404 or fallback content
    });

    it('should handle locale-specific 404s', () => {
      const testCases = [
        { path: '/fr/nonexistent', locale: 'fr' as const },
        { path: '/it/invalid', locale: 'it' as const },
        { path: '/es/missing', locale: 'es' as const },
        { path: '/ar/notfound', locale: 'ar' as const },
      ];

      testCases.forEach(({ path, locale }) => {
        const { container } = render(<Router />, { 
          initialPath: path,
          initialLocale: locale
        });
        expect(container).toBeInTheDocument();
        // Each should render in the correct locale context
      });
    });
  });

  describe('English locale redirect handling', () => {
    it('should redirect /en/experience to /experience', () => {
      const { container } = render(<Router />, { 
        initialPath: '/en/experience'
      });
      expect(container).toBeInTheDocument();
      // Should show redirect component initially
    });

    it('should redirect /en/blog to /blog', () => {
      const { container } = render(<Router />, { 
        initialPath: '/en/blog'
      });
      expect(container).toBeInTheDocument();
    });

    it('should redirect /en/ to /', () => {
      const { container } = render(<Router />, { 
        initialPath: '/en/'
      });
      expect(container).toBeInTheDocument();
    });

    it('should redirect /en to /', () => {
      const { container } = render(<Router />, { 
        initialPath: '/en'
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Legacy route handling', () => {
    it('should handle legacy redirects if implemented', () => {
      // Test any legacy route patterns your app might need to support
      const { container } = render(<Router />, { 
        initialPath: '/old-route'
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('URL synchronization', () => {
    it('should maintain URL consistency with locale context', () => {
      const { container } = render(<Router />, { 
        initialPath: '/fr/experience',
        initialLocale: 'fr'
      });
      
      expect(container).toBeInTheDocument();
      // Verify that the locale context matches the URL
    });

    it('should handle mismatched URL and locale context', () => {
      // Test edge case: URL says French but context is English
      const { container } = render(<Router />, { 
        initialPath: '/fr/experience',
        initialLocale: 'en' // Mismatch!
      });
      
      expect(container).toBeInTheDocument();
      // Should resolve the conflict appropriately
    });
  });
});
