import React from 'react';
import * as game from 'game';
import {north_wing} from 'north_wing';
import {west_wing} from 'west_wing';

let has_called_aphex = false;

function call_aphex() {
  if (!has_called_aphex) {
    game.print(<>
      You call Aphex but there is no reply.
    </>);
    has_called_aphex = true;
  } else {
    game.print(<>
      You already tried to call Aphex but you do it again. There is no reply.
    </>);
  }

  game.go(aphex_church);
}

export function aphex_church() {
  game.print(<>
    The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
  </>);

  game.choose({
    '1': {
      label: 'Call Aphex',
      action: call_aphex,
    },
    'w': {
      label: 'North Wing',
      action: function() {
        game.print(<>
          You walk to the north wing.
        </>);
        game.go(north_wing);
      },
    },
    'a': {
      label: 'West Wing',
      action: function() {
        game.print(<>
          You walk to the west wing.
        </>);
        game.go(west_wing);
      },
    },
  });
};
