export CityStreet = new class extends Room
  discovered: false

  enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You see the city street for the first time."
    else
      await scene @look

  look: =>
    say paragraph "It's a city street."

  choices: =>
    "Look": =>
      await scene @look
    north: =>
      say paragraph "You go north."
