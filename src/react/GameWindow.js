const game = require('game');
const React = require('react');

const GameButton = require('./GameButton').default;

class GameWindow extends React.Component {
  state = {
    button_depressions: {},
    history_seen: 0,
    history: [],
    choices: [],
    directions: {},
    cur_scene: '',
    cur_room: '',
    is_at_bottom: true,
  };

  async componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.title = 'Shifted Fates (Alpha)';
    game.hook(this);
    await game.goTo('IntroRoom');
    this.scrollRef.scrollTop = 0;
  }

  componentDidUpdate() {
  }

  scrollDown() {
    this.scrollRef.scrollTop += this.scrollRef.clientHeight;
  }

  print(node) {
    this.state.history.push(node);
    this.forceUpdate();
  }

  async onKeyDownImpl(hotkey) {
    await this.setState(prev_state => ({
      button_depressions: {
        ...prev_state.button_depressions,
        [hotkey]: true,
      },
    }));
    const label_map = this.getLabelMap();
    const scene = label_map[hotkey];
    if (scene) {
      this.scrollRef.scrollTop = this.scrollRef.scrollHeight;
      this.setState(prevState => ({history_seen: prevState.history.length}));
      game.playScene(scene);
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
          && this.scrollRef.scrollHeight - this.scrollRef.scrollTop - this.scrollRef.clientHeight < 1
        ) {
          await this.onKeyDownImpl('1');
          await this.onKeyUpImpl('1');
          event.preventDefault();
        }
      }
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

      'q': directions.Down,
      'w': directions.North,
      'e': directions.Up,
      'r': choice_labels[5],
      't': choice_labels[6],

      'a': directions.West,
      's': directions.South,
      'd': directions.East,
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
          <div className="gamewindow fill column">
            <div
              className="textbox fill column scroll"
              onScroll={() => this.setState({
                is_at_bottom: this.scrollRef.scrollHeight - this.scrollRef.scrollTop - this.scrollRef.clientHeight < 1,
              })}
              ref={ref => {
                this.scrollRef = ref;
              }}
            >
              <div className="fill column">
                {this.state.history.map((e, i) => {
                  if (i < this.state.history_seen) {
                    return <div className="text seen" key={i}>{e}</div>;
                  } else {
                    return <div className="text unseen" key={i}>{e}</div>;
                  }
                })}
              </div>
            </div>
            <div
              className="butwaittheresmore"
              style={{
                visibility: this.state.is_at_bottom ? 'hidden' : 'visible',
              }}
            />
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
