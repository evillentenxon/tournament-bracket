import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    };

    static getDerivedStateFromError(error) {
        // Update state to display fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        console.error("Error occurred:", error);
        console.error("Error info:", info);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return <h2>Something went wrong. Please try again later.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
