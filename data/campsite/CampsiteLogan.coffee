export CampsiteLogan = new class extends Room
  Enter: =>
    say paragraph "There appears to be a campsite here."

  Choices: =>
    "Say hi to Logan": => say paragraph "You say hi to Logan, who says hi back."
