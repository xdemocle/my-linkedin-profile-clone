import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { useTranslations } from "use-intl";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const t = useTranslations("Common");

  return (
    <Card className="mx-auto max-w-md mt-8 shadow-xs">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-lg">{t("error")}</CardTitle>
        <CardDescription>
          Something went wrong while loading this section. This might be a
          translation error or data loading issue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <details className="rounded-sm bg-muted p-3 text-sm">
            <summary className="cursor-pointer font-medium">
              Technical Details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
              {error.message}
            </pre>
          </details>
        )}
        <Button onClick={onRetry} className="w-full" variant="outline">
          <ReloadIcon className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

// Translation-specific error boundary for handling translation errors
export function TranslationErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundaryClass
      fallback={
        <Card className="mx-auto max-w-md mt-6 shadow-xs">
          <CardContent className="p-4 text-center">
            <ExclamationTriangleIcon className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Translation not available. Please try switching languages or
              refreshing the page.
            </p>
          </CardContent>
        </Card>
      }
    >
      {children}
    </ErrorBoundaryClass>
  );
}

// Main error boundary component
export function ErrorBoundary({ children, fallback }: Props) {
  return (
    <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>
  );
}
