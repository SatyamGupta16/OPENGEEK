import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

interface LoadingEffectProps {
  isLoading: boolean;
}

export function LoadingEffect({ isLoading }: LoadingEffectProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0d1117]/80 backdrop-blur-[2px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-t-blue-500 border-blue-500/30 rounded-full animate-spin" />
      </div>
    </div>
  );
}

// Higher Order Component for adding loading effect
export function withLoadingTransition<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingTransitionComponent(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Reduced to 500ms for a snappier feel

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <LoadingEffect isLoading={isLoading} />
        <div className={isLoading ? 'invisible' : 'visible'}>
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
} 