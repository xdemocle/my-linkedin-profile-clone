import {
  BackpackIcon,
  CardStackPlusIcon,
  FileTextIcon,
  HomeIcon,
  LayersIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import type { ComponentType } from "react";
import { useLocation } from "wouter";
import { useTranslations } from "use-intl";
import type { SearchResult } from "@/hooks/useSearchIndex";

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: () => void;
}

const categoryIcons: Record<
  SearchResult["category"],
  ComponentType<{ className?: string }>
> = {
  profile: HomeIcon,
  experience: BackpackIcon,
  project: RocketIcon,
  skill: LayersIcon,
  recommendation: CardStackPlusIcon,
  page: FileTextIcon,
};

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  const [, setLocation] = useLocation();
  const t = useTranslations("Search");

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      setLocation(result.url);
    } else if (result.sectionId) {
      const element = document.getElementById(result.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onResultClick();
  };

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
        <div className="p-4 text-center text-muted-foreground">
          <p>{t("noResults")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        {results.map((result) => {
          const Icon = categoryIcons[result.category];
          return (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left p-3 hover:bg-accent rounded-md transition-colors flex items-start gap-3 group"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground group-hover:text-primary line-clamp-1">
                  {result.title}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {result.description}
                </div>
                <div className="text-xs text-muted-foreground mt-1 capitalize">
                  {t(`category.${result.category}`)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
