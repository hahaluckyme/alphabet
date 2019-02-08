export var has_called_aphex = false;

export function onFirstEnter() {
  game.print(`
    You're in a church.
  `);
}

export function onEnter() {
  game.print(`
    The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
  `);

  game.choose({
    '1': {
      label: 'Call Aphex',
      action: function() {
        call_aphex();
      },
    },
    'w': {
      label: 'North Wing',
      action: function() {
        game.print(`
          You head towards the north wing.
        `);
        game.go(rooms.church_north_wing);
      },
    },
    'a': {
      label: 'West Wing',
      action: function() {
        game.print(`
          You head towards the west wing.
        `);
        game.go(rooms.church_west_wing);
      },
    },
  });
}

export function onExit() {
  game.print(`
    You leave the church.
  `);
}

function call_aphex() {
  if (!has_called_aphex) {
    game.print(`
      You call Aphex but there is no reply.
    `);
    has_called_aphex = true;
  } else {
    game.print(`
      You already tried to call Aphex but you do it again. There is no reply.
    `);
  }
}
