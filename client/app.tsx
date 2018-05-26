import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CharactersList } from './characters-list';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">The North Triumphs</div>
        <CharactersList />
      </div>
    )
  }
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);