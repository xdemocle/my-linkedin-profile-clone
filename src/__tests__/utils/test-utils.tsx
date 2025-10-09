/* eslint-disable react-refresh/only-export-components */
import { type Locale, LOCALE_DEFAULT } from '@/constants';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { IntlProvider } from 'use-intl';
import { Router } from 'wouter';
import { LocaleProvider } from '../../contexts/LocaleContext';
import { ThemeProvider } from '../../contexts/ThemeContextProvider';

// Mock messages for use-intl provider
const mockMessages = {
  Navigation: {
    home: 'Home',
    search: 'Search',
    experience: 'Experience',
    blog: 'Blog',
    projects: 'Projects',
    activity: 'Activity',
  },
  NotFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    goHome: 'Go Home',
    goBack: 'Go Back',
    funMessage: 'Oops! This page seems to have vanished into the digital void.',
  },
  Profile: {
    title: 'Profile',
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    name: 'John Doe',
    headline: 'Software Developer',
    location: 'San Francisco, CA',
    connections: 'connections',
  },
  Experience: {
    title: 'Experience',
    current: 'Present',
    duration: 'duration',
  },
  Projects: {
    title: 'Projects',
    viewProject: 'View Project',
    sourceCode: 'Source Code',
  },
  Blog: {
    title: 'Blog',
    readMore: 'Read More',
    publishedOn: 'Published on',
  },
  Activity: {
    title: 'Activity',
    posts: 'Posts',
    likes: 'Likes',
    comments: 'Comments',
  },
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLocale?: Locale;
  initialPath?: string;
}

function AllTheProviders({
  children,
  initialLocale = LOCALE_DEFAULT,
  initialPath = '/',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialPath?: string;
}) {
  return (
    <Router base="" hook={() => [initialPath, () => {}]}>
      <ThemeProvider>
        <IntlProvider locale={initialLocale} messages={mockMessages}>
          <LocaleProvider prerenderLocale={initialLocale}>{children}</LocaleProvider>
        </IntlProvider>
      </ThemeProvider>
    </Router>
  );
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { initialLocale, initialPath, ...renderOptions } = options;

  return render(ui, {
    wrapper: props =>
      AllTheProviders({
        ...props,
        initialLocale,
        initialPath,
      }),
    ...renderOptions,
  });
};

export { customRender as render };

// Helper function to create a mock router hook
export const createMockRouter = (initialPath = '/') => {
  let currentPath = initialPath;
  const navigate = (path: string) => {
    currentPath = path;
  };

  return {
    hook: () => [currentPath, navigate] as const,
    getCurrentPath: () => currentPath,
    navigate,
  };
};

// Helper to test different locales
export const testWithAllLocales = (testFn: (locale: Locale) => void) => {
  const locales: Locale[] = ['en', 'it', 'fr', 'es', 'ar'];
  locales.forEach(locale => {
    testFn(locale);
  });
};
