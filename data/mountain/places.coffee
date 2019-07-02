export cave_inside = new class extends Room
  discovered: false
  scavenged: false

  enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You wake up in a cave. There's bright light shining from to the north, where you could leave."
    else
      say paragraph "It's the cave you woke up in. There's an exit to the north."

  scavenge: =>
    @scavenged = true
    take "Rock"
    say paragraph "You take a look at the surrounding area and find a rock. You put it in your pocket."

  choices: =>
    "Scavenge": if not @scavenged then =>
      await scene @scavenge
    north: =>
      say paragraph "You leave the dusty cave."
      await player.location = "cave_outside"


export cave_outside = new class extends Room
  discovered: false

  enter: =>
    if not @discovered
      @discovered = true
      say paragraph "Bright light striking your eyes, you lift your hands to shield yourself until your eyes properly adjust to the sun's rays."
    say paragraph "It's very cold out here. You're in some kind of forested area, and judging from your viewpoint, you look to be at high elevation."

  choices: =>
    south: => await player.location = "cave_inside"
    north: => await player.location = "mountain"


export mountain = new class extends Room
  discovered: false
  take_chair: false
  take_pot: false
  take_bottles: false

  enter: =>
    say paragraph "There looks to be a campsite here. Around it is a tent, chair, and basic supplies, including cookware and two bottles of what looks like water. The fire is burning lightly."

  choices: =>
    if not Lars.met
      "Take tent": =>
        say paragraph "That's way too big for you to pick up."
      "Take chair": if not @take_chair then =>
        @take_chair = true
        take "Chair"
        if @take_pot
          say paragraph "You put the pot on your head and pick up the chair."
        else
          say paragraph "You pick up the chair with both hands."
        
        if @take_pot and @take_chair and @take_bottles
          await scene @angry_mountaineer
      "Take pots": if not @take_pot then =>
        @take_pot = true
        take "Pot"
        if @take_chair
          say paragraph "You put the pot on your head and pick up the chair."
        else
          say paragraph "You pick up the pot with your hand."
        if @take_pot and @take_chair and @take_bottles
          await scene @angry_mountaineer
      "Take bottle": if not @take_bottles then =>
        @take_bottles = true
        take "Water Bottle"
        take "Water Bottle"
        say paragraph "You take the two bottles and put them in your pockets."
        if @take_pot and @take_chair and @take_bottles
          await scene @angry_mountaineer
      "Wait": =>
        if @take_pot or @take_chair or @take_bottles
          await scene @angry_mountaineer
        else
          await scene Lars.introduce
      south: => await player.location = "cave_outside"
    else
      "Say hi to Lars": => say paragraph "You say hi to Lars, who says hi back."

  angry_mountaineer: =>
    say paragraph "You hear a growl from behind you. Turning around, you see a large wolf man staring at you."

    say paragraph "\"I don't think that belongs to you,\" he growls."

    say paragraph "He throws a hard punch at#{if @take_pot and @take_chair then " the pot on"} your head and you black out."

    await do pause

    say paragraph "You wake up with a throbbing headache. You find yourself still at the campsite, but night has fallen and you have a heavy collar around your neck, keeping you locked to a tree. The wolf man is cooking something at the fire, unaware that you are awake."

    await player.location = "captured_at_campsite"


export captured_at_campsite = new class extends Room
  times_begged: 0
  cried: false
  attempted_remove_collar: false

  beg: =>
    switch
      when @times_begged is 0
        say paragraph "You apologize profusely to him for stealing his things."
      when @times_begged is 1
        say paragraph "You plead at him, and that you've learned your lesson."
      when @times_begged is 2
        say paragraph "You beg for him to let you go, chains jangling as you move your head."
    @times_begged += 1

    if @times_begged is 3 and @cried
      await scene mountaineer_fuck

  choices: =>
    "Apologize": if @times_begged is 0 then =>
      await scene @beg
    "Plead": if @times_begged is 1 then =>
      await scene @beg
    "Beg": if @times_begged is 2 then =>
      await scene @beg
    "Cry": if not @cried then =>
      @cried = true
      say paragraph "You realize how much of a mess you've already gotten yourself into. Tears streak down your face."

      if @times_begged is 3 and @cried
        await scene mountaineer_fuck
    "Examine collar": if not @attempted_remove_collar then =>
      @attempted_remove_collar = true
      say paragraph "You look at the collar but it is securely fastened to your neck and around the tree."


export mountaineer_fuck = =>
  say paragraph "He walks closer to you, visibly annoyed."

  say paragraph "\"What are you waiting for, bitch? Get down on your knees and suck my cock like a good little whore for your alpha.\""

  say paragraph "You lose."

  await player.location = "nowhere"
