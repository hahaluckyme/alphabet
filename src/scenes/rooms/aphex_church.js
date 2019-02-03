import * as game from 'game';
import * as style from 'style';

var has_called_aphex = false;
function call_aphex() {
  if (!has_called_aphex) {
    game.print(style.text`
      You call Aphex but there is no reply.
    `);
    has_called_aphex = true;
  } else {
    game.print(style.text`
      You already tried to call Aphex but you do it again. There is no reply.
    `);
  }

  game.play('aphex_church');
}

var hasnt_seen_yet = true;
export function aphex_church() {
  if (hasnt_seen_yet) {
    game.print(style.text`
      You're in a church.
    `);
    hasnt_seen_yet = false;
  } else {
    game.print(style.text`
      The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
    `);
  }

  game.choose({
    '1': {
      label: 'Call Aphex',
      action: call_aphex,
    },
    'w': {
      label: 'North Wing',
      action: function() {
        game.print(style.text`
          You walk to the north wing.
        `);
        game.play('north_wing');
      },
    },
    'a': {
      label: 'West Wing',
      action: function() {
        game.print(style.text`
          You walk to the west wing.
        `);
        game.play('west_wing');
      },
    },
  });
};
