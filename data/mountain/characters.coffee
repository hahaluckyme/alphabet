export Lars = new class extends NPC
  writer: ["hahaluckyme", "Song"]
  name: "Lars"
  sex: "male"
  met: false

  introduce: =>
    @met = true

    say paragraph "You wait a bit at the campsite. A short while later, you stare in disbelief as a werewolf man walks to you. He looks equally as surprised to see you. \"Hey, you!\", he shouts at you, and quickly draws closer. \"What are you doing here? Stealing?\""

    say paragraph "You take a few steps back and nervously tell the large wolf man that you didn't touch any of his things. In fact, you've actually just woken up a few minutes ago and came from that cave over there."

    say paragraph "He eyes you suspiciously. \"I haven't seen you around these parts. Normally nobody comes up here, not this far up the mountain. What were you doing in there?\""

    await choice =>
      "You don't know": =>

    say paragraph "You tell him that you really don't have any clue why you woke up there. Last thing you remember... well, you must have struck your head or something because you can't recall anything peculiar about the night before. You also mention that you've never seen a werewolf before, and you're curious who he is."

    say paragraph "He relaxes his expression, and seeing this, you relieve your tense muscles. \"You seem strange... but genuine. The name's Lars. I've been living on this mountain for years. Nobody else bothers me up here.\""

    say paragraph "You ask him how he's stayed hidden all this time. Christ, it's 2019 and you've never seen any news articles about him, or at least, the government seems to have suppressed the existence of werewolves to just fiction."

    say paragraph "Lars looks extremely confused. \"News? Government? 2019 was ages ago. There hasn't been a government for decades. Did you just wake up from a coma or something?\""

    await choice =>
      "What?": =>
      "No!": =>
      "Then what year is it?": =>

    say paragraph "Shocked, he ponders for a second and taps his finger to his snout. \"Oh... I've heard of this before. You're one of the time jumpers. Didn't think those were real.\" You stare at him. \"People who were shot into the future when the Burst happened? Well, I guess you wouldn't have heard of it if you really are one. That's crazy!\""

    await choice =>
      "Stare": =>
      "Time jumpers?": =>

    say paragraph "\"Ah, how do I put this delicately? Sorry, I don't talk to people much. Well, it's a couple of decades past the Burst. Don't have a clue exactly how long. There was a big crisis, the Burst, that is, and pretty much everybody disappeared off the face of the planet. Then most of the survivors turned into big furry creatures. And small ones, I guess. Like, that one movie about the animal people and cops?\""

    say paragraph "You're not sure whether this werewolf man is bullshitting you or not."

    await choice =>
      "Believe": =>
        say paragraph "Some part of you is telling you to run away from this madman, but this madman is a giant talking werewolf, so it can't be too much crazier."
      "Don't believe": =>
        say paragraph "\"Well, you'll believe me soon enough!\" he laughs. \"Sorry to break the news to you!\""

    say paragraph "... to be continued"
