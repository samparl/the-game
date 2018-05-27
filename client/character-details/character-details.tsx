import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Character } from '../common/types';

export class CharacterDetails extends React.Component<RouteComponentProps<any>, { character: Character }> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      character: new Character()
    }
  }

  componentDidMount() {
    const url = `http://localhost:4040/api/characters/${this.props.match.params.character}`;
    const request = new Request(url, {
      headers: new Headers({'Accept': 'application/json'})
    });

    fetch(request)
      .then(response => response.json())
      .then((character: Character) => { this.setState({ character })});
  }

  render() {
    const { character } = this.state;
    const culture = character.culture ? ` of ${character.culture}` : '';
    const birth = character.dateOfBirth ? `, born ${character.dateOfBirth}` : ''
    return (
      <div className="CharacterDetails">
        <div>
          {`${character.title} ${character.name} ${culture}`}
        </div>
        <div>
          {(character.name && character.isMale ? 'Male' : 'Female') + birth}
        </div>
      </div>
    );
  }
}