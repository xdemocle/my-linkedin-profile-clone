import { useTranslations } from 'use-intl';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/button';
import { useLocale } from '../hooks/useLocale';
import { getPageUrlFromPath } from '../lib/i18n';

export function NotFoundPage() {
  const t = useTranslations('NotFound');
  const [, setLocation] = useLocation();
  const { locale } = useLocale();

  const handleGoHome = () => {
    setLocation(getPageUrlFromPath(locale, '/'));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-black text-primary/20 leading-none select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-bounce">
              404
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-secondary/40 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-secondary/30 rounded-full animate-float-slow"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('title', { fallback: 'Oops! Page Not Found' })}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t('description', {
              fallback:
                "The page you're looking for seems to have wandered off into the digital void. Don't worry, it happens to the best of us!",
            })}
          </p>
        </div>

        {/* Cool Visual Element */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 bg-gradient-to-l from-primary/30 to-secondary/30 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.64C7.85 10.723 9.8 9 12 9s4.15 1.723 2.674 3.36A7.962 7.962 0 0112 15z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoHome}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🏠 {t('goHome', { fallback: 'Take Me Home' })}
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-2 border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            ⬅️ {t('goBack', { fallback: 'Go Back' })}
          </Button>
        </div>

        {/* Fun Message */}
        <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-sm border border-primary/20 shadow-lg">
          <p className="text-sm text-muted-foreground italic">
            {t('funMessage', {
              fallback:
                '"In the vast expanse of the internet, even the best explorers sometimes take a wrong turn. But hey, that\'s how we discover new paths!" 🚀',
            })}
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--primary) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--secondary) 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>
    </div>
  );
}
