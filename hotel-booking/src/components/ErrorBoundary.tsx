import React, { useState, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="error-fallback">
        <h2>Something went wrong.</h2>
        <p>Please try again later.</p>
        <button onClick={() => setHasError(false)}>Retry</button>
      </div>
    );
  }

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <ErrorCatcher onError={handleError}>{children}</ErrorCatcher>
    </React.Suspense>
  );
};

const ErrorCatcher: React.FC<{ children: ReactNode; onError: () => void }> = ({ children, onError }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Caught an error:", error);
    onError();
    return null;
  }
};

export default ErrorBoundary;
