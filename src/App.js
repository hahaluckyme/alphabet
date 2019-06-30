require('prototypes');
const React = require('react');
const ReactIs = require('react-is');

const logo = require('logo.svg');
require('App.css');
const data = require('data');
const game = require('game');

const ALLOWED_KEYS = [
  '1', '2', '3', '4', '5',
  'q', 'w', 'e', 'r', 't',
  'a', 's', 'd', 'f', 'g',
];

class App extends React.Component {
  state = {
    history: [],
    cur_choices: {},
  };

  async componentDidMount() {
    // need to hook this component into the template strings in each scene
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.title = 'Alpha';
    this.historyRef.scrollTop = 0;
    game.hook(this);
    this.print(await data.intro1());
  }

  sanitizeNode(node) {
    if (node == null) {
      return null;
    }

    if (ReactIs.isFragment(node)) {
      // map all raw text nodes as paragraphs
      return React.Children.map(
        node.props.children,
        elem => this.sanitizeNode(elem),
      );
    } else {
      return node;
    }
  }

  print(node) {
    node = this.sanitizeNode(node);

    this.state.history.push(node);
    this.forceUpdate();
    this.historyRef.scrollTop = this.historyRef.scrollHeight;
  }

  setChoices(raw_choices) {
    const choices = {};
    let i = 1;
    for (const choice in raw_choices) {
      choices[''+i] = {
        label: choice,
        action: raw_choices[choice],
      };
      i += 1;
    }
    this.setState({
      cur_choices: choices,
    });
  }

  async execute(key) {
    const {cur_choices} = this.state;
    if (!(key in cur_choices)) {
      return;
    }

    data.reset();
    this.print(<span>{'\n'}<b>> {cur_choices[key].label}</b>{'\n'}</span>);
    this.print(await cur_choices[key].action());
  }

  onKeyDown(event) {
    if (!ALLOWED_KEYS.includes(event.key)) {
      return;
    }

    this.execute(event.key);
  }

  _renderButton(key) {
    const {cur_choices} = this.state;

    if (!(key in cur_choices)) {
      return (
        <button
          disabled={true}
          style={{
            opacity: 0.3,
          }}
        >
          {key}
        </button>
      );
    }

    const isButtonDisabled = cur_choices[key].disabled === true
      || typeof cur_choices[key].disabled === 'string';

    if (isButtonDisabled) {
      return (
        <button
          disabled={isButtonDisabled}
          style={{
            opacity: 0.6,
          }}
        >
          {cur_choices[key].label}
        </button>
      );
    }

    return (
      <button
        onClick={() => this.execute(key)}
        style={{
          opacity: 1,
        }}
      >
        {cur_choices[key].label}
      </button>
    );
  }

  _renderControlButton(key) {
    if (key !== 'z') {
      return (
        <button
          disabled={true}
          style={{
            opacity: 0.3,
          }}
        >
          -
        </button>
      );
    }

    return (
      <button
        onClick={() => this.save()}
        style={{
          opacity: 1,
        }}
      >
        Save
      </button>
    );
  }

  render() {
    return (
      <div className="root">
        <div className="topbar">
          <img src={logo} className="logo" alt="logo" />
          <div>
            Alpha
          </div>
        </div>
        <div
          className="gameWindow"
          ref={ref => {this.historyRef = ref;}}
        >
          <div className="gameWindowContent">
            {this.state.history}
          </div>
        </div>
        <div className="inputButtons">
          <div className="inputRow">
            {this._renderButton('1')}
            {this._renderButton('2')}
            {this._renderButton('3')}
            {this._renderButton('4')}
            {this._renderButton('5')}
          </div>
          <div className="inputRow">
            {this._renderButton('q')}
            {this._renderButton('w')}
            {this._renderButton('e')}
            {this._renderButton('r')}
            {this._renderButton('t')}
          </div>
          <div className="inputRow">
            {this._renderButton('a')}
            {this._renderButton('s')}
            {this._renderButton('d')}
            {this._renderButton('f')}
            {this._renderButton('g')}
          </div>
          <div className="inputRow">
            {this._renderControlButton('z')}
            {this._renderControlButton('x')}
            {this._renderControlButton('c')}
            {this._renderControlButton('v')}
            {this._renderControlButton('b')}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
