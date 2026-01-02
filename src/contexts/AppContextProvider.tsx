import { SOCIAL_LINKS } from "@/constants";
import {
  BackpackIcon,
  CardStackPlusIcon,
  HomeIcon,
  LayersIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "use-intl";
import { AppContext } from "./AppContext";

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayoutLarge, setIsLayoutLarge] = useState(() => {
    if (typeof window === "undefined") return false;
    // Check if the preference was already set by the inline script in prerendered HTML
    if (document.documentElement.classList.contains("layout-large")) {
      return true;
    }
    // Otherwise, read from localStorage
    const stored = localStorage.getItem("isLayoutLarge");
    return stored ? JSON.parse(stored) : false;
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Persist isLayoutLarge to localStorage and update html class whenever it changes
  useEffect(() => {
    localStorage.setItem("isLayoutLarge", JSON.stringify(isLayoutLarge));
    if (isLayoutLarge) {
      document.documentElement.classList.add("layout-large");
    } else {
      document.documentElement.classList.remove("layout-large");
    }
  }, [isLayoutLarge]);

  const isMobile = useMediaQuery("(max-width: 60rem)");
  const t = useTranslations("Navigation");

  const navLinks = useMemo(
    () => [
      { href: "/", label: t("home"), icon: HomeIcon },
      { href: "/experience", label: t("experience"), icon: BackpackIcon },
      { href: "/projects", label: t("projects"), icon: RocketIcon },
      { href: "/skills", label: t("skills"), icon: LayersIcon },
      {
        href: "/recommendations",
        label: t("recommendations"),
        icon: CardStackPlusIcon,
      },
    ],
    [t]
  );

  const socialLinks = SOCIAL_LINKS;

  return (
    <AppContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        isMenuOpen,
        setIsMenuOpen,
        isLayoutLarge,
        setIsLayoutLarge,
        isMobile,
        navLinks,
        socialLinks,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
