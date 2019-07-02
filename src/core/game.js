const data = require('data');
const React = require('react');

let component = null;
let cur_location = null;
let cur_choices = null;
let cur_resolves = [];

// functions to the game engine
export async function playScene(scene_name) {
  component.print(<span>> {scene_name}{'\n'}</span>);
  const choices = cur_location.choices ? cur_location.choices() : [];
  const choice_labels = Object.keys(choices);
  let scene;
  if (cur_choices[scene_name]) {
    scene = cur_choices[scene_name];
  } else if (choice_labels.includes(scene_name)) {
    scene = choices[scene_name];
  } else {
    scene = data[scene_name];
  }
  setChoices({});
  await scene();
  data.flush(true);
  if (cur_resolves.length > 0) {
    const cur_resolve = cur_resolves.pop();
    cur_resolve();
  } else {
    if (Object.keys(cur_choices).length === 0) {
      setChoices(cur_location.choices);
    }
  }
}

export async function goTo(location_name) {
  data.flush(true);
  const location = data[location_name];
  cur_location = location;
  if (location.enter) {
    await location.enter();
    data.flush(true);
    if (location.choices) {
      setChoices(location.choices);
    }
  }
}

// functions back to the renderer
export function hook(comp) {
  component = comp;
}

export function setChoices(raw_choices, resolve) {
  if (typeof raw_choices === 'function') {
    raw_choices = raw_choices()
  }

  const choices = {};
  const directions = {};

  cur_choices = raw_choices;

  for (const raw_choice in raw_choices) {
    if (!raw_choices[raw_choice]) {
      continue;
    }

    if (['down', 'north', 'up', 'west', 'south', 'east'].includes(raw_choice)) {
      directions[raw_choice] = raw_choice;
    } else {
      choices[raw_choice] = raw_choice;
    }
  }

  if (resolve) {
    cur_resolves.push(resolve);
  }
  component.setState({choices, directions});
}

export function print(string) {
  component.print(string);
  component.print(<span>{'\n'}</span>);
}
