export CaveInside = new class extends Room
  discovered: false
  scavenged: false

  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You wake up in a cave. There's bright light shining from to the north, where you could leave."
    else
      say paragraph "It's the cave you woke up in. There's an exit to the north."

  Scavenge: =>
    @scavenged = true
    take "Rock"
    say paragraph "You take a look at the surrounding area and find a rock. You put it in your pocket."

  choices: =>
    "Scavenge": if not @scavenged then =>
      await scene @Scavenge
    north: =>
      say paragraph "You leave the dusty cave."
      await Player.location = CaveOutside


export CaveOutside = new class extends Room
  discovered: false

  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "Bright light striking your eyes, you lift your hands to shield yourself until your eyes properly adjust to the sun's rays."
    say paragraph "It's very cold out here. You're in some kind of forested area, and judging from your viewpoint, you appear to be at high elevation."

  choices: =>
    south: => await Player.location = CaveInside
    north: => await Player.location = MountainCampsiteEmpty
