import { PageLayout } from '@/components/layout/PageLayout';
import { ProfileLayout } from '@/components/layout/ProfileLayout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getPageUrlFromPath } from '@/lib/i18n';
import { LOCALE_DEFAULT, LOCALES, type Locale } from '../constants/i18n';
// import { ActivityPage } from '@/pages/ActivityPage';
import { ActivityPage } from '@/pages/ActivityPage';
import { BlogPage } from '@/pages/BlogPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { useLocale } from '../hooks/useLocale';

// Helper component to redirect from root to localized route
const RootRedirect = ({ locale }: { locale: Locale | '' }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(`/${locale}`);
  }, [locale, setLocation]);

  return <div>Redirecting...</div>;
};

// Note: We're using direct Route components with inline rendering instead of a wrapper component
export function Router() {
  const { locale } = useLocale();
  return (
    <WouterRouter>
      <ScrollToTop smooth={true} />
      <Switch>
        {/* Root redirect */}
        <Route path={`/${locale}`} component={() => <RootRedirect locale={''} />} />
        <Route path={`/${locale}/`} component={() => <RootRedirect locale={''} />} />

        {/* Localized routes */}
        {LOCALES.map(lang => (
          <Route
            key={`${lang}-root`}
            path={getPageUrlFromPath(lang, lang === LOCALE_DEFAULT ? '/' : `/${lang}`)}
            component={() => <ProfileLayout />}
          />
        ))}

        {/* Experience page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-experience`} path={getPageUrlFromPath(lang, 'experience')}>
            <PageLayout>
              <ExperiencePage />
            </PageLayout>
          </Route>
        ))}

        {/* Activity page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-activity`} path={getPageUrlFromPath(lang, 'activity')}>
            <PageLayout>
              <ActivityPage />
            </PageLayout>
          </Route>
        ))}

        {/* Blog page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-blog`} path={getPageUrlFromPath(lang, 'blog')}>
            <PageLayout>
              <BlogPage />
            </PageLayout>
          </Route>
        ))}

        {/* Projects page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-projects`} path={getPageUrlFromPath(lang, 'projects')}>
            <PageLayout>
              <ProjectsPage />
            </PageLayout>
          </Route>
        ))}

        {/* Legacy routes - redirect to localized versions */}
        <Route path={getPageUrlFromPath(locale, 'experience')}>
          <Redirect to={`/${locale}/experience`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'activity')}>
          <Redirect to={`/${locale}/activity`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'blog')}>
          <Redirect to={`/${locale}/blog`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'projects')}>
          <Redirect to={`/${locale}/projects`} />
        </Route>

        {/* Default route in a switch - 404 page */}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </WouterRouter>
  );
}
