import './prototypes.js';
import React from 'react';
import logo from './logo.svg';
import * as game from './core/game.js';
import './App.css';

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

  async print(fragment) {
    fragment = fragment || <div />;
    if (fragment.props && fragment.props.children) {
      // map all raw text nodes as paragraphs
      fragment = React.Children.map(fragment.props.children, elem => {
        if (typeof elem === 'string') {
          return <p>{elem}</p>;
        }

        return elem;
      });
    }
    await this.setState(prevState => ({
      history: <>{prevState.history}{fragment}</>,
    }));
    this.historyRef.scrollTop = this.historyRef.scrollHeight;
  }

  async setChoices(mapping) {
    await this.setState(prevState => ({
      choices: mapping,
    }));
  }

  async onKeyDown(event) {
    if (![
      '1', '2', '3', '4', '5',
      'q', 'w', 'e', 'r', 't',
      'a', 's', 'd', 'f', 'g',
    ].includes(event.key)) {
      return;
    }
    game.execute(event.key);
  }

  _renderButton(key) {
    const {choices} = this.state;
    return (
      <button
        onClick={() => game.execute(key)}
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
