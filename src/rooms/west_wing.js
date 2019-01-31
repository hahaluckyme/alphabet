import React from 'react';
import * as game from 'game';
import {aphex_church} from 'aphex_church';

export function west_wing() {
  game.print(<>
    A nondescript west wing.
  </>);

  game.choose({
    'd': {
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
