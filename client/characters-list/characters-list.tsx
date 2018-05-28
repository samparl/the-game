import * as React from 'react';
import { Character } from '../common/types';
import { CharacterCard } from './character-card';
import './characters-list.css';

class CharactersListState {
  characters: Character[];
  living: boolean;
  order: string | null;
  loading: boolean;

  constructor(options: CharactersListState = { characters: [], living: false, order: null, loading: false }) {
    this.characters = options.characters;
    this.living = options.living;
    this.order = options.order
    this.loading = options.loading
  }
}

export class CharactersList extends React.Component<{}, CharactersListState> {
  constructor(props: {}) {
    super(props);
    this.state = new CharactersListState();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.getCharacters();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getCharacters({ start, count } = { start: 0, count: 12 }) {
    if (!this.state.loading) {
      this.setState({loading: true});
      const headers: any = new Headers({ 'Accept': 'application/json' });
      fetch(`http://localhost:4040/api/characters?start=${start}&&count=${count}`, { headers })
        .then(response => response.json())
        .then((characters: Character[]) => {
          const totalCharacters = [...this.state.characters, ...characters];
          this.setState({ characters: totalCharacters, loading: false });
        });
    }
  }

  applyLiving(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ living: e.target.checked })
  }

  applyPopularity(e: React.ChangeEvent<HTMLInputElement>) {
    let order: string | null = 'asc';
    switch (this.state.order) {
      case null:
        order = 'asc';
        break;
      case 'asc':
        order = 'desc';
        break;
      default:
        order = null;
    }   
    this.setState({ order })
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50) &&
      this.state.characters.length
    ) {
      const start = this.state.characters.length;
      this.getCharacters({start, count: 42});
    }
  }


  render() {
    let characters = this.state.characters.filter(((character: Character) => this.state.living ? character.isAlive > 0 : true));
    if (this.state.living) { characters.filter(((character: Character) => character.isAlive > 0)); }

    let popularity = 'popularity';
    if (this.state.order === 'desc') {
      characters = characters.sort((a: Character, b: Character) => (a.popularity < b.popularity) ? 1 : -1);
      popularity += ' desc';
    }

    if (this.state.order === 'asc') {
      characters = characters.sort((a: Character, b: Character) => (a.popularity > b.popularity) ? 1 : -1);
      popularity += ' asc';
    }

    return (
      <div className="CharactersList">
        <div className="options">
          <input className="living" type="checkbox" id="living" checked={this.state.living} onChange={this.applyLiving.bind(this)} />
          <label htmlFor="living">Only the Living</label>

          <input className={popularity} type="checkbox" id="popularity" checked={!!this.state.order} onChange={this.applyPopularity.bind(this) } />
          <label htmlFor="popularity">Order by Popularity</label>
        </div>
        <div className="list">
          {characters.map((character: Character) => <CharacterCard {...character} />)}
        </div>
      </div>
    );
  }
}