import React from 'react';
import ApplicationsPage from './ApplicationsPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <h1>Error...</h1>
        ) : (
          <>
            <h1>Applications Module</h1>
            <ApplicationsPage />
          </>
        )}
      </div>
    );
  }
}

export default App;
