import 'prototypes';
import Scene from 'entities/Scene';

function print(strings, ...keys) {
  console.log(strings, keys);
}

const LuckyMixin = {
  writer: 'lucky',
}

function aphex_intro_yes() {
  print`
    ${pink}
    "I thank you for your service. And the world does not know it yet, but it thanks you, too."
    ${normal}

    She stands up and puts her hand on your shoulder.

    ${pink}
    "I will bestow your body with the mana I can sacrifice. However, your body has no ability to regenerate it.
    ${normal}

    You can feel a rush of energy enter your body, awakening nerves you never knew you had.

    You blink and find yourself in a totally different place.
  `
}

export default Object.assign({}, new class extends Scene {
  on_play() {
    print`
      You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power into your soul.

      It speaks a command that you cannot hear and your body lurches forward in response, pushing you through a ethereal fabric, tearing a hole for you to enter. Passing through, your body feels heavy and you fall to your knees, gasping for air as your lungs fill with air for what seems like the first time. Your ${true ? 'rough' : 'gentle'} entry knocks over a candle on the floor.

      You look up and see what looks to be a medieval-themed room. The walls are stone, the furniture is made out of hewn wood, and the various religious iconography are scattered around the room, although none from a religion that you've ever seen. A young human woman is standing in front of you, wearing what looks like a nightgown, seems to be almost... glowing.

      Dazed, you stammer at her, asking what's happening, and where you are.

      ${pink}
      "I have summoned you from your plane and I require your assistance. I am Aphex, the goddess of romance.
      ${normal}

      You pinch yourself and feel pain.

      ${pink}
      "This world is crumbling. Mana was innate in all creatures, and humanoids were no exception. But a catastrophe years ago wracked the magical balance, causing an imbalance to occur. Now, women have become unable to regenerate mana.

      "In some parts of the world, they were able to overcome this challenge with their technology. In most, it has caused a destruction in status quo, the new culture reflecting the clear power imbalance. And with it, my power wanes, and so too my influence, causing a vicious cycle that soon I will be completely unable to stop.

      "But we have time. If you are able to aid me, we can change course and I can guide civilization back from the brink of collapse.
      ${normal}

      She lowers herself to kneel on one knee, pointing her head towards your feet.

      ${pink}
      "I beg of you, will you accept my quest and restore order to this world?
      ${normal}
    `
  }

  "Yes"() {
    print`
      You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
    `

    willingness = "yes"
    aphex_intro_yes()
    church.play()
  }

  "Yes (lie)"() {
    print`
      You agree to help her out, but you keep silent that you're pretty sure you'll ditch the moment it gets dangerous for you.
    `

    willingness = "tentative"
    aphex_intro_yes()
    church.play()
  }

  "No"() {
    aphex_intro_no.play()
  }
});
