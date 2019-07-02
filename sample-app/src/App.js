import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const Header = () => (
  <header>
    <h2>Sample App</h2>
  </header>
);
const Content = () => (
  <main>
    <h2>Application Content</h2>
    <div id="current-application" />
  </main>
);
const Footer = () => (
  <footer>
    <h6>Footer - Copyright 2019</h6>
  </footer>
);

const App = () => (
  <ErrorBoundary>
    <>
      <Header />
      <Content />
      <Footer />
    </>
  </ErrorBoundary>
);

export default App;
