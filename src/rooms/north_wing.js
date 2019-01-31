import React from 'react';
import * as game from 'game';
import {aphex_church} from 'aphex_church';

export function north_wing() {
  game.print(<>
    A nondescript north wing.
  </>);

  game.choose({
    's': {
      label: 'Church Hall',
      action: function() {
        game.print(<>
          You go back to the main church area.
        </>);

        game.go(aphex_church);
      },
    },
  });
};
