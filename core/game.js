import intro from '../scenes/intro.js';
import chase_sex from '../scenes/chase_sex.js';
import * as vault from '../rooms/vault.js';
import * as character_creation from '../rooms/character_creation.js';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let component = null;
let last_choice = null;
let cur_scene = null;
let cur_room = null;

export function hook(comp) {
  component = comp;
}

export function play(scene) {
  cur_scene = scene();
  cur_scene.next();
}

export function go(room) {
  print();
  cur_room = room;
  play(cur_room.look);
}

export function text(strings, ...keys) {
  let output = '';
  for (let i = 0; i < strings.length; i++) {
    let section = strings[i]
      .replaceAll(/\n +/, '\n') // remove leading whitespace in paragraphs
      .replaceAll(/\n\n+/, '\n\n'); // 2 newlines at max
    if (i === 0) {
      section = section.trimLeft();
    }

    if (i === strings.length - 1) {
      section = section.trimRight();
    }

    output += section;

    if (i < keys.length) {
      output += keys[i];
    }
  }

  return output;
}

export function print(string) {
  component.print(string);
}

export function consent(mapping) {
  return choices(['Yes', 'No']);
}

export function choices(mapping) {
  if (Array.isArray(mapping)) {
     mapping = mapping.reduce(
      (map, obj, i) => {
        map[i+1] = obj;
        return map;
      },
      {},
    );
  } else if (mapping.constructor === Object) {
    console.log(mapping);
    mapping = mapping;
  } else {
    throw new Error('choices doesnt know what kind of input this is');
  }

  last_choice = mapping;
  Object.keys(mapping).forEach((key) => {
    component.print(`${key} - ${mapping[key]}`);
  });
}

export async function execute(command) {
  if (command === 'start') {
    cur_room = character_creation;
    play(intro);
  } else if (command === 'fuck') {
    play(chase_sex);
  } else if (last_choice != null ) {
    if (command in last_choice) {
      cur_scene.next(last_choice[command]);
      last_choice = null;
    } else {
      print('Invalid option');
    }
  } else if (command in cur_room) {
    cur_scene = cur_room[command]();
    console.log(cur_scene);
    cur_scene.next();
  } else if (command === '') {
    // nothing
  } else {
    print('What?');
  }
}
