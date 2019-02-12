import * as game from 'game';
import UnimplementedError from 'UnimplementedError';

let cur_room = null;

export function load(data) {
  try {
    cur_room = data;
  } catch (e) {
    console.error('save for Room could not be loaded: ' + e.message);
    cur_room = null;
  }
}

export function save() {
  const rooms = require('rooms'); // lazily loading the rooms at the latest time
  const data = {};

  if (cur_room) {
    data.cur_room = cur_room;
  }
  Object.keys(rooms).forEach(room_name => {
    const room_data = room.save();
    if (room_data) {
      data[room_name] = room_data;
    }
  });
  return data;
}

export function enter(room) {
  const rooms = require('rooms'); // lazily loading the rooms at the latest time
  cur_room = room;
  rooms[room].onEnter();

  // set choices from the scene
  game.setChoices(rooms[room].getExits());
}

export default class Room {
  writer = 'unowned';
  exits = null;

  save() {
    Object.keys(this).forEach(property_name => {
      if (typeof this[property_name] !== 'function') {

      }
    });
  }

  enter() {
    this.onEnter();
  }

  getExits() {
    if (this.exits == null) {
      const exits = {};
      Object.keys(this).forEach(property_name => {
        if (/^[12345qwertasdfg] /.test(property_name)) {
          const key = property_name.substr(0, 1);
          const label = property_name.substr(2);

          exits[key] = {
            label,
            action: this[property_name],
          };
        }
      });

      return exits;
    }

    return this.exits;

    // return {
    //   '1': {
    //     label: 'error',
    //     action: function() {
    //       throw new UnimplementedError('the writer didnt make any options!');
    //     }
    //   }
    // };
  }

  // interface
  onEnter() { throw new UnimplementedError('this scene was called but has no content!'); }
}
