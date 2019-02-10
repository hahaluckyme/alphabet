require('prototypes');
const React = require('react');
const style = require('style');
const scenes = require('scenes');

let component = null;
let cur_room = null;
let cur_scene = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
}

export function go(room) {
  if (cur_room != null) {
    cur_room.onExit && play(cur_room.onExit);
  }

  if (typeof room === 'string') {
    room = rooms[room];
  }

  console.log(rooms);
  console.log(room);
  cur_room = room.name;

  const onEnter = !room.has_entered
    ? (room.onFirstEnter || room.onEnter)
    : (room.onEnter);

  room.onEnter && play(room.onEnter);
  room.has_entered = true;
}

export function play(scene) {
  if (typeof scene === 'function') {
    scene();
    return;
  }

  cur_choice = null;
  if (cur_scene != null) {
    component.print(<span>{'\n'}</span>);
  }

  // if (typeof scene === 'string') {
  //   scene = scene in rooms[cur_room]
  //     ? rooms[cur_room][scene]
  //     : scenes[scene];
  // }

  cur_scene = name;
  scenes[scene].play();

  // set choices from the scene
  component.setChoices(scenes[scene].getChoices());
}

export function restart() {
  cur_room = null;
  play('intro');
}

export function load(data) {
  console.log(data);
  cur_room = data.cur_room;
  play(data.cur_scene);
}

export function save() {
  const save = {
    cur_room,
    cur_scene,
  };
  return save;
}

export function print(strings, ...keys) {
  component.print(style.text(strings, ...keys));
  component.print('\n');
}

export function yes_or_no(yes_action, no_action) {
  choose([
    {
      label: 'Yes',
      action: yes_action,
    },
    {
      label: 'No',
      action: no_action,
    },
  ]);
}

export function choose(mapping) {
  if (Object.keys(mapping).every(key => ALLOWED_KEYS.includes(key))) {
    // dict, but it is a key mapping
    component.setChoices(mapping);
    cur_choice = mapping;
  } else if (Array.isArray(mapping)) {
    // is an array--default to 1,2,3,4,5
    mapping = mapping.reduce(
      (acc, choice, i) => {
        acc[i+1] = choice;
        return acc;
      },
      {},
    );
    choose(mapping);
  } else {
    // dict, but it is a label mapping
    mapping = Object.keys(mapping).map(key => ({
      label: key,
      action: mapping[key],
    }));
    choose(mapping);
  }
}

export async function execute(key) {
  if (key in cur_choice) {
    const isButtonDisabled = cur_choice[key].disabled === true
      || typeof cur_choice[key].disabled === 'string';

    if (!isButtonDisabled) {
      print(<span>{'\n'}<b>> {cur_choice[key].label}</b>{'\n'}</span>);
      cur_choice[key].action();
    }
    save();
  }
}
