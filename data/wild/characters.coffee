export Logan = new class extends NPC
  sex: "male"
  met: false

  Introduce: =>
    @met = true

    say paragraph "You wait a bit at the campsite. A short while later, you stare in disbelief as a wolf man walks toward you. He looks just as surprised as you are. \"Hey, you!\" he shouts quickly drawing closer. \"What are you doing here? You better not be stealing anything!\""

    say paragraph "You take a few steps back and nervously tell the large wolf that you didn't touch any of his belongings. In fact, you've actually just woken up a few minutes ago and came from that cave over there."

    say paragraph "He eyes you suspiciously. \"I haven't seen you around these parts. Normally nobody comes up here, not this far up the mountain. What were you doing in there?\""

    await choice =>
      "You don't know": =>

    say paragraph "You tell him that you really don't have any clue why you woke up there. Last thing you remember... well, you must have struck your head or something, because you can't recall anything peculiar about the night before. You also mention that you've never seen a werewolf before, and you're curious who he is."

    say paragraph "He relaxes his expression, and seeing this, you relieve your tense muscles. \"You seem strange... but genuine. The name's Logan. I've been living on this mountain for years. Nobody else bothers me up here.\""

    say paragraph "You ask him how he's stayed hidden all this time. Christ, it's 2019 and you've never seen any news articles about him, or at least, the government seems to have suppressed the existence of werewolves to just fiction."

    say paragraph "Logan looks extremely confused. \"News? Government? 2019 was ages ago. There hasn't been a government for decades. Did you just wake up from a coma or something?\""

    await choice =>
      "What?": =>
      "No!": =>
      "Then what year is it?": =>

    say paragraph "Shocked, he ponders for a few seconds and taps his finger to his snout. \"Oh... I've heard of this before. You're one of the time jumpers. Didn't think those were real.\" You stare at him. \"People who were shot into the future when the Burst happened? Well, I guess you wouldn't have heard of it if you really are one.\""

    await choice =>
      "Stare": =>
      "Time jumpers?": =>

    say paragraph "\"Ah, how do I put this delicately? It's been a couple of decades since the Burst. No clue exactly how long. There was ths big crisis and almost everyone disappeared off the face of the planet. The survivors turned into big furry creatures - and small ones, I guess.\""

    say paragraph "The wolf man gives you a sheepish look. \"Sorry if that's confusing. Don't really talk to people much.\" You can't help but feel skeptical, unsure if this is some sort of elaborate prank."

    await choice =>
      "Believe him": =>
        say paragraph "Some part of you is telling you to run away from this madman, but he is a giant talking werewolf, so it can't be too much crazier."
      "Refute his explanation": =>
        say paragraph "\"Well, you'll believe me soon enough!\" he laughs. \"Sorry to break the news to you!\""

    say paragraph "... to be continued"
