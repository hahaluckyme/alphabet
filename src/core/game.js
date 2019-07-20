const ReactGA = require('react-ga').default;
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-143865453-3');
} else {
  ReactGA.initialize('UA-143865453-2');
}

const data = require('data');
for (const key of Object.keys(data)) {
  for (const scene of Object.keys(data[key])) {
    data[key][scene].room = key;
    data[key][scene].id = scene;
  }
  data[key].id = key;
}

const React = require('react');

let component = null;
let cur_location = null;
let cur_choices = null;
let cur_resolves = [];

// functions to the game engine
export async function playScene(scene_name) {
  if (typeof scene_name === 'function') {
    ReactGA.event({
      category: 'scene',
      action: scene_name.room || 'global',
      label: scene_name.id,
    });
    await scene_name();
    return;
  }

  component.print(<span>> {scene_name}{'\n'}</span>);
  let choices = cur_location.Choices || [];

  if (typeof cur_location.Choices === 'function') {
    choices = choices();
  }

  const choice_labels = Object.keys(choices);
  let scene;
  scene = cur_choices[scene_name];
  setChoices({});
  ReactGA.event({
    category: 'scene',
    action: cur_location.id,
    label: scene_name,
  });
  await scene();
  data.flush(true);
  if (cur_resolves.length > 0) {
    const cur_resolve = cur_resolves.pop();
    await cur_resolve();
  } else {
    if (Object.keys(cur_choices).length === 0) {
      setChoices(cur_location.Choices);
    }
  }
}

export async function goTo(location) {
  data.flush(true);
  if (typeof location === 'string') {
    location = data[location];
  }
  cur_location = location;
  if (location.Enter) {
    await location.Enter();
    data.flush(true);
    if (location.Choices) {
      setChoices(location.Choices);
    }
  }
}

// functions back to the renderer
export function hook(comp) {
  component = comp;
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export async function setChoices(raw_choices, resolve) {
  if (typeof raw_choices === 'function') {
    raw_choices = raw_choices();
  }

  const choices = {};
  const directions = {};

  cur_choices = raw_choices;

  for (const raw_choice in raw_choices) {
    if (!raw_choices[raw_choice]) {
      continue;
    }

    if (['Down', 'North', 'Up', 'West', 'South', 'East'].includes(raw_choice)) {
      directions[raw_choice] = raw_choice;
    } else {
      choices[raw_choice] = raw_choice;
    }
  }

  if (resolve) {
    cur_resolves.push(resolve);
  }
  await component.setState({choices, directions});
  if (raw_choices == null || Object.keys(raw_choices).length > 0) {
    component.scrollDown();
  }
}

export function print(string) {
  component.print(string);
  component.print(<span>{'\n'}</span>);
}
