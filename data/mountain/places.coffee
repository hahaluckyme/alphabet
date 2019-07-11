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
    say paragraph "It's very cold out here. You're in some kind of forested area, and judging from your viewpoint, you appear to be at high elevation."

  choices: =>
    south: => await player.location = "cave_inside"
    north: => await player.location = "mountain"


export mountain = new class extends Room
  discovered: false
  take_chair: false
  take_pot: false
  take_bottles: false

  enter: =>
    say paragraph "There appears to be a campsite here."
    switch
      when not @take_chair and not @take_pot and not @take_bottles
        say "Around it are a tent, chair, and basic supplies, including cookware and two bottles of water."
      when not @take_chair and not @take_pot
        say "Around it are a tent, chair, and a pot with some silverware next to it."
      when not @take_chair and not @take_bottles
        say "Around it are a tent, chair, and two water bottles standing near the base of the fire pit."
      when not @take_pot and not @take_bottles
        say "Around it are a tent, some basic cookware, and two water bottles."
      when not @take_chair
        say "Around it are a tent and a chair."
      when not @take_pot
        say "Around it are a tent and a pot with some silverware."
      when not @take_bottles
        say "Around it are a tent and two water bottles."
    say "The fire is burning lightly."

  choices: =>
    if not Logan.met
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
          say paragraph "You put the pot on your head, pocket the silverware, and pick up the chair again with your hands."
        else
          say paragraph "You pick up the pot and pocket the silverware."
        if @take_pot and @take_chair and @take_bottles
          await scene @angry_mountaineer
      "Take bottle": if not @take_bottles then =>
        @take_bottles = true
        take "Water Bottle"
        take "Water Bottle"
        say paragraph "You take the two bottles and stuff them in your pockets."
        if @take_pot and @take_chair and @take_bottles
          await scene @angry_mountaineer
      "Wait": =>
        if @take_pot or @take_chair or @take_bottles
          await scene @angry_mountaineer
        else
          await scene Logan.introduce
      south: => await player.location = "cave_outside"
    else
      "Say hi to Logan": => say paragraph "You say hi to Logan, who says hi back."

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
        say paragraph "You plead to him, claiming that you've learned your lesson."
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
      say paragraph "You look at the collar. It is securely fastened to your neck and around the tree."


export mountaineer_fuck = =>
  say paragraph "The wolf walks closer to you, visibly annoyed."

  say paragraph "\"Name's Logan,\" he speaks curtly. \"This is my territory, and I don't care much for lowlife thieves like you. You're lucky I didn't go for the throat the moment I spotted you rifling through my camp.\" You nod and remain quiet, not wishing to draw the wolf's ire. \"Don't think I'm letting you off the hook that easily, though. I'm going to make sure you never, ever think of pulling a stunt like that again.\""
  
  say paragraph "The large wolf crouches down in front of you, looking into your eyes with a cold, determined intensity. That stony expression shifts as he looks you up and down, his muzzle soon quirking in a crooked smirk. \"Come to think of it, you might be better off with a few 'modifications' for my needs. It gets lonely out here in the wilderness, you know.\""
  
  say paragraph "Afraid of what he means by this, his suggestion becomes plainly apparent when he stands up again, the plump fullness of his sheath now level with your face, burgundy cocktip already poking free of its confines. The strong aroma of virility wafts from that prominent package, clouding your mind and making it difficult to collect your thoughts. Even so, you strain against your collar, struggling to escape from your soon-to-be rapist and feebly crying out for help."

  say paragraph "\"Stop your whining,\" Logan commands, a large paw seizing your throat and squeezing it roughly until you're gasping for breath. \"A good bitch doesn't piss and moan when she's about to be fucked. No, a good bitch opens wide and takes that cock like a champ. Now do as you're told before I cram it your cunt instead.\" By the time his vise-like grip relents, you're coughing and shuddering with revulsion, fearing that there's no other way out of this. You look back at the thick, pulsing presence of his ample wolfcock before you, easily nine inches of exotic lupine shaft just waiting to be serviced. There's something strangely tempting about it, but you don't stop resisting, "

  # TODO: Lars fucks your throat

  say paragraph "You lose."

  await player.location = "nowhere"
