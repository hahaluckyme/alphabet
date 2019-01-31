import 'prototypes';
import React from 'react';
import * as ReactIs from 'react-is';
import * as game from 'game';

import logo from 'logo.svg';
import 'App.css';

class App extends React.Component {
  state = {
    history: <></>,
    choices: {},
  };

  async componentDidMount() {
    // need to hook this component into the template strings in each scene
    await game.hook(this);
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.title = 'Alpha';
    this.historyRef.scrollTop = 0;
  }

  sanitizeNode(node) {
    if (node == null) {
      return <div />;
    }

    if (ReactIs.isFragment(node)) {
      // map all raw text nodes as paragraphs
      return React.Children.map(
        node.props.children,
        elem => this.sanitizeNode(elem),
      );
    } else {
      return <div>{node}</div>;
    }
  }

  async print(node) {
    node = this.sanitizeNode(node);

    await this.setState(prevState => ({
      history: <>{prevState.history}{node}</>,
    }));
    this.historyRef.scrollTop = this.historyRef.scrollHeight;
  }

  async setChoices(mapping) {
    await this.setState(prevState => ({
      choices: mapping,
    }));
  }

  async onKeyDown(event) {
    if (!game.ALLOWED_KEYS.includes(event.key)) {
      return;
    }

    game.execute(event.key);
  }

  _renderButton(key) {
    const {choices} = this.state;

    if (choices[key] == null) {
      return (
        <button
          diabled={true}
          style={{
            opacity: 0.3,
          }}
        >
          {key}
        </button>
      );
    }

    const isButtonDisabled = choices[key].disabled === true
      || typeof choices[key].disabled === 'string';

    if (isButtonDisabled) {
      return (
        <button
          disabled={isButtonDisabled}
          style={{
            opacity: 0.6,
          }}
        >
          {choices[key].label}
        </button>
      );
    }

    return (
      <button
        onClick={() => game.execute(key)}
        style={{
          opacity: 1,
        }}
      >
        {choices[key].label}
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
        </div>
      </div>
    );
  }
}

export default App;
