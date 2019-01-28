import '../prototypes.js';
import {aphex_intro} from '../scenes/aphex_intro.js';

let component = null;
let cur_scene = null;
let cur_choice = null;

export function hook(comp) {
  component = comp;
  go(aphex_intro);
}

export function go(scene) {
  cur_scene = scene();
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

export function pink(strings, ...keys) {
  return text(strings, ...keys);
}

export function print(string) {
  component.print(string);
}

export function choose(mapping) {
  component.setChoices(mapping);
  cur_choice = mapping;
  print();
}

export function change_mana() {
}

export async function execute(key) {
  if (key in cur_choice) {
    print('\n---\n');
    cur_choice[key].action();
  }
}
