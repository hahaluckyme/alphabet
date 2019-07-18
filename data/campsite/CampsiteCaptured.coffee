export CampsiteCaptured = new class extends Room
  cried: false
  times_begged: 0
  times_called: 0
  times_examined_collar: 0

  Enter: =>
    say paragraph "You wake up with a throbbing headache. You find yourself still at the campsite, but night has fallen and you have a heavy collar around your neck, keeping you locked to a tree. The wolf man is cooking something at the fire, unaware that you have just awoken."

  Choices: =>
    "Call out": =>
      say paragraph "You call out to the wolf to get his attention. One of his ears flickers at the sound, but he seems to be ignoring you. You call out again, louder this time, and the wolf twists aside to look over his shoulder. \"Oh, you're awake,\" he rumbles, his voice low and confident. \"About time, too. I was starting to worry. It'd be a shame if I already broke you.\" Somehow you can tell he's not being sincere."
      say paragraph "The wolf man rises to his feet and sets the metal poker he was holding aside across a camping chair. Now upright, you can see that he's easily six and half feet tall, with broad, muscular shoulders and a toned core that's only barely softened by the thick black fur covering his body top to bottom. With a stern look in eyes, he walks closer to you. \"We don't take kindly to thieves around these parts,\" he growls. \"Looks like I'll have to teach you a lesson you won't soon forget.\""
      say paragraph "You swallow nervously at the thought, wondering what in the world the large wolf has in store for you. His intent becomes apparent when you notice the growing bulge in his pants, weathered fabric straining against his emerging length. A paw-like hand reaches below to unzip the fly before a thumb hooks under the elastic of his underwear. He peels the fabric down just enough to give you a glimpse at the dark red meat of his distinctly canine cock, that heavy dog-dick clearly eager to be put to use. \"Well, it's not going to suck itself,\" the well-hung lupine teases, and you whimper at the thought of taking that exotic, bestial maleness."
      await do pause
      say paragraph "With scarce time to protest, he presses the tapered crown of his cock to your lips, warm precum drooling over your face. You instinctively pull back, only to be jarred forward again by the sturdy chain keeping your collar bound to the tree. Not intent on becoming some monster's plaything, you pull and thrash against the chain, grasping at it desperately in an effort to break, loosen, or otherwise pry free before he the man can rape you. While amused at first, even chuckling to himself at your predicament, the wolf soon tires of this foreplay and grabs you roughly by the back of your head, holding you still as he re-aligns his wolven manhood."
      say paragraph "Panic devolves into stock-stiff tension when the wolf man presses forward, pushing past the puckered resistance of your lips to sink into your mouth . Sharp claws pressing threateningly against the back of your neck dispel the temptation to bite down, a wordless threat of the punishment awaiting a disobedient bitch. Your taste buds are immediately filled with the strong, pungent taste of the lupine's manmeat, warm and damp with sweat from a long day's work, speaking of countless hours of hard manual labor and putting petty thieves in their place. You swear you can taste a hint of the juices from your rapist's past conquests, but that subtle mote is pushed from your mind as the intense flavor wafts and suffuses your senses."
      say paragraph "Gurgling wetly around wolfcock, you suppress the urge to gag as that thick red bauble brushes across the back of your throat, pinning your uvula against the roof of your mouth with no concern for your comfort. He's not even fully hilted and you already feel short of breath, every deep draw infused with the hot, almost spicy musk of your captor's fat cock. The mind-melting aroma leaves no room for anything but the feeble whimpers that leave your lips as he ushers you closer toward the firm knot at its base. By the time you press firm to that hard, ample root, your head is swimming with instinctual need while your conscious mind screams to pull away, to escape. Your hands plant firm into the male's muscular thighs, squeezing and shoving, but those efforts fall short when the painful prick of his claws against flesh keep you in line."
      await do pause
      say paragraph "\"Rrrf! Bet you've never taken a cock like this, have you? Don't- nnh, worry. I'm going to take my time breaking you in, little bitch.\" His voice comes as a harsh pant, each raspy breath joined by the pulse of his wolven dick within you. The way it flares to the thump of his heart makes your mouth water against your own wishes, and soon you're drooling around the tasty fuckstick buried knot-deep in your mouth like a common whore. A low growl from above signals the wolf's approval, and that twisted, growing part of you finds yourself excited for more when he pulls back to begin thrusting."
      say paragraph "Being fucked slowly at first, your only sense of your surroundings past the thick fur obscuring your vision is the steady pat of his heavy orbs against your chin and the sounds of nature in the background, apathetic to your plight. You whine whenever he leaves only the fluted crown past you lips, and you gurgle or hack weakly when that pulsing pillar of cock drives deep into your mouth, pushing partway down your throat with each rough thrust. The bed of dirt and leaves beneath you and the coarse texture of tree bark against your back provide little comfort as you're roughly orally violated, the wolf seeming to pick up the pace with each wet slap against your face. His grunts and snarls of pleasure stand in stark contrast to your own fearful noises, though your voice devolves increasingly into weak moans, unable to deny enjoying this on some baser level despite your mind's objections."
      await do pause
      say paragraph "Just when your throat starts to feel raw from being used as a scarcely lubed sleeve, the wolf grips the back of your head tightly and pulls you firm to his bulging base. The surge of bloodflow seems to expand that already swollen root, flaring flesh gnashing against your teeth as he puts every ounce of his being into dislocating your jaw with that wolfcock. Tears running down your face, a pained cry leaves you when resistance finally gives and that overlarge base pops past your teeth, leaving your mouth stretched wider than you've ever felt before. Something between a moan and a shrill cry leaves you as his seed pours down your gullet, pumping past your taste buds and directly down your throat with each hot blast of lupine cum. Those thick ropes ebb before flaring anew with each strained twitch of turgid cockmeat, dousing your lungs in the hot, lurid essence of this incredibly virile beast."
      say paragraph "By the time that seemingly ceaseless flow tapers, your body has gone limp from the shock of being orally raped, unable to cope with the horror and lust that flow through you in equal parts. This feeling is even reflected below, your untended length left half-hard beneath the fabric of your pants, rubbing teasingly between fabric and skin. All you can manage is weak, pathetic suckling around that cum-slathered wolfcock while the lupine looks down at you smugly, a paw stroking over your cheek in mock-praise while the other reaches up to ruffle through your hair. \"Ah, god, I needed a good fuck,\" he sighs happily, chest rising and falling as he pants with his tongue lolling out. \"Now be a good little bitch and <i>stay</i>. It's not like we're going anywhere soon with that cute little mouth spread around my cock.\""
      await do end

  Call: =>
    switch
      when @times_called is 0
        say paragraph "You call out to the wolf to get his attention. One of his ears flickers at the sound, but he doesn't pay you any mind."
      when @times_called is 1
        say paragraph "Louder this time, you call to the wolf. He continues to ignore you, now quietly humming a song to himself to drown out your protests."
      when @times_called is 2
        say paragraph "Try as you might to get him to pay attention to you, nothing you yell or cry out seems to "
    @times_called += 1

    # "Apologize": if @times_begged is 0 then =>
    #   await scene @Beg
    # "Plead": if @times_begged is 1 then =>
    #   await scene @Beg
    # "Beg": if @times_begged is 2 then =>
    #   await scene @Beg
    # "Cry": if not @cried then =>
    #   @cried = true
    #   say paragraph "You realize how much of a mess you've already gotten yourself into. Tears streak down your face."

    #   if @times_begged is 3 and @cried
    #     await scene LoganCaptureFuck
    # "Examine collar": if @times_examined_collar < 3 then =>
    #   say paragraph "You look at the collar. It is securely fastened to your neck and around the tree."
    #   @times_examined_collar += 1

    #   TODO: On third time, you notice that one of the links on the chain is broken
    # TODO: Try to look for a hard object if you've noticed the broken link
    #   TODO: Grab the hard object
    # TODO: Try to escape if you have the hard object
    #   TODO: You break the chain and attempt to run away, but get caught because Logan is faster than you.
    #   TODO: Angry fuck scene
    #   TODO: Post-end game credits describing you being broken in as his bitch, but you're completely broken and collared.

  # Beg: =>
  #   switch
  #     when @times_begged is 0
  #       say paragraph "You apologize profusely to him for stealing his things."
  #     when @times_begged is 1
  #       say paragraph "You plead to him, claiming that you've learned your lesson."
  #     when @times_begged is 2
  #       say paragraph "You beg for him to let you go, chains jangling as you move your head."
  #   @times_begged += 1

    if @times_begged is 3 and @cried
      await scene LoganCaptureFuck

export LoganCaptureFuck = =>


  # TODO: Logan realizes that he's been fairly lonely, and needs a submissive bitch.
  # (Song: Functionally completed!)

  # TODO: Logan fucks your throat, you cough and cry sputtering up the spunk.
  # (Song: Halfway done, need to describe knot being pulled out and aftermath.)

  # TODO: You transform into Logan's bitch.

  # TODO: Logan pushes you on all fours and fucks you in your virgin pussy doggystyle

  # TODO: Post-end game credits describing you being broken in as his bitch, but ending up relatively happy as his slutty wife

  # ends the game
  await do end
