console.log(require('rooms.mock'));
const React = require('react');
const style = require('style');
const scenes = require('scenes');
const plugins = require('plugins');

let component = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
}

export function load(data) {
  try {
    Object.keys(plugins).forEach(plugin_name => {
      plugins[plugin_name].load(data[plugin_name]);
    });
  } catch (e) {
    console.error('save for game could not be loaded: ' + e.message);
  }
}

export function save() {
  const data = {};
  Object.keys(plugins).forEach(plugin_name => {
    const plugin_data = plugins[plugin_name].save();
    if (plugin_data) {
      data[plugin_name] = plugin_data;
    }
  });
  return data;
}

// export function go(room) {
//   if (cur_room != null) {
//     cur_room.onExit && play(cur_room.onExit);
//   }
//
//   if (typeof room === 'string') {
//     room = rooms[room];
//   }
//
//   cur_room = room.name;
//
//   const onEnter = !room.has_entered
//     ? (room.onFirstEnter || room.onEnter)
//     : (room.onEnter);
//
//   room.onEnter && play(room.onEnter);
//   room.has_entered = true;
// }

export function setChoices(choices) {
  component.setChoices(choices);
}

export function printRaw(node) {
  component.print(node);
}

export function print(strings, ...keys) {
  component.print(style.text(strings, ...keys));
  component.print(<span>{'\n'}</span>);
}
