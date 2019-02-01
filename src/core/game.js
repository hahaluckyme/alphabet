import 'prototypes';
import React from 'react';
import scenes from 'scenes';

export const ALLOWED_KEYS = [
  '1', '2', '3', '4', '5',
  'q', 'w', 'e', 'r', 't',
  'a', 's', 'd', 'f', 'g',
];

let component = null;
let cur_scene = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
  load();
}

export function go(scene) {
  if (cur_scene != null) {
    component.print(<span>{'\n'}</span>);
  }
  cur_scene = scene;
  scenes[scene]();
  save();
}

export function load() {
  try {
    throw new Error();
    const save = JSON.parse(localStorage.getItem('save'));
    go(save.cur_scene);
  } catch (e) {
    go('aphex_intro');
  }
}

export function save() {
  const save = {
    cur_scene,
  };
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
  }
}
