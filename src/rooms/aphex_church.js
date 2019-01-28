import {print, choose, change_mana, go} from '../core/game.js';
import {text, pink, blue} from '../core/game.js';
import {north_wing} from './north_wing.js';
import {west_wing} from './west_wing.js';

export function aphex_church() {
  print(text`
    The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
  `);

  choose({
    '1': {
      label: 'Call Aphex',
      action: function() {
        print(text`
          Nothing happens.
        `);

        change_mana(100);
        go(aphex_church);
      },
    },
    'w': {
      label: 'North Wing',
      action: function() {
        print(text`
          You walk to the north wing.
        `);
        go(north_wing);
      },
    },
    'a': {
      label: 'West Wing',
      action: function() {
        print(text`
          You walk to the west wing.
        `);
        go(west_wing);
      },
    },
  });
};
