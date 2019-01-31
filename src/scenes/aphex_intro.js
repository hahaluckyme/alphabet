import React from 'react';
import {Pink} from 'colors';
import * as game from 'game';
import {aphex_church} from 'aphex_church';

export let willingness;

export function aphex_intro() {
  game.print(<>
    You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power into your soul.

    It speaks a command that you cannot hear and your body lurches forward in response, pushing you through a ethereal fabric, tearing a hole for you to enter. Passing through, your body feels heavy and you fall to your knees, gasping for air as your lungs fill with air for what seems like the first time. Your rough entry knocks over a candle on the floor.

    You look up and see what looks to be a medieval-themed room. The walls are stone, the furniture is made out of hewn wood, and the various religious iconography are scattered around the room, although none from a religion that you've ever seen. A young human woman is standing in front of you, wearing what looks like a nightgown, seems to be almost... glowing.

    Dazed, you stammer at her, asking what's happening, and where you are.

    <Pink>"I have summoned you from your plane and I require your assistance. I am Aphex, the goddess of romance.</Pink>

    You pinch yourself and feel pain.

    <Pink>"This world is crumbling. Mana was innate in all creatures, and humanoids were no exception. But a catastrophe years ago wracked the magical balance, causing an imbalance to occur. Now, women have become unable to regenerate mana.</Pink>

    <Pink>"In some parts of the world, they were able to overcome this challenge with their technology. In most, it has caused a destruction in status quo, the new culture reflecting the clear power imbalance. And with it, my power wanes, and so too my influence, causing a vicious cycle that soon I will be completely unable to stop.</Pink>

    <Pink>"But we have time. If you are able to aid me, we can change course and I can guide civilization back from the brink of collapse.</Pink>

    She lowers herself to kneel on one knee, pointing her head towards your feet.

    <Pink>"I beg of you, will you accept my quest and restore order to this world?</Pink>
  </>);

  // setting the choices by using a constant label map
  game.choose({
    'Yes (truth)': function() {
      game.print(<>
        You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
      </>);

      willingness = 'yes';
      yes();
      game.go(aphex_church);
    },
    'Yes (tentative)': function() {
      game.print(<>
        You agree to help her out, but you keep silent that you're pretty sure you'll ditch the moment it gets dangerous for you.

        She lowers her body, kneeling on one knee with her head down.

        <Pink>'Thank you.</Pink>
      </>);

      willingness = 'tentative';
      yes();
      game.go(aphex_church);
    },
    'No': function() {
      game.print(<>
        You say that she's definitely looking for another person--there's no way that someone like you would do this, let alone be able to! You're just a regular person.

        Her expression tightens and you feel like she is not interested in sending you home.

        <Pink>"I don't think you realize how difficult it was for me to summon you. Perhaps you would like to change your mind?"</Pink>

        She has definitely cast a spell on you, but you don't know what it is.
      </>);

      willingness = 'no';

      // setting the choices by array
      game.choose([
        {
          label: `Yes`,
          action: function() {
            game.print(<>
              You can't help but to say yes to her.
            </>);

            game.go(aphex_church);
          },
        },
        {
          label: `No`,
          disabled: true,
        },
      ]);
    },
  });
}

function yes() {
  game.print(<>
    <Pink>"I thank you for your service. And the world does not know it yet, but it thanks you, too."</Pink>

    She stands up and puts her hand on your shoulder.

    <Pink>"I will bestow your body with the mana I can sacrifice. However, your body has no ability to regenerate it.</Pink>

    You can feel a rush of energy enter your body, awakening nerves you never knew you had.
  </>);
}

function dont_know() {
  game.print(<>
    You tell her... that you're not sure. You don't have

    <Pink>"Good. Now be on your way with some mana.</Pink>

    +100 mana!
  </>);

  game.choose({
    '1': {
      label: `Yes (truth)`,
      action: function() {
      },
    },
  });

}
