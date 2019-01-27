import {print, text, choices, consent} from '../core/game.js';

export function* look() {
  print(text`
    You are in an empty vault.
  `);
};

export function* smell() {
  print(text`
    The vault smells dank.
  `);
};
