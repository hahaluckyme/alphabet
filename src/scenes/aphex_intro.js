import {print, choose, go} from '../core/game.js';
import React from 'react';
import {aphex_church} from '../rooms/aphex_church.js';

export let willing_to_help;

export function aphex_intro() {
  print(<>
    You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power into your soul.

    It speaks a command that you cannot hear and your body lurches forward in response, pushing you through a ethereal fabric, tearing a hole for you to enter. Passing through, your body feels heavy and you fall to your knees, gasping for air as your lungs fill with air for what seems like the first time. Your rough entry knocks over a candle on the floor.

    You look up and see what looks to be a medieval-themed room. The walls are stone, the furniture is made out of hewn wood, and the various religious iconography are scattered around the room, although none from a religion that you've ever seen. A young human woman is standing in front of you, wearing what looks like a nightgown, seems to be almost... glowing.

    Dazed, you stammer at her, asking what's happening, and where you are.

    <pink>"I have summoned you from your plane and I require your assistance. I am Aphex, the goddess of romance.</pink>

    You pinch yourself and feel pain.

    <pink>"This world is crumbling. Mana was innate in all creatures, and humanoids were no exception. But a catastrophe years ago wracked the magical balance, causing an imbalance to occur. Now, women have become unable to regenerate mana.</pink>

    <pink>"In some parts of the world, they were able to overcome this challenge with their technology. But in most, it has caused a destruction in status quo, the new culture reflecting the clear power imbalance. And with it, my power wanes, and so too my influence, causing a vicious cycle that soon I will be completely unable to stop.</pink>

    <pink>"But we have time. If you are able to aid me, we can change course and I can guide civilization back from the brink of collapse.</pink>

    She lowers herself to kneel on one knee, pointing her head towards your feet.

    <pink>"I beg of you, will you accept my quest and restore order to this world?</pink>
  </>);

  choose({
    '1': {
      label: `Yes (truth)`,
      action: function() {
        print(<>
          You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.

          <pink>"I thank you for your service. And the world does not know it yet, but it thanks you, too."</pink>

          She stands up and puts her hand on your shoulder.

          <pink>"I will bestow your body with the mana I can sacrifice. However, your body has no ability to regenerate it.</pink>

          You can feel a rush of energy enter your body, awakening nerves you never knew you had.
        </>);

        willing_to_help = true;
        // set_mana(1000);
        go(aphex_church);
      },
    },
    '2': {
      label: `Yes (tentative)`,
      action: function() {
        print(<>
          You agree to help her out, but you're pretty sure you'll ditch the moment it gets dangerous for you.

          She lowers her body, kneeling on one knee with her head down.

          <pink>"Thank you.</pink>

          +100 mana!
        </>);

        go(aphex_church);
      },
    },
    '3': {
      label: `No`,
      action: function() {
        print(<>
          <pink>"You little shit, I did all this work for you.</pink>

          She casts a Geas spell on you and you feel yourself forcefully inclined to help.

          <pink>"Fuck, now I don't have enough mana to give you anything. Go out there and fix me!</pink>
        </>);
        go(aphex_church);
      },
    },
  });
};

function dont_know() {
  print(<>
    You tell her... that you're not sure. You don't have

    <pink>"Good. Now be on your way with some mana.</pink>

    +100 mana!
  </>);

  choose({
    '1': {
      label: `Yes (truth)`,
      action: function() {
      },
    },
  });

}
