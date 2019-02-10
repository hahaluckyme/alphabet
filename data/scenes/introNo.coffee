import {text, pink, normal} from 'style'
import {print} from 'game'
import {play} from 'Scene'
import Scene from 'Scene'
import {introNo} from 'scenes.mock'
import Player from 'Player'

export default Object.assign new Scene,
  writer: 'Lucky'

  onPlay: ->
    Player.is_willing = false
    print"""
      You say that she's definitely looking for another person--there's no way that someone like you would do this, let alone be able to! You're just a regular person.
      Her expression tightens and you feel like she may not be entirely interested in sending you home.

      #{pink}
      "It is beyond a mortal to summon across the planes. Wouldn't you like to take this unique opportunity to explore the world?"
      #{normal}

      A glint of light reflects from her eyes. You feel like someone is watching you from behind.

      #{pink}
      "Will you accept my quest, kind soul?"
      #{normal}
    """

  "1 Yes": ->
    print"""
      You open your mouth, but find yourself incapable of refusing her. You agree to help her out as best you can.

      #{pink}
      "Thank you, adventurer. Now go and be on your way! Can't be wasting time."
      #{normal}

      You blink and find yourself in a totally different place.
    """

    # go church
