buffers = ['']
choices = {}
stdout = ''
depth = 0

game = require('game');

export reset = ->
  buffers = ['']

say = (inner) ->
  if typeof inner is 'function'
    depth += 1
    inner()
    depth -= 1
    return buffers[buffers.length-1]
  else if inner != null
    inner = ''+inner
    if inner[inner.length-1] in '.!?"'
      inner = inner + ' '

    buffers[buffers.length-1] += inner

scene = (inner) ->
  await inner()

speech = (inner) ->
  return '"' + inner + '"'

paragraph = (inner) ->
  return '\n' + inner

add = (object, ...additions) ->
  object.push(...additions)

Function::get = (props) ->
  for prop, func of props
    Object.defineProperty @prototype, prop,
      configurable: true
      get: func

Function::set = (props) ->
  for prop, func of props
    Object.defineProperty @prototype, prop,
      configurable: true
      set: func

class Character
  name: 'no name'
  sex: 'neuter'
  @get has_cock: -> @sex in ['male', 'herm']
  @get has_cunt: -> @sex in ['female', 'herm']

class NPC extends Character

player = new class extends Character
  name: 'Lucky'
  sex: 'female'

dom = new class extends NPC
  writer: 'hahaluckyme'
  name: 'Dom'
  met: false

class Room
  name: 'undefined'

bunker = new class extends Room
  name: 'Bunker'
  found: true

  enter: ->
    say "It's a bunker"

kennel = new class extends Room
  name: 'Happy Puppy Kennel'
  found: false

delay = (seconds) =>
  new Promise (r) => setTimeout(r, seconds * 1000);

oneof = ->
  if typeof arguments[0] is 'function'
    outcomes = arguments[0]
    keys = Object.keys outcomes
    random_key_index = Math.floor Math.random() * keys.length
    random_key = keys[random_key_index]
    say outcomes[random_key]
  else
    outcomes = arguments
    random_key_index = Math.floor Math.random() * outcomes.length
    return outcomes[random_key_index]


choice = (choices_func) ->
  choices = choices_func()
  game.print buffers[0]
  buffers = ['']
  game.setChoices choices

roll20 = (dc_outcomes_func) ->
  bonus = 0
  dc_outcomes = dc_outcomes_func()
  result = Math.floor Math.random() * 20 + 1 + bonus
  say paragraph "\x1b[31m[d20 + #{bonus} = #{result}]\x1b[00m"
  dcs = (Object.keys dc_outcomes).map (e) -> parseInt(e)
  max_dc_outcome = Math.max ...dcs.filter (e) -> result >= e
  if max_dc_outcome of dc_outcomes
    say dc_outcomes[max_dc_outcome]
  else
    min_dc_outcome = Math.min ...dcs
    say dc_outcomes[min_dc_outcome]

dom = new class extends NPC
  sex: 'male'
  met: false

Function::toString = ->
  buffers.push ''
  @()
  buffer = buffers.pop()
  return buffer
