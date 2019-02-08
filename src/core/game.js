require('prototypes');
const React = require('react');
const modules = require('modules');
const {scenes, rooms} = modules;

export const ALLOWED_KEYS = [
  '1', '2', '3', '4', '5',
  'q', 'w', 'e', 'r', 't',
  'a', 's', 'd', 'f', 'g',
];

let component = null;
let cur_room = null;
let cur_scene = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
  load();
}

export function go(room) {
  if (cur_room != null) {
    cur_room.onExit && play(cur_room.onExit);
  }

  if (typeof room === 'string') {
    room = rooms[room];
  }

  cur_room = room.name;

  const onEnter = !room.has_entered
    ? (room.onFirstEnter || room.onEnter)
    : (room.onEnter);

  room.onEnter && play(room.onEnter);
  room.has_entered = true;
}

export function play(scene) {
  cur_choice = null;
  if (cur_scene != null) {
    component.print(<span>{'\n'}</span>);
  }

  if (typeof scene === 'string') {
    scene = scene in rooms[cur_room]
      ? rooms[cur_room][scene]
      : scenes[scene];
  }

  cur_scene = scene.name;
  scene();
}

export function load() {
  try {
    // throw new Error();
    const save = JSON.parse(localStorage.getItem('save'));
    console.log(save);
    modules.loadState(save);
    cur_room = save.cur_room;
    play(save.cur_scene);
  } catch (e) {
    console.error(e);
    play(scenes.aphex_intro);
  }
}

export function save() {
  let oldSave;
  try {
    oldSave = JSON.parse(localStorage.getItem('save'));
  } catch (e) {
    oldSave = {};
  }

  const state = modules.saveState();
  const save = {
    // ...oldSave,
    ...state,
    cur_room,
    cur_scene,
  };
  console.log(save);
  localStorage.setItem('save', JSON.stringify(save));
}

export function print(fragment) {
  component.print(fragment);
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

export function change_mana() {
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
