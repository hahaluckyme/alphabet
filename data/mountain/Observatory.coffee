export ObservatoryInside = new class extends Room
  discovered: false
  scavenged: false

  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "Placing your hands against the glass, you push hard. To your surprise, the door comes loose fairly easily, falling right off its hinges and onto the ground with a crash as the glass shatters across the concrete floor. The sound echoes throughout the room as you carefully climb out of the cylindrical confines and into what looks to be a makeshift lab of some sort. The machines around you are unlike anything you had ever seen, composed of various metals and crystals, now crushed, dented, and shattered. You have no idea where you are or what happened here, but it couldn't have been good."
    else
      say paragraph "It's the room you woke up in. There's an exit to the north."

  Choices: =>
    "Scavenge": if not @scavenged then =>
      await scene @Scavenge
    North: =>
      say paragraph "You leave the dusty room."
      await Player.location = ObservatoryOutside

  Scavenge: =>
    @scavenged = true
    say paragraph "You find various broken lab equipment on a nearby table. It doesn't look to be much use unless you want to risk cutting yourself on the glass."


export ObservatoryOutside = new class extends Room
  discovered: false

  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "Bright light striking your eyes, you lift your hands to shield yourself until your eyes properly adjust to the sun's rays."
    say paragraph "It's very cold out here. You're in some kind of forested area, and judging from your viewpoint, you appear to be at high elevation."

  Choices:
    South: => await Player.location = ObservatoryInside
    North: => await Player.location = CampsiteEmpty
