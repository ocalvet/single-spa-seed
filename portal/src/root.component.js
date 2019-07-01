import React from 'react';

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
            <h1>Portal - Almost there</h1>
            <div id="user-management" />
          </>
        )}
      </div>
    );
  }
}

export default App;
