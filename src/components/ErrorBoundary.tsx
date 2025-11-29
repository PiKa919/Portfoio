'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-void-black flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto border-2 border-red-500 rounded-lg flex items-center justify-center">
                <span className="text-red-500 text-4xl font-mono">!</span>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-mono text-white mb-4">
              <span className="text-red-500">[ERROR]</span> System Malfunction
            </h1>

            {/* Error Message */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 text-left">
              <code className="text-sm text-gray-400 font-mono">
                <span className="text-red-400">Exception:</span>{' '}
                {this.state.error?.message || 'An unexpected error occurred'}
              </code>
            </div>

            {/* Recovery Actions */}
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full px-6 py-3 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan 
                         font-mono text-sm rounded hover:bg-neon-cyan/20 transition-colors"
              >
                [RETRY] Reinitialize Component
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gray-800 border border-gray-700 text-gray-400 
                         font-mono text-sm rounded hover:bg-gray-700 transition-colors"
              >
                [REBOOT] Reload Page
              </button>
            </div>

            {/* Status Line */}
            <p className="mt-6 text-xs text-gray-600 font-mono">
              Error logged at {new Date().toISOString()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
