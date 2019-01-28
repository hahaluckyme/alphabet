import {aphex_intro} from '../scenes/aphex_intro.js';

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

export function print(string) {
  component.print(string);
}

export function choose(mapping) {
  component.setChoices(mapping);
  cur_choice = mapping;
}

export function change_mana() {
}

export async function execute(key) {
  if (key in cur_choice) {
    print('\n---\n');
    cur_choice[key].action();
  }
}
