const ReactGA = require('react-ga').default;
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-143865453-3');
} else {
  ReactGA.initialize('UA-143865453-2');
}

const React = require('react');

const GameButton = require('./GameButton').default;
const ScrollBox = require('./ScrollBox').default;
const data = require('data-loader').default;

class GameWindow extends React.Component {
  ended = false;
  state = {
    button_depressions: {},
    prev_history_seen: 0,
    history_seen: -1,
    history: [],
    choices: [],
    directions: {},
    cur_room: null,
    cur_choices: {},
    cur_zone: null,
    cur_resolve: null,
    is_at_bottom: true,
  };

  async componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    window.onblur = () => this.setState({
      button_depressions: {},
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
    data.hook(this);
    this.loadScene('Introduction');
  }

  async loadScene(scene_name) {
    this.playScene(data[scene_name]);
  }

  async goTo(room) {
    await this.setState({
      cur_room: room,
    });
    await this.playScene(room.Enter);
    // console.log(this.save());
    while (Object.keys(this.state.cur_choices).length === 0 && !this.ended) {
      if (room.GridChoices) {
        await this.playScene(room.GridChoices);
      }
      if (room.Choices) {
        await this.playScene(room.Choices);
      }

      if (!room.GridChoices && !room.Choices) {
        return;
      }
    }
  }

  async playScene(scene_func) {
    ReactGA.event({
      category: 'scene',
      action: scene_func.parent_id || 'global',
      label: scene_func.id,
    });
    await scene_func();
  }

  end() {
    this.ended = true;
    this.setState(prevState => ({
      history_seen: prevState.prev_history_seen,
    }));
  }

  save() {
    const save_data = {};
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'object') {
        const scenes = Object.getOwnPropertyNames(data[key]);
        const state_keys = Object.getOwnPropertyNames(Object.getPrototypeOf(data[key]))
          .filter(prop => !scenes.includes(prop) && prop !== 'constructor');

        const state = {};
        for (const state_key of state_keys) {
          state[state_key] = data[key][state_key];
        }

        if (Object.keys(state).length > 0) {
          save_data[key] = state;
        }
      }
    }
    return save_data;
  }

  async showChoices(choices, cur_resolve) {
    await this.setState(prevState => ({
      history_seen: prevState.prev_history_seen,
    }));
    await this.setState({
      cur_choices: choices,
      cur_resolve: cur_resolve,
    });
  }

  async pickChoice(choice_name) {
    await this.setState(prevState => ({
      prev_history_seen: prevState.history.length,
    }));
    await this.print(`> ${choice_name}`);
    const temp_resolve = this.state.cur_resolve;
    const sub_scene = this.state.cur_choices[choice_name];
    await this.setState({
      cur_choices: {},
    });

    await this.playScene(sub_scene);
    temp_resolve();
  }

  async print(node) {
    await this.setState(prevState => ({
      history: prevState.history.concat([node]),
    }));
  }

  async onKeyDownImpl(hotkey) {
    await this.setState(prev_state => ({
      button_depressions: {
        ...prev_state.button_depressions,
        [hotkey]: true,
      },
    }));
    const label_map = this.getLabelMap();
    const label = label_map[hotkey];
    if (label) {
      this.pickChoice(label);
    }
  }

  async onKeyUpImpl(hotkey) {
    await this.setState(prev_state => ({
      button_depressions: {
        ...prev_state.button_depressions,
        [hotkey]: undefined,
      },
    }));
  }

  async onKeyDown(event) {
    if (!event.ctrlKey) {
      if ('12345qwertasdfg'.includes(event.key)) {
        await this.onKeyDownImpl(event.key);
      } else if (event.key === ' ') {
        if (
          Object.keys(this.state.choices).length === 1
          && Object.keys(this.state.directions).length === 0
          && Object.keys(this.state.choices)[0] === '...'
        ) {
          await this.onKeyDownImpl('1');
          await this.onKeyUpImpl('1');
          event.preventDefault();
        }
      }
    }
  }

  onKeyUp(event) {
    if ('12345qwertasdfg'.includes(event.key)) {
      this.onKeyUpImpl(event.key);
    }
  }

  getLabelMap() {
    const {cur_choices} = this.state;
    const choice_labels = Object.keys(cur_choices).filter(
      e => !['Down', 'North', 'Up', 'West', 'South', 'East'].includes(e),
    );
    return {
      '1': choice_labels[0],
      '2': choice_labels[1],
      '3': choice_labels[2],
      '4': choice_labels[3],
      '5': choice_labels[4],

      'q': cur_choices.Down && 'Down',
      'w': cur_choices.North && 'North',
      'e': cur_choices.Up && 'Up',
      'r': choice_labels[5],
      't': choice_labels[6],

      'a': cur_choices.West && 'West',
      's': cur_choices.South && 'South',
      'd': cur_choices.East && 'East',
      'f': choice_labels[7],
      'g': choice_labels[8],
    };
  }

  render() {
    const {button_depressions} = this.state;
    const label_map = this.getLabelMap();

    const LinkedGameButton = (props) => {
      const label = label_map[props.hotkey];
      return (
        <GameButton
          depressed={button_depressions[props.hotkey]}
          hotkey={props.hotkey}
          scene={this.state.cur_choices[label]}
          label={label}
          onClick={async () => {
            await this.onKeyDownImpl(props.hotkey);
            await this.onKeyUpImpl(props.hotkey);
          }}
        />
      );
    };

    return (
      <div className="game row fill">
        {/* <div className="sidebar column">
          <div className="sidetopbar fill column">
            <div>room: {this.state.cur_room}</div>
            <div>scene: {this.state.cur_scene}</div>
          </div>
          <div className="minimap">minimap</div>
        </div> */}
        <div className="main fill column">
          <ScrollBox
            history={this.state.history}
            seen={this.state.history_seen}
          />
          <div className="buttons column">
            <div className="row">
              <LinkedGameButton hotkey='1' />
              <LinkedGameButton hotkey='2' />
              <LinkedGameButton hotkey='3' />
              <LinkedGameButton hotkey='4' />
              <LinkedGameButton hotkey='5' />
            </div>
            <div className="row">
              <LinkedGameButton hotkey='q' />
              <LinkedGameButton hotkey='w' />
              <LinkedGameButton hotkey='e' />
              <LinkedGameButton hotkey='r' />
              <LinkedGameButton hotkey='t' />
            </div>
            <div className="row">
              <LinkedGameButton hotkey='a' />
              <LinkedGameButton hotkey='s' />
              <LinkedGameButton hotkey='d' />
              <LinkedGameButton hotkey='f' />
              <LinkedGameButton hotkey='g' />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default GameWindow;
