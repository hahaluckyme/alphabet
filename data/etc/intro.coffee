export IntroRoom = new class extends Room
  Enter: =>
    await scene IntroScene

export Nowhere = new class extends Room

export IntroScene = =>
  say paragraph "A cold breeze blows gently against your skin, rousing your consciousness as your eyes flutter open. The light is painful at first, but you quickly adjust, and soon your blurred vision sharpens, allowing you to see the crack in the steamy glass in front of you clearly. You take a deep breath, letting the air fill your lungs as you try to remember what happened to you."

  say paragraph "You remember the earth shaking, the sound of screaming, the sight of people bursting into blue energy and vanishing into nothingness. You don't remember too much else about how you got inter this situation, but at least you remember who you are."

  #  (if non-human: -at least you remember who you were, but you are different now than how you used to be.)

  say paragraph "What's your name?"

  await choice =>
    "Lucky": =>
      Player.sex = "male"
      Player.name = "Lucky"

  say paragraph "Places your hands against the glass, you push hard, and to your surprise, the door comes loose fairly easily, falling right off its hinges and onto the ground with a crash as the glass shatters across the concrete floor.  The sound echoes through out the room as you carefully climb out of the cylindrical confines, and into what looked to be a makeshift lab of some sort, but almost everything had been destroyed.  The machines themselves were unlike anything you had ever seen.  There were composed of various metals and crystals, now crushed, dented and shattered. You're left in a state of confusion.  You have no idea where you are or what happened here, but it couldn't have been good."

  await Player.location = ObservatoryInside
