export var willingness;

export function aphex_intro() {
  game.print(`
    You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power into your soul.

    It speaks a command that you cannot hear and your body lurches forward in response, pushing you through a ethereal fabric, tearing a hole for you to enter. Passing through, your body feels heavy and you fall to your knees, gasping for air as your lungs fill with air for what seems like the first time. Your ${true ? 'rough' : 'gentle'} entry knocks over a candle on the floor.

    You look up and see what looks to be a medieval-themed room. The walls are stone, the furniture is made out of hewn wood, and the various religious iconography are scattered around the room, although none from a religion that you've ever seen. A young human woman is standing in front of you, wearing what looks like a nightgown, seems to be almost... glowing.

    Dazed, you stammer at her, asking what's happening, and where you are.

    ${style.pink}
    "I have summoned you from your plane and I require your assistance. I am Aphex, the goddess of romance.
    ${style.normal}

    You pinch yourself and feel pain.

    ${style.pink}
    "This world is crumbling. Mana was innate in all creatures, and humanoids were no exception. But a catastrophe years ago wracked the magical balance, causing an imbalance to occur. Now, women have become unable to regenerate mana.

    "In some parts of the world, they were able to overcome this challenge with their technology. In most, it has caused a destruction in status quo, the new culture reflecting the clear power imbalance. And with it, my power wanes, and so too my influence, causing a vicious cycle that soon I will be completely unable to stop.

    "But we have time. If you are able to aid me, we can change course and I can guide civilization back from the brink of collapse.
    ${style.normal}

    She lowers herself to kneel on one knee, pointing her head towards your feet.

    ${style.pink}
    "I beg of you, will you accept my quest and restore order to this world?
    ${style.normal}
  `);

  // setting the choices by using a constant label map
  game.choose({
    'Yes': function() {
      game.print(`
        You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
      `);

      willingness = 'yes';
      yes();
      game.go(rooms.church);
    },
    'Yes (lie)': function() {
      game.print(`
        You agree to help her out, but you keep silent that you're pretty sure you'll ditch the moment it gets dangerous for you.
      `);

      willingness = 'tentative';
      yes();
      game.go(rooms.church);
    },
    'No': function() {
      game.print(`
        You say that she's definitely looking for another person--there's no way that someone like you would do this, let alone be able to! You're just a regular person.

        Her expression tightens and you feel like she may not be entirely interested in sending you home.

        ${style.pink}
        "It is beyond a mortal to summon across the planes. Wouldn't you like to take this unique opportunity to explore the world?"
        ${style.normal}

        A glint of light reflects from her eyes. You feel like someone is watching you from behind.

        ${style.pink}
        "Will you accept my quest, kind soul?"
        ${style.normal}
      `);

      willingness = 'no';

      // setting the choices by array
      game.choose([
        {
          label: 'Yes',
          action: function() {
            game.print(`
              You open your mouth, but find yourself incapable of refusing her. You agree to help her out as best you can.

              ${style.pink}
              "Thank you, adventurer. Now go and be on your way! Can't be wasting time."
              ${style.normal}

              You blink and find yourself in a totally different place.
            `);

            game.go(rooms.church);
          },
        },
        {
          label: 'No',
          disabled: true,
        },
      ]);
    },
  });
}

function yes() {
  game.print(`
    ${style.pink}
    "I thank you for your service. And the world does not know it yet, but it thanks you, too."
    ${style.normal}

    She stands up and puts her hand on your shoulder.

    ${style.pink}
    "I will bestow your body with the mana I can sacrifice. However, your body has no ability to regenerate it.
    ${style.normal}

    You can feel a rush of energy enter your body, awakening nerves you never knew you had.

    You blink and find yourself in a totally different place.
  `);
}
