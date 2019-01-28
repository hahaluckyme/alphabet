import {print, text, choices, consent} from '../core/game.js';



function* scene() {
  print(text`
    You enter a room and find a group of alpha huskies staring at a puzzle on the wall. One of them turns when they hear you enter, and demands that you help them figure it out.
  `);
}

{
  options: [
    {
      name: `Attempt to figure it out`,
      blacklist: [''],
      *scene() {
        challenge(5);



        print(text`
          You try your best
        `);
      },
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
