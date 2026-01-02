import { useApp } from "@/hooks";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { Footer } from "../Footer";
import { ProfileLanguageUrl } from "../profile/ProfileLanguageUrl";
import { SocialProfileSidebar } from "../profile/SocialProfileSidebar";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
  addToSidebar?: ReactNode;
  noSidebar?: boolean;
  disableSidebarScroll?: boolean;
}

export function PageLayout({
  children,
  addToSidebar,
  noSidebar,
  disableSidebarScroll,
}: PageLayoutProps) {
  const { isLayoutLarge } = useApp();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main
        className={cn(
          "mx-auto px-4 sm:px-6 py-16 sm:py-20",
          isLayoutLarge ? "" : "max-w-7xl"
        )}
      >
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-10",
            noSidebar && "lg:grid-cols-1"
          )}
        >
          {/* Main content - 2/3 width on large screens, full width on mobile */}
          <ErrorBoundary>
            <div className="lg:col-span-2 order-1 space-y-5 md:space-y-10">
              {children}
            </div>
          </ErrorBoundary>

          {/* addToSidebar - 1/3 width on large screens, full width on mobile, appears after main content */}
          {!noSidebar && (
            <ErrorBoundary>
              <div className="lg:col-span-1 order-2">
                <div
                  className={cn(
                    "space-y-5 md:space-y-10",
                    !disableSidebarScroll &&
                      "lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto"
                  )}
                >
                  {/* Profile Language & URL */}
                  <ProfileLanguageUrl />

                  {addToSidebar}

                  {/* Social Profile Sidebar widget */}
                  <SocialProfileSidebar />
                </div>
              </div>
            </ErrorBoundary>
          )}
        </div>

        {/* Footer Links */}
        <div
          className={cn(
            "grid grid-cols-1 gap-5 md:gap-10",
            noSidebar && "lg:grid-cols-1"
          )}
        >
          <Footer />
        </div>
      </main>
    </div>
  );
}
