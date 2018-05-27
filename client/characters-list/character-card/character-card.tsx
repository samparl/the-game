import * as React from 'react';
import './character-card.css';
import { Character } from '../../common/types';
import { Link } from 'react-router-dom';

export const CharacterCard = (character: Character) => (
  <Link to={`/${character['S.No']}`} className="CharacterCard">
    <div>Name: {character.name}</div>
    <div>Popularity: {character.popularity}</div>
  </Link>
);