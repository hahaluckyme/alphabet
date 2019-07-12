buffers = []
choices = {}
stdout = ''

game = require('game');

Function::_toString = Function::toString
Function::toString = =>
  buffers.push ''
  @()
  buffer = buffers.pop()
  return buffer

export flush = (force) =>
  if stdout.trim() is ''
    return
  lines = stdout.split '\n'

  if not force
    for line in lines[0...-1]
      game.print line
    [..., stdout] = lines
  else
    for line in lines
      game.print line
    stdout = ''

say = (inner) =>
  if inner != null
    inner = '' + inner
    inner = inner.replace 'undefined', ''
    if inner[inner.length-1] in '.!?"'
      inner = inner + ' '

    if buffers.length is 0
      stdout += ''+inner
      flush()
    else
      buffers[buffers.length-1] += inner

scene = (inner) =>
  await inner()

speech = (inner) =>
  return '"' + inner + '"'

paragraph = (inner) =>
  return '\n' + inner

add = (object, ...additions) =>
  object.push(...additions)

class Entity
  @get: (props) =>
    for prop, func of props
      Object.defineProperty @prototype, prop,
        configurable: true
        get: func
  @set: (props) =>
    for prop, func of props
      Object.defineProperty @prototype, prop,
        configurable: true
        set: func

class Character extends Entity
  @get has_cock: => @sex is 'male'
  @get has_cunt: => @sex is 'female'
  @set location: (target) => await game.goTo target
    

export Player = new class extends Character
  inventory: []
take = (...elems) => Player.inventory.push ...elems

class NPC extends Character
class Room extends Entity

delay = (seconds) =>
  flush(true)
  new Promise (r) => setTimeout(r, seconds * 1000);

oneof = =>
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

choice = (choices) =>
  flush(true)
  if typeof choices is 'function'
    choices = choices()
  return new Promise (resolve) => game.setChoices choices, resolve

pause = =>
  choice =>
    "...": =>

roll20 = (dc_outcomes_func) =>
  bonus = 0
  dc_outcomes = dc_outcomes_func()
  result = Math.floor Math.random() * 20 + 1 + bonus
  say paragraph "\x1b[31m[d20 + #{bonus} = #{result}]\x1b[00m"
  dcs = (Object.keys dc_outcomes).map (e) => parseInt(e)
  max_dc_outcome = Math.max ...dcs.filter (e) => result >= e
  if max_dc_outcome of dc_outcomes
    say dc_outcomes[max_dc_outcome]
  else
    min_dc_outcome = Math.min ...dcs
    say dc_outcomes[min_dc_outcome]
