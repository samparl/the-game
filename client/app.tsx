import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);