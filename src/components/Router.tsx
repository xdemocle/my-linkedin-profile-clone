import { Router as WouterRouter, Route, Switch } from 'wouter';
import type { Locale } from '../lib/i18n';
import { ProfileLayout } from './layout/ProfileLayout';
import { ExperiencePage } from '../pages/ExperiencePage';
import { ActivityPage } from '../pages/ActivityPage';
import { BlogPage } from '../pages/BlogPage';
import { Navbar } from './layout/Navbar';

interface RouterProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Router({ locale, onLocaleChange }: RouterProps) {
  return (
    <WouterRouter>
      <Switch>
        <Route path="/" component={() => <ProfileLayout locale={locale} onLocaleChange={onLocaleChange} />} />
        
        <Route path="/experience">
          <div className='min-h-screen bg-background'>
            <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
            <div className="pt-16">
              <ExperiencePage />
            </div>
          </div>
        </Route>
        
        <Route path="/activity">
          <div className='min-h-screen bg-background'>
            <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
            <div className="pt-16">
              <ActivityPage />
            </div>
          </div>
        </Route>

        <Route path="/blog">
          <div className='min-h-screen bg-background'>
            <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
            <div className="pt-16">
              <BlogPage />
            </div>
          </div>
        </Route>

        {/* Default route */}
        <Route component={() => <ProfileLayout locale={locale} onLocaleChange={onLocaleChange} />} />
      </Switch>
    </WouterRouter>
  );
}
