import { Navbar } from '@/components/layout/Navbar';
import { ProfileLayout } from '@/components/layout/ProfileLayout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getPageUrlFromPath } from '@/lib/i18n';
import { LOCALE_DEFAULT, LOCALES, type Locale } from '../constants/i18n';
// import { ActivityPage } from '@/pages/ActivityPage';
import { BlogPage } from '@/pages/BlogPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { Redirect, Route, Switch, Router as WouterRouter } from 'wouter';

interface RouterProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

// Helper component to redirect from root to localized route
// function RootRedirect({ locale }: { locale: Locale | '' }) {
//   const [, setLocation] = useLocation();

//   useEffect(() => {
//     setLocation(`/${locale}`);
//   }, [locale, setLocation]);

//   return <div>Redirecting...</div>;
// }

// Note: We're using direct Route components with inline rendering instead of a wrapper component
export function Router({ locale, onLocaleChange }: RouterProps) {
  return (
    <WouterRouter>
      <ScrollToTop smooth={true} />
      <Switch>
        {/* Root redirect */}
        {/* <Route path={`/${locale}`} component={() => <RootRedirect locale={''} />} />
        <Route path={`/${locale}/`} component={() => <RootRedirect locale={''} />} /> */}

        {/* <Route
          key={`root`}
          path={`/`}
          component={() => <ProfileLayout locale={LOCALE_DEFAULT} onLocaleChange={onLocaleChange} />}
        /> */}

        {/* Localized routes */}
        {LOCALES.map(lang => (
          <Route
            key={`${lang}-root`}
            path={getPageUrlFromPath(lang, lang === LOCALE_DEFAULT ? '/' : `/${lang}`)}
            component={() => <ProfileLayout locale={lang} onLocaleChange={onLocaleChange} />}
          />
        ))}

        {/* Experience page with locale prefixes */}
        {LOCALES.map(lang => (
          <Route key={`${lang}-experience`} path={getPageUrlFromPath(lang, 'experience')}>
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
          <Route key={`${lang}-activity`} path={getPageUrlFromPath(lang, 'activity')}>
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
          <Route key={`${lang}-blog`} path={getPageUrlFromPath(lang, 'blog')}>
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
          <Route key={`${lang}-projects`} path={getPageUrlFromPath(lang, 'projects')}>
            <div className="min-h-screen bg-background">
              <Navbar currentLocale={lang} onLocaleChange={onLocaleChange} />
              <div className="pt-16">
                <ProjectsPage />
              </div>
            </div>
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

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>

        {/* Default route - redirect to localized home */}
        {/* <Route>
          <Redirect to={`/${locale}`} />
        </Route> */}
      </Switch>
    </WouterRouter>
  );
}
