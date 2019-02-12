import {text, pink, normal} from 'style'
import {print} from 'game'
import {play} from 'Scene'
import Scene from 'Scene'
import {IntroNo} from 'scenes.mock'
import Player from 'Player'
import {enter} from 'Room'
import Room from 'Room'
import {Church, ChurchWestWing, ChurchNorthWing} from 'rooms.mock'

CallAphex = ->
  if has_called_aphex
    print"""
      You call Aphex but there is no reply.
    """
    has_called_aphex = true
  else
    print"""
      You already tried to call Aphex but you do it again. There is no reply.
    """

export default Object.assign new Room,
  writer: 'Lucky'

  onEnter: ->
    print"""
      The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
    """

  "1 Call Aphex": ->
    print"""
      You agree that you will do it. You're not sure what you need to do or if you can succeed, but you will try your best to help her.
    """
    play CallAphex

  "w North Wing": ->
    print"""
      You head towards the north wing.
    """
    enter ChurchNorthWing

  "a West Wing": ->
    print"""
      You head towards the west wing.
    """
    enter ChurchWestWing
