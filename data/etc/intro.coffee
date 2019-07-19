export IntroRoom = new class extends Room
  Enter: =>
    await scene @Introo

  Introo: =>
    await scene IntroScene

export Nowhere = new class extends Room

export IntroScene = =>
  say paragraph "A cold breeze blows gently against your skin, rousing your consciousness as your eyes flutter open. The light is painful at first, but you quickly adjust, and soon your blurred vision sharpens, allowing you to see the cracks in the steamy glass in front of you clearly. You take a deep breath, letting the air fill your lungs as you try to remember what happened to you."

  say paragraph "You remember the earth shaking, the sound of screaming, the sight of people bursting into blue energy and vanishing into nothingness. You don't remember too much else about how you got into this situation, but at least you remember who you are."

  #  (if non-human: -at least you remember who you were, but you are different now than how you used to be.)

  # say paragraph "What's your name?"

  # await choice =>
    # "Lucky": =>
  Player.sex = "male"
  Player.name = "Player"

  await Player.location = ObservatoryInside
