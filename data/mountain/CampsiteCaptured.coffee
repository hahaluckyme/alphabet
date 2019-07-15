export CampsiteCaptured = new class extends Room
  times_begged: 0
  cried: false
  times_examined_collar: 0

  Enter: =>
    say paragraph "You wake up with a throbbing headache. You find yourself still at the campsite, but night has fallen and you have a heavy collar around your neck, keeping you locked to a tree. The wolf man is cooking something at the fire, unaware that you are awake."

  choices: =>
    "Apologize": if @times_begged is 0 then =>
      await scene @Beg
    "Plead": if @times_begged is 1 then =>
      await scene @Beg
    "Beg": if @times_begged is 2 then =>
      await scene @Beg
    "Cry": if not @cried then =>
      @cried = true
      say paragraph "You realize how much of a mess you've already gotten yourself into. Tears streak down your face."

      if @times_begged is 3 and @cried
        await scene LoganCaptureFuck
    "Examine collar": if times_examined_collar < 3 then =>
      say paragraph "You look at the collar. It is securely fastened to your neck and around the tree."
      @times_examined_collar += 1

      # TODO: On third time, you notice that one of the links on the chain is broken
    # TODO: Try to look for a hard object if you've noticed the broken link
      # TODO: Grab the hard object
    # TODO: Try to escape if you have the hard object
      # TODO: You break the chain and attempt to run away, but get caught because Logan is faster than you.
      # TODO: Angry fuck scene
      # TODO: Post-end game credits describing you being broken in as his bitch, but you're completely broken and collared.

  Beg: =>
    switch
      when @times_begged is 0
        say paragraph "You apologize profusely to him for stealing his things."
      when @times_begged is 1
        say paragraph "You plead to him, claiming that you've learned your lesson."
      when @times_begged is 2
        say paragraph "You beg for him to let you go, chains jangling as you move your head."
    @times_begged += 1

    if @times_begged is 3 and @cried
      await scene LoganCaptureFuck

export LoganCaptureFuck = =>
  say paragraph "The wolf walks closer to you, visibly annoyed."

  say paragraph "\"Name's Logan,\" he speaks curtly. \"This is my territory, and I don't care much for thieves like you. You're lucky I didn't go for the throat when I saw you rifling through my camp.\" You nod and remain quiet, not wishing to draw the wolf's ire. \"Don't think I'm letting you off the hook that easily, though. I'm going to make sure you never, ever think of pulling a stunt like that again.\""

  say paragraph "The large wolf crouches down in front of you, looking into your eyes with a cold, determined intensity. That stony expression shifts as he looks you up and down, his muzzle soon quirking in a crooked smirk. \"Come to think of it, you might be better off as my bitch. It gets lonely out here in the wilderness, you know.\""

  say paragraph "Afraid of what he means by this, his suggestion becomes plainly apparent when he stands up again, the plump fullness of his sheath now level with your face, burgundy cocktip already poking free of its confines. The strong aroma of virility wafts from that prominent package, clouding your mind and making it difficult to collect your thoughts. Even so, you strain against your collar, struggling to escape from your soon-to-be rapist and feebly crying out for help."

  say paragraph "\"Stop your whining,\" Logan commands, a large paw seizing your throat and squeezing it roughly until you're gasping for breath. \"A good bitch doesn't piss and moan when she's about to be fucked. No, a good bitch opens wide and takes that cock like a champ. Now do as you're told before I cram it your cunt instead.\" By the time his vise-like grip relents, you're coughing and shuddering with revulsion, fearing that there's no other way out of this. You look back at the thick, pulsing presence of his ample wolfcock before you, easily nine inches of exotic lupine shaft just waiting to be serviced. There's something strangely tempting about it, but you don't stop resisting, "

  # TODO: Logan realizes that he's been fairly lonely, and needs a submissive bitch.

  # TODO: Logan fucks your throat, you cough and cry sputtering up the spunk.

  # TODO: You transform into Logan's bitch.

  # TODO: Logan fucks you in your virgin pussy.

  # TODO: Post-end game credits describing you being broken in as his bitch, but ending up relatively happy as his slutty wife

  say paragraph "You lose."

  await Player.location = Nowhere
