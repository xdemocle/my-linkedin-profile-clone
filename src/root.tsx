import { IntlProvider } from 'use-intl';
import { ProfileLayout } from './components/layout/ProfileLayout';
import messages from './messages/en.json';

export function Root() {
  return (
    <IntlProvider messages={messages} locale='en'>
      <ProfileLayout />
    </IntlProvider>
  );
}
