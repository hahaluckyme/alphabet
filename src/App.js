import './prototypes.js';
import React from 'react';
import logo from './logo.svg';
import * as game from './core/game.js';
import './App.css';

class App extends React.Component {
  state = {
    history: [],
    choices: {},
    key_down: null,
  };

  componentDidMount() {
    // need to hook this component into the template strings in each scene
    game.hook(this);
    document.addEventListener('keydown', this.onKeyDown.bind(this))
  }

  async print(line) {
    await this.setState(prevState => ({
      history: prevState.history.concat(line),
    }));
    this.historyRef.scrollTop = this.historyRef.scrollHeight;
  }

  async setChoices(mapping) {
    await this.setState(prevState => ({
      choices: mapping,
    }));
  }

  async onKeyCharDown(key_char) {
    await this.setState(() => ({
      key_char: key_char,
    }));
    game.execute(key_char);
  }

  async onKeyDown(event) {
    if (![
      '1', '2', '3', '4', '5',
      'q', 'w', 'e', 'r', 't',
      'a', 's', 'd', 'f', 'g',
    ].includes(event.key)) {
      return;
    }
    await this.onKeyCharDown(event.key);
  }

  _renderButton(key) {
    const {choices} = this.state;
    return (
      <button
        onClick={() => this.onKeyCharDown(key)}
        disabled={choices[key] == null}
        style={{
          'opacity': choices[key] != null ? '1' : '0.5',
        }}
      >
        {choices[key] ? choices[key].label : key}
      </button>
    );
  }

  render() {
    return (
      <div className="root">
        <header className="header">
          <div className="topbar">
            <img src={logo} className="logo" alt="logo" />
            <p>
              Alpha
            </p>
          </div>
          <textarea
            ref={ref => {this.historyRef = ref;}}
            className="gameWindow"
            value={this.state.history.join('\n')} />
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
        </header>
      </div>
    );
  }
}

export default App;
