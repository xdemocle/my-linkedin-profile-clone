import { Navbar } from '@/components/layout/Navbar';
import { ProfileLayout } from '@/components/layout/ProfileLayout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LOCALES, type Locale } from '@/constants';
// import { ActivityPage } from '@/pages/ActivityPage';
import { BlogPage } from '@/pages/BlogPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

interface RouterProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

// Helper component to redirect from root to localized route
function RootRedirect({ locale }: { locale: Locale }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(`/${locale}`);
  }, [locale, setLocation]);

  return <div>Redirecting...</div>;
}

// Note: We're using direct Route components with inline rendering instead of a wrapper component

export function Router({ locale, onLocaleChange }: RouterProps) {
  return (
    <WouterRouter>
      <ScrollToTop smooth={true} />
      <Switch>
        {/* Root redirect */}
        <Route path="/" component={() => <RootRedirect locale={locale} />} />

        {/* Localized routes */}
        {LOCALES.map(lang => (
          <Route
            key={`${lang}-root`}
            path={`/${lang}`}
            component={() => <ProfileLayout locale={lang} onLocaleChange={onLocaleChange} />}
          />
        ))}

        {/* Experience page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-experience`} path={`/${lang}/experience`}>
            <div className="min-h-screen bg-background">
              <Navbar currentLocale={lang} onLocaleChange={onLocaleChange} />
              <div className="pt-16">
                <ExperiencePage />
              </div>
            </div>
          </Route>
        ))}

        {/* Activity page with locale prefixes */}
        {/* {LOCALES.map(lang => (
          <Route key={`${lang}-activity`} path={`/${lang}/activity`}>
            <div className="min-h-screen bg-background">
              <Navbar currentLocale={lang} onLocaleChange={onLocaleChange} />
              <div className="pt-16">
                <ActivityPage />
              </div>
            </div>
          </Route>
        ))} */}

        {/* Blog page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-blog`} path={`/${lang}/blog`}>
            <div className="min-h-screen bg-background">
              <Navbar currentLocale={lang} onLocaleChange={onLocaleChange} />

              <div className="pt-16">
                <BlogPage />
              </div>
            </div>
          </Route>
        ))}

        {/* Projects page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-projects`} path={`/${lang}/projects`}>
            <div className="min-h-screen bg-background">
              <Navbar currentLocale={lang} onLocaleChange={onLocaleChange} />
              <div className="pt-16">
                <ProjectsPage />
              </div>
            </div>
          </Route>
        ))}

        {/* Legacy routes - redirect to localized versions */}
        <Route path="/experience">
          <Redirect to={`/${locale}/experience`} />
        </Route>
        <Route path="/activity">
          <Redirect to={`/${locale}/activity`} />
        </Route>
        <Route path="/blog">
          <Redirect to={`/${locale}/blog`} />
        </Route>
        <Route path="/projects">
          <Redirect to={`/${locale}/projects`} />
        </Route>

        {/* Default route - redirect to localized home */}
        <Route>
          <Redirect to={`/${locale}`} />
        </Route>
      </Switch>
    </WouterRouter>
  );
}
