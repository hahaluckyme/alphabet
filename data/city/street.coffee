export CityStreet = new class extends Room
  discovered: false

  Enter: =>
    if not @discovered
      @discovered = true
      say paragraph "You see the city street for the first time."
    else
      await scene @Look

  Look: =>
    say paragraph "It's a city street."

  Choices: =>
    "Look": =>
      await scene @Look
    North: =>
      say paragraph "You go north."
