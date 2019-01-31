import {aphex_intro} from '../scenes/aphex_intro.js';
import React from 'react';

let component = null;
let cur_scene = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
  go(aphex_intro);
}

export function go(scene) {
  print();
  cur_scene = scene();
}

export function print(fragment) {
  component.print(fragment);
}

export function yes_or_no(yes_action, no_action) {
  choose({
    '1': {
      label: 'Yes',
      action: yes_action,
    },
    '2': {
      label: 'No',
      action: no_action,
    },
  });
}

export function choose(mapping) {
  component.setChoices(mapping);
  cur_choice = mapping;
}

export function change_mana() {
}

export async function execute(key) {
  if (key in cur_choice) {
    print(
      <div>
        <b>> {cur_choice[key].label}</b>
      </div>
    );
    cur_choice[key].action();
  }
}
