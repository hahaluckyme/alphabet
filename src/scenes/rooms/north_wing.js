import React from 'react';
import * as game from 'game';
import * as style from 'style';

export function north_wing() {
  game.print(style.text`
    A nondescript north wing.
  `);

  game.choose({
    's': {
      label: 'Church Hall',
      action: function() {
        game.print(style.text`
          You go back to the main church area.
        `);

        game.go('aphex_church');
      },
    },
  });
};
