
export default new class extends Scene {
  on_play() {
    print`
      You say that she's definitely looking for another person--there's no way that someone like you would do this, let alone be able to! You're just a regular person.
      Her expression tightens and you feel like she may not be entirely interested in sending you home.
      ${style.pink}
      "It is beyond a mortal to summon across the planes. Wouldn't you like to take this unique opportunity to explore the world?"
      ${style.normal}
      A glint of light reflects from her eyes. You feel like someone is watching you from behind.
      ${style.pink}
      "Will you accept my quest, kind soul?"
      ${style.normal}
    `
  }
}

// setting the choices by array
export 'Yes'() {
  print`
    You open your mouth, but find yourself incapable of refusing her. You agree to help her out as best you can.

    ${pink}
    "Thank you, adventurer. Now go and be on your way! Can't be wasting time."
    ${normal}

    You blink and find yourself in a totally different place.
  `;

  go(rooms.church);
}
