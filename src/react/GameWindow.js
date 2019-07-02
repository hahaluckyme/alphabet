const game = require('game');
const React = require('react');

const GameButton = require('./GameButton').default;

class GameWindow extends React.Component {
  state = {
    button_depressions: {},
    history: [],
    choices: [],
    directions: {},
    cur_scene: '',
    cur_room: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.title = 'Alpha';
    this.scrollRef.scrollTop = 0;
    game.hook(this);
    game.goTo('nowhere');
  }

  componentDidUpdate() {
    this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
  }

  print(node) {
    this.state.history.push(node);
    this.forceUpdate();
    this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
  }

  onKeyDownImpl(hotkey) {
    this.setState(prev_state => ({
      button_depressions: {
        ...prev_state.button_depressions,
        [hotkey]: true,
      },
    }));
    const label_map = this.getLabelMap();
    const scene = label_map[hotkey];
    if (scene) {
      game.playScene(scene);
    }
  }

  onKeyUpImpl(hotkey) {
    this.setState(prev_state => ({
      button_depressions: {
        ...prev_state.button_depressions,
        [hotkey]: undefined,
      },
    }));
  }

  onKeyDown(event) {
    if (!event.ctrlKey && '12345qwertasdfg'.includes(event.key)) {
      this.onKeyDownImpl(event.key);
    }
  }

  onKeyUp(event) {
    if (!event.ctrlKey && '12345qwertasdfg'.includes(event.key)) {
      this.onKeyUpImpl(event.key);
    }
  }

  getLabelMap() {
    const {choices, directions} = this.state;
    const choice_labels = Object.keys(choices);
    return {
      '1': choice_labels[0],
      '2': choice_labels[1],
      '3': choice_labels[2],
      '4': choice_labels[3],
      '5': choice_labels[4],

      'q': directions.down,
      'w': directions.north,
      'e': directions.up,
      'r': choice_labels[5],
      't': choice_labels[6],

      'a': directions.west,
      's': directions.south,
      'd': directions.east,
      'f': choice_labels[7],
      'g': choice_labels[8],
    };
  }

  render() {
    const {button_depressions} = this.state;
    const label_map = this.getLabelMap();

    const LinkedGameButton = (props) => {
      return (
        <GameButton
          depressed={button_depressions[props.hotkey]}
          hotkey={props.hotkey}
          label={label_map[props.hotkey]}
          onClick={() => {
            this.onKeyDownImpl(props.hotkey);
            this.onKeyUpImpl(props.hotkey);
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
          <div
            className="textbox fill column scroll"
            ref={ref => {this.scrollRef = ref;}}
          >
            <div className="fill column">
              {this.state.history.map((e, i) => <div key={i}>{e}</div>)}
            </div>
          </div>
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
