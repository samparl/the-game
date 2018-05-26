import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { CharactersList } from './characters-list';
import { CharacterDetails } from './character-details';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">The North Triumphs</div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={CharactersList} />
            <Route exact path="/:character" component={CharacterDetails} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);