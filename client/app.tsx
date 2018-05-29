import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { CharactersList } from './characters-list';
import { CharacterDetails } from './character-details';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <Route render={({location}) => location.pathname === '/' ? null : <Link className="back" to="/">Back</Link>} />
            <span className="App-title">The North Triumphs</span>
          </div>
            <div>
              <Route exact path="/" component={CharactersList} />
              <Route exact path="/:character" component={CharacterDetails} />
            </div>
        </div>
      </BrowserRouter>
    )
  }
}

const node = document.getElementById('app');
ReactDOM.render(<App />, node);