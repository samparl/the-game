import * as React from 'react';
import { Character } from '../common/types';
import { CharacterCard } from './character-card';
import './characters-list.css';

class CharactersListState {
  characters: Character[];
  living: boolean;
  order: boolean;

  constructor(options: CharactersListState = { characters: [], living: false, order: false }) {
    this.characters = options.characters;
    this.living = options.living;
    this.order = options.order
  }
}

export class CharactersList extends React.Component<{}, CharactersListState> {
  constructor(props: {}) {
    super(props);
    this.state = new CharactersListState();
  }

  componentDidMount() {
    fetch('http://localhost:4040/api/characters')
      .then(response => response.json())
      .then((characters: Character[]) => { this.setState({characters}) });
  }

  applyLiving(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ living: e.target.checked })
  }

  applyPopularity(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ order: e.target.checked })
  }

  render() {
    let characters = this.state.characters.filter(((character: Character) => this.state.living ? character.isAlive > 0 : true));
    if (this.state.living) { characters.filter(((character: Character) => character.isAlive > 0)); }
    if (this.state.order) { characters = characters.sort((a: Character, b: Character) => (a.popularity < b.popularity) ? 1 : -1) }
    return (
      <div className="CharactersList">
        <div className="options">
          <input className="living" type="checkbox" id="living" onChange={this.applyLiving.bind(this)} />
          <label htmlFor="living">Only the Living</label>

          <input className="popularity" type="checkbox" id="popularity" onChange={this.applyPopularity.bind(this) } />
          <label htmlFor="popularity">Popularity</label>
        </div>
        <div className="list">
          {characters.map((character: Character) => <CharacterCard {...character} />)}
        </div>
      </div>
    );
  }
}