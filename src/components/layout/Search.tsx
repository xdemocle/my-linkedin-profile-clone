import { useApp } from "@/hooks";
import { useSearchIndex } from "@/hooks/useSearchIndex";
import { cn } from "@/lib";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";
import { Button } from "../ui/button";
import { SearchResults } from "./SearchResults";

export function Search() {
  const refInputSearch = useRef<HTMLInputElement>(null);
  const refSearchContainer = useRef<HTMLDivElement>(null);
  const {
    isSearchOpen,
    setIsSearchOpen,
    isMobile,
    searchQuery,
    setSearchQuery,
  } = useApp();
  const { fuse } = useSearchIndex();
  const t = useTranslations("Navigation");
  const [showResults, setShowResults] = useState(false);

  const toggleInputSearch = (forceStatus?: boolean) => {
    const updated = forceStatus ?? !isSearchOpen;

    setIsSearchOpen(updated);

    if (updated) {
      setTimeout(() => {
        refInputSearch.current?.focus();
      }, 100);
    } else {
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length >= 2);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
    setIsSearchOpen(false);
  };

  // Perform search
  const searchResults =
    searchQuery.length >= 2
      ? fuse.search(searchQuery).map(result => result.item)
      : [];

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refSearchContainer.current &&
        !refSearchContainer.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showResults]);

  return (
    <div className="relative flex-1" ref={refSearchContainer}>
      <div className="absolute inset-0 left-0 flex items-center w-1">
        <Button
          variant="ghost"
          size="icon"
          className={isSearchOpen ? "pointer-events-none" : ""}
          aria-label={t("search")}
          onClick={() => toggleInputSearch()}
        >
          <MagnifyingGlassIcon
            className={cn(
              "transition-width",
              !isMobile || isSearchOpen ? "size-4" : "size-5.5"
            )}
          />
        </Button>
      </div>

      <input
        ref={refInputSearch}
        type="text"
        placeholder={t("search")}
        value={searchQuery}
        onChange={handleInputChange}
        className={cn(
          "bg-transparent lg:bg-muted px-10 h-9 rounded-sm text-sm transition-all w-xs",
          !isMobile || isSearchOpen ? "" : "w-0.5",
          isSearchOpen ? "bg-muted w-full md:max-w-lg" : ""
        )}
        onFocus={() => toggleInputSearch(true)}
      />

      {showResults && (
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
}
