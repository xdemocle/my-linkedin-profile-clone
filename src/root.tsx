import { IntlProvider } from 'use-intl';
import App from './app';

// You can get the messages from anywhere you like. You can also
// fetch them from within a component and then render the provider
// along with your app once you have the messages.
const messages = {
  App: {
    hello: 'Hello {firstName}!',
  },
};

export function Root() {
  return (
    <IntlProvider messages={messages} locale='en'>
      <App />
    </IntlProvider>
  );
}
