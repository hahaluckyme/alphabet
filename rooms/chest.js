export default {
  *intro(): {
    print(text`
      You enter a room and find a nondescript room with a chest in the middle.
    `);
  }
  options: [
    {
      cost: '400 mana',
      name: `Cast the spell Open on the chest`,
      outcomes: [
        {
          chance: 50,
          *scene() {
            print(text`
              You cast Open on the chest but it turns out to be a mimic and it rapes you with its tentacles.
            `);
          },
        },
        {
          chance: 25,
          *scene() {
            print(text`
              You cast Open on the chest and find a nice boon inside.
            `);
            gift(RARE_BOON);
          },
        },
        {
          chance: 25,
          *scene() {
            print(text`
              You cast Open on the chest and get destroyed by a
            `);
            gift(RARE_BOON);
          },
        },
      ],
    },
    {
      name: `Refuse to help them`,
      blacklist: ['Risk-averse'],
      *scene() {
        print(text`
          You skip the hallway. Nothing happens.
        `);
      },
    },
  ],
}
