import { Router as WouterRouter, Route, Switch } from 'wouter';
import type { Locale } from '../lib/i18n';
import { ProfileLayout } from './layout/ProfileLayout';
import { ExperiencePage } from '../pages/ExperiencePage';
import { ActivityPage } from '../pages/ActivityPage';
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
            <ExperiencePage />
          </div>
        </Route>
        
        <Route path="/activity">
          <div className='min-h-screen bg-background'>
            <Navbar currentLocale={locale} onLocaleChange={onLocaleChange} />
            <ActivityPage />
          </div>
        </Route>
        
        {/* Default route */}
        <Route component={() => <ProfileLayout locale={locale} onLocaleChange={onLocaleChange} />} />
      </Switch>
    </WouterRouter>
  );
}
