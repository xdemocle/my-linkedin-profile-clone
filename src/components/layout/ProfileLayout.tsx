import { ErrorBoundary } from '../ErrorBoundary';
import { InstallPWA } from '../InstallPWA';
import { ProfileMainContent } from '../profile/ProfileMainContent';
import { ProfileSidebar } from '../profile/ProfileSidebar';
import { Navbar } from './Navbar';

export function ProfileLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Fixed padding for fixed navbar with improved mobile spacing */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Main content - 2/3 width on large screens, full width on mobile */}
          <div className="lg:col-span-2 order-1">
            <ErrorBoundary>
              <ProfileMainContent />
            </ErrorBoundary>
          </div>

          {/* Sidebar - 1/3 width on large screens, full width on mobile, appears after main content */}
          <div className="lg:col-span-1 order-2">
            <ErrorBoundary>
              <ProfileSidebar />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  );
}
