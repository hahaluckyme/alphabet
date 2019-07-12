# example NPC
export ExampleNPC = new class extends NPC
  sex: "male"

  # example property
  met: false

  # example scene
  talk: =>
    @met = true
    say paragraph "\"Hail! Good to meet you.\""


# example Room
export ExampleRoom = new class extends Room
  discovered: false

  enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You see the Example Room for the first time."
    else
      await scene @look

  look: =>
    say paragraph "It's an Example Room."

  choices: =>
    "Look": =>
      await scene @look
    north: =>
      say paragraph "You go north."
      await Player.location = ExampleRoom


# comments
export slut_fuck = =>
  say paragraph "Welcome, #{if player.sex is "female" then "slut" else "bud"}. Wanna fuck?"

  await choice =>
    "Yes": =>
      say paragraph "Sounds good to me!"
      await scene have_sex
    "No": =>
      say paragraph "No? Nobody says no to me. Get out of my face."


export have_sex = =>
  switch player.sex
    when "female"
      say paragraph "All right let's fuck!"
      await choice =>
        "Pussy": =>
          say paragraph "Damn what a fine cunt"
        "Ass": =>
          say paragraph "Eh, it'll do."
    when "male"
      say paragraph "No cunt? Well at least you got an asshole."


export player_genitals = =>
  switch player.sex
    when "male"
      say "cock"
    when "female"
      say "cunt"


export intro2 = =>
  player.name = "Lucky"

  if not dom.met
    dom.met = true
    say paragraph "Hi I haven't met you before. Your name is #{player.name}? Nice to meet you."
  else
    oneof =>
      1: => say paragraph "Good to see you again, #{player.name}."
      2: => say paragraph "How's it going?"
      3: => say paragraph "What's up?"


export intro3 = =>
  say paragraph "This is paragraph one."
  say "Sentence two?"
  say "Wow!"
  say paragraph "This is paragraph two."
  say "fe"
  say "male"
  say paragraph speech "Hello! This is dialogue."


export intro4 = =>
  roll20 =>
    1: =>
      say paragraph "You did shit"
    5: =>
      say paragraph "You did bad"
    10: =>
      say paragraph "You did okay"
    15: =>
      say paragraph "You did good"
    20: =>
      say paragraph "You did godly"


export intro5 = =>
  say paragraph "That house is #{oneof "red", "blue"}."


export intro6 = =>
  say paragraph "You see a vulnerable female husky sleeping."

  add player.traits, "Sadist"

  await choice =>
    "Rape is good":
      requirements: => "Sadist" in player.traits
      outcome: =>
        say paragraph "I win"
        await say sex_with_dom
    "Walk away": =>
      say paragraph "No? Nobody says no to me."

  say paragraph "You made a choice!"
