import * as React from 'react';
import './character-card.css';
import { Character } from '../../common/types';

export const CharacterCard = (character: Character) => (
  <div className="CharacterCard">
    <div>Name: {character.name}</div>
    <div>Popularity: {character.popularity}</div>
  </div>
);