
const data = require('data-loader').default;

// functions to the game engine
export async function playScene(scene_name) {
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
  if (cur_resolve) {
    await cur_resolve();
    cur_resolve = null;
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
    cur_resolve = resolve;
  }
  await component.setState({choices, directions});
  if (raw_choices == null || Object.keys(raw_choices).length > 0) {
    component.scrollDown();
  }
}

export function print(string) {
  // console.log(JSON.stringify(string));
  component.print(string);
}
