export function onEnter() {
  game.print(`
    A nondescript north wing.
  `);

  game.choose({
    's': {
      label: 'Church Hall',
      action: function() {
        game.print(`
          You go back to the main church area.
        `);

        game.go(rooms.church);
      },
    },
  });
}
