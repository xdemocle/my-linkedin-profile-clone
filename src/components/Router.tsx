import { ScrollToTop } from '@/components/ScrollToTop';
import { LOCALE_DEFAULT, LOCALES, type Locale } from '@/constants';
import { getPageUrlFromPath } from '@/lib/i18n';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { SkillsPage } from '@/pages/SkillsPage';
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

// Helper component to redirect /en/* to /* (strip default locale prefix)
const EnglishRedirect = ({ rest }: { rest?: string }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const targetPath = rest ? `/${rest}` : '/';
    setLocation(targetPath);
  }, [rest, setLocation]);

  return <div>Redirecting...</div>;
};

// Note: We're using direct Route components with inline rendering instead of a wrapper component
export function Router() {
  const { locale } = useLocale();
  return (
    <WouterRouter>
      <ScrollToTop smooth={true} />
      <Switch>
        {/* Redirect /en/* to /* (remove default locale prefix) */}
        <Route path="/en/:rest*">{params => <EnglishRedirect rest={params['rest*']} />}</Route>

        {/* Root redirect */}
        <Route path={`/${LOCALE_DEFAULT}`} component={() => <RootRedirect locale={''} />} />
        <Route path={`/${LOCALE_DEFAULT}/`} component={() => <RootRedirect locale={''} />} />

        {/* Localized routes */}
        {LOCALES.map(lang => (
          <Route
            key={`${lang}-root`}
            path={lang === LOCALE_DEFAULT ? '/' : `/${lang}`}
            component={() => <MainPage />}
          />
        ))}

        {/* Experience page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-experience`} path={getPageUrlFromPath(lang, 'experience')}>
            <ExperiencePage />
          </Route>
        ))}

        {/* Projects page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-projects`} path={getPageUrlFromPath(lang, 'projects')}>
            <ProjectsPage />
          </Route>
        ))}

        {/* Skills page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-skills`} path={getPageUrlFromPath(lang, 'skills')}>
            <SkillsPage />
          </Route>
        ))}

        {/* Recommendations page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-recommendations`} path={getPageUrlFromPath(lang, 'recommendations')}>
            <RecommendationsPage />
          </Route>
        ))}

        {/* redirect to localized versions */}
        <Route path={getPageUrlFromPath(locale, 'experience')}>
          <Redirect to={`/${locale}/experience`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'projects')}>
          <Redirect to={`/${locale}/projects`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'skills')}>
          <Redirect to={`/${locale}/skills`} />
        </Route>
        <Route path={getPageUrlFromPath(locale, 'recommendations')}>
          <Redirect to={`/${locale}/recommendations`} />
        </Route>

        {/* Default route in a switch - 404 page */}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </WouterRouter>
  );
}
