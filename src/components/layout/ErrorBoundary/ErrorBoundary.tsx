import React, { ErrorInfo, ReactNode } from "react";
import { Button, Container, Typography } from "@mui/material";
import { ReportGmailerrorred } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="flex flex-col items-center justify-center min-h-screen">
          <ReportGmailerrorred className="text-6xl text-red-500 mb-4" />
          <Typography variant="h4" className="mb-2">
            Something went wrong
          </Typography>
          <Typography variant="body1" className="mb-4 text-center">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try Again
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;