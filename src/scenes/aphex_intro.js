import {print, choose, change_mana, go} from '../core/game.js';
import {text, pink, blue} from '../core/game.js';
import {aphex_church} from '../rooms/aphex_church.js';

export function aphex_intro() {
  print(text`
    You wake up.

    You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power over you into your soul.

    ${pink`"Come."`}

    Your body lurches forward as the command pushes you through a ethereal fabric, tearing a hole for you to enter. You gasp as air fills your lungs, and you fall to your knees, landing on a hard stone floor. You knock over a candle on the floor.

    ${pink`"Mortal, I request your aid."`}

    You look up and are shocked to see what looks to be a medieval-themed home. The walls look like they would belong in a castle, and the decor strikes you with religious iconography, although none in particular that you've ever seen. A young woman is standing in front of you, wearing an light gown, and almost... glowing.

    "Who are you? Where am I?" You stammer to her, still dazed at what just happened. Weren't you just at home a second ago?

    ${pink`"I have summoned you from your plane to fulfill my duty. I am the goddess of romance, Aphex."`}

    Is this real? You pinch yourself and feel a corresponding signal of pain.

    ${pink`"My strength is waning in this world. I have been forced to break my oath and interfere with other worlds. Your duty is to restore my power within 7 days, before I fade away permanently. Should you succeed, I will return you to your world and grant you anything you desire. Will you accept and help me?"`}
  `);

  choose({
    '1': {
      label: 'Yes',
      action: function() {
        print(text`
          ${pink`Good. Now be on your way with some mana.`}

          +100 mana!
        `);

        change_mana(100);
        go(aphex_church);
      },
    },
    '2': {
      label: 'No',
      action: function() {
        print(text`
          ${pink`You little shit, I did all this work for you.`}

          She casts a Geas spell on you and you feel yourself forcefully inclined to help.

          ${pink`Fuck, now I don't have enough mana to give you anything. Go out there and fix me!`}
        `);
        go(aphex_church);
      },
    },
  });
};
