export function onEnter() {
  game.print(`
    A nondescript west wing.
  `);

  game.choose({
    'd': {
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
