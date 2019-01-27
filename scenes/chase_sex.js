import {print, text, choices, consent} from '../core/game.js';

export default function*() {
  print(text`
    A strong alpha husky walks up to you and demands you have sex with him. Are you willing?
  `);
  consent();
  const player_wants = yield;

  switch (player_wants) {
    case 'Yes':
      print(text`
        You don't want to get beat up, so you let him put his dick in your butt and you lose the game.
      `);
      break;
    case 'No':
      print(text`
        He pins you down and puts his dick in your butt and you lose the game.
      `);
    break;
  }
};
