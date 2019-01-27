import React from 'react';
import logo from './logo.svg';
import {hook, execute} from './core/game.js';
import './App.css';

String.prototype.stripLeft = function(charlist) {
  return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

class App extends React.Component {
  state = {
    command_history: [],
    command_history_selected: null,
    history: [],
    input: '',
  };

  componentDidMount() {
    // need to hook this component into the template strings in each scene
    hook(this);
    execute('start');
  }

  async print(line) {
    await this.setState(prevState => ({
      history: prevState.history.concat(line),
    }));
  }

  async onInputChange(event) {
    const value = event.target.value.stripLeft('> ');
    await this.setState(() => ({
      input: value,
    }));
  }

  async onKeyDown(event) {
    event.persist();
    if (event.keyCode === 13) {
      // press enter
      const value = event.target.value.stripLeft('> ');
      await this.setState({
        history: this.state.history.concat('> ' + value),
        command_history: this.state.command_history.concat(value),
        command_history_selected: null,
        input: '',
      });
      await execute(value);
      this.historyRef.scrollTop = this.historyRef.scrollHeight;
    } else if (event.keyCode === 38) {
      // press up
      const {command_history, command_history_selected} = this.state;
      if (command_history.length === 0) {
        // do nothing, there is no history to scroll back to
      } else if (command_history_selected == null) {
        const new_selected = command_history.length - 1
        await this.setState(() => ({
          command_history_selected: new_selected,
          input: command_history[new_selected],
        }));
      } else if (command_history_selected === 0) {
        // do nothing, you're at the top
      } else {
        const new_selected = command_history_selected - 1
        await this.setState(() => ({
          command_history_selected: new_selected,
          input: command_history[new_selected],
        }));
      }
      this.inputRef.focus();
      this.inputRef.setSelectionRange(-1, -1);
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode === 40) {
      // press down
      const {command_history, command_history_selected} = this.state;
      if (command_history_selected == null) {
        // do nothing, you're at the bottom
      } else if (command_history_selected === command_history.length - 1) {
        await this.setState({
          command_history_selected: null,
          input: '',
        });
      } else {
        const new_selected = command_history_selected + 1
        await this.setState({
          command_history_selected: new_selected,
          input: command_history[new_selected],
        });
      }
    } else if (event.keyCode === 37) {
      // press left
      if (this.inputRef.selectionStart <= 2) {
        this.inputRef.focus();
        this.inputRef.setSelectionRange(2, 2);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-topbar">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Alpha
            </p>
          </div>
          <textarea
            ref={ref => {this.historyRef = ref;}}
            className="App-gamewindow"
            value={this.state.history.join('\n')} />
          <input
            ref={ref => {this.inputRef = ref;}}
            className="App-input"
            type="text"
            autoComplete="off"
            value={'> ' + this.state.input}
            onChange={this.onInputChange.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
          />
        </header>
      </div>
    );
  }
}

export default App;
