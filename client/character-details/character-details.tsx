import * as React from 'react';
import { Character } from '../common/types';
export class CharacterDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      character: null
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="CharacterDetails">
        Character
      </div>
    );
  }
}