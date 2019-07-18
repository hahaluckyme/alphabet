# ExampleNPC
export ExampleLucky = new class extends NPC
  sex: "female"

  # example_property
  met: false

  # ExampleScene
  Introduce: =>
    # set some variables
    @met = true
    say paragraph "The catgirl looks at you and smiles. \"Hi! Welcome to my game.\""


# ExampleRoom
export ExampleAbandonedHouse = new class extends Room
  # example_property
  discovered: false

  # the Enter scene will be autoplayed when entering a room
  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You are in an abandoned house. It is old."
    else
      await scene @Look

  # ExampleScene
  Look: =>
    say paragraph "It's an Example Room."

  # choices will list these as the options for this room if the player is in it
  Choices: =>
    # "Label" will show as a button the player can choose
    "Look": =>
      await scene @Look
    # north, south, east, west, up, down
    North: =>
      say paragraph "You go north, but suddenly, you blink and realize you've teleported back to the same room you were just in."
      # normally you'd go to another room
      await Player.location = ExampleRoom


# ExampleScene
export ExampleFuck = =>
  say paragraph "Welcome, #{if player.sex is "female" then "slut" else "bud"}. Wanna fuck?"

  await choice =>
    "Yes": =>
      say paragraph "Sounds good to me!"
      await scene have_sex
    "No": =>
      say paragraph "No? Nobody says no to me. Get out of my face."

  say paragraph "They spit on the floor."


export ExampleHaveSex = =>
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


export ExamplePlayerGenitals = =>
  switch player.sex
    when "male"
      say "cock"
    when "female"
      say "cunt"


export ExampleOneOf = =>
  oneof =>
    1: => say paragraph "Good to see you again, #{player.name}."
    2: => say paragraph "How's it going?"
    3: => say paragraph "What's up?"


export ExampleSentenceBuilding = =>
  say paragraph "This is paragraph one."
  say "Sentence two?"
  say "Wow!"
  say paragraph "This is paragraph two."
  say "fe"
  say "male"
  say paragraph speech "Hello! This is dialogue."


export ExampleDifficultyRoll = =>
  # if you roll lower than all of the options, it will auto-choose the lowest number here
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


export ExampleOneOfInString = =>
  say paragraph "That house is #{oneof "red", "blue"}."
