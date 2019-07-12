export Nowhere = new class extends Room
  discovered: false

  Enter: =>
    if not @discovered
      @discovered = true
      await scene Intro


export Intro = ->
  await Player.location = CaveInside
  return

  say paragraph "Choose your sex!"

  await choice =>
    "Male": =>
      Player.sex = "male"
    "Female": =>
      Player.sex = "female"

  say paragraph "Nice work! You're #{Player.sex}! Now choose your name!"

  await choice =>
    "Lucky": =>
      Player.name = "Lucky"
    "Song": =>
      Player.name = "Song"

  say paragraph "Nice to meet you, #{Player.name}!"

  say paragraph "Character creation done. Welcome to the game."

  await Player.location = CaveInside
