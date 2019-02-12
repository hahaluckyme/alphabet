import {text, pink, normal} from 'style'
import {print} from 'game'
import {play} from 'Scene'
import Scene from 'Scene'
import {IntroNo} from 'scenes.mock'
import Player from 'Player'
import {enter} from 'Room'
import Room from 'Room'
import {Church, ChurchWestWing, ChurchNorthWing} from 'rooms.mock'

IntroYes = ->
  print"""
    #{pink}
    "I thank you for your service. And the world does not know it yet, but it thanks you, too."
    #{normal}

    She stands up and puts her hand on your shoulder.

    #{pink}
    "I will bestow your body with the mana I can sacrifice. However, your body has no ability to regenerate it.
    #{normal}

    You can feel a rush of energy enter your body, awakening nerves you never knew you had.

    You blink and find yourself in a totally different place.
  """
  enter Church

export default Object.assign new Scene,
  writer: 'Lucky'

  onPlay: ->
    print"""
      You try to open your eyes but see only darkness. You instinctively blink a few times, but you can't feel your eyelids. But you know there to be a silhouette in front of you--its very existence exuding power into your soul.

      It speaks a command that you cannot hear and your body lurches forward in response, pushing you through a ethereal fabric, tearing a hole for you to enter. Passing through, your body feels heavy and you fall to your knees, gasping for air as your lungs fill with air for what seems like the first time. Your #{if true then 'rough' else 'gentle'} entry knocks over a candle on the floor."

      She lowers herself to kneel on one knee, pointing her head towards your feet.

      #{pink}
      "I beg of you, will you accept my quest and restore order to this world?
      #{normal}
    """

  "1 Yes": ->
    print"""
      You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
    """
    Player.is_willing = true
    play IntroYes

  "2 Yes (lie)": ->
    print"""
      You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
    """
    Player.is_willing = true
    play IntroYes

  "3 No": ->
    play IntroNo
