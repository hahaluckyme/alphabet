require('prototypes');
const React = require('react');

const Header = require('./Header').default;
const GameWindow = require('./GameWindow').default;

class App extends React.Component {
  async componentDidMount() {
    document.title = 'Alpha';
  }

  render() {
    return (
      <div className="root column">
        <Header />
        <GameWindow />
      </div>
    );
  }
}

export default App;
