export CampsiteEmpty = new class extends Room
  discovered: false
  take_chair: false
  take_pot: false
  take_bottles: false
  # TODO: Rewrite to prioritize survival-oriented items, such as water, food, some kind of knife, etc.

  Enter: =>
    say paragraph "While wandering along the outside perimeter of the repurposed observatory, you stumble across a small campsite."
    switch
      when not @take_chair and not @take_pot and not @take_bottles
        say "Within the campsite are a tent, chair, and basic supplies, including cookware and two bottles of water."
      when not @take_chair and not @take_pot
        say "Within the campsite are a tent, chair, and a pot with some silverware next to it."
      when not @take_chair and not @take_bottles
        say "Within the campsite are a tent, chair, and two water bottles standing near the base of the fire pit."
      when not @take_pot and not @take_bottles
        say "Within the campsite are a tent, some basic cookware, and two water bottles."
      when not @take_chair
        say "Within the campsite are a tent and a chair."
      when not @take_pot
        say "Within the campsite are a tent and a pot with some silverware."
      when not @take_bottles
        say "Within the campsite are a tent and two water bottles."
    say "The fire is burning lightly. It appears to be lived-in, but you don't see anyone around at the moment."

  Choices: =>
    "Take the tent": =>
      say paragraph "That's way too big for you to pick up."
    "Take the chair": if not @take_chair then =>
      @take_chair = true
      take "Chair"
      if @take_pot
        say paragraph "You put the pot on your head and pick up the chair."
      else
        say paragraph "You pick up the chair with both hands."

      if @take_pot and @take_chair and @take_bottles
        await scene @AngryMountaineer
    "Take the pots": if not @take_pot then =>
      @take_pot = true
      take "Pot"
      if @take_chair
        say paragraph "You put the pot on your head, pocket the silverware, and pick up the chair again with your hands."
      else
        say paragraph "You pick up the pot and pocket the silverware."
      if @take_pot and @take_chair and @take_bottles
        await scene @AngryMountaineer
    "Take the bottles": if not @take_bottles then =>
      @take_bottles = true
      take "Water Bottle"
      take "Water Bottle"
      say paragraph "You take the two bottles and stuff them in your pockets."
      if @take_pot and @take_chair and @take_bottles
        await scene @AngryMountaineer
    "Wait": =>
      if @take_pot or @take_chair or @take_bottles
        await scene @AngryMountaineer
      else
        await scene Logan.Introduce
    South: =>
      if @take_pot or @take_chair or @take_bottles
        await scene @AngryMountaineer
      else
        await Player.location = ObservatoryOutside

  AngryMountaineer: =>
    say paragraph "You hear a growl from behind you. Turning around, you see a large wolf man staring at you."

    say paragraph "\"I don't think that belongs to you,\" he growls."

    say paragraph "He throws a hard punch at your head and you black out."

    await do pause

    await Player.location = CampsiteCaptured
