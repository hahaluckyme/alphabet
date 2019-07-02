export nowhere = new class extends Room
  discovered: false

  enter: =>
    if not @discovered
      @discovered = true
      await scene intro


export intro = ->
  await player.location = "cave_inside"
  return

  say paragraph "Choose your sex!"

  await choice =>
    "Male": =>
      player.sex = "male"
    "Female": =>
      player.sex = "female"

  say paragraph "Nice work! You're #{player.sex}! Now choose your name!"

  await choice =>
    "Lucky": =>
      player.name = "Lucky"
    "Song": =>
      player.name = "Song"

  say paragraph "Nice to meet you, #{player.name}!"

  say paragraph "Character creation done. Welcome to the game."

  await player.location = "cave_inside"
