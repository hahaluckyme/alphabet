import {print, choose, change_mana, go} from '../core/game.js';
import {text, pink, blue} from '../core/style.js';
import {north_wing} from './north_wing.js';
import {west_wing} from './west_wing.js';

let has_called_aphex = false;

function call_aphex() {
  if (!has_called_aphex) {
    print(text`
      You call Aphex but there is no reply.
    `);
    has_called_aphex = true;
  } else {
    print(text`
      You already tried to call Aphex but you do it again. There is no reply.
    `);
  }

  go(aphex_church);
}

export function aphex_church() {
  print(text`
    The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
  `);

  choose({
    '1': {
      label: 'Call Aphex',
      action: call_aphex,
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
