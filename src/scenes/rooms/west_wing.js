import * as game from 'game';
import * as style from 'style';

export function west_wing() {
  game.print(style.text`
    A nondescript west wing.
  `);

  game.choose({
    'd': {
      label: 'Church Hall',
      action: function() {
        game.print(style.text`
          You go back to the main church area.
        `);

        game.play('aphex_church');
      },
    },
  });
};
