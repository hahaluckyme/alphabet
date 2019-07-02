require('prototypes');
const React = require('react');

const Header = require('./Header').default;
const GameWindow = require('./GameWindow').default;
const Div100vh = require('react-div-100vh').default;

class App extends React.Component {
  async componentDidMount() {
    document.title = 'Alpha';
  }

  render() {
    return (
      <Div100vh className="root column">
        <Header />
        <GameWindow />
      </Div100vh>
    );
  }
}

export default App;
