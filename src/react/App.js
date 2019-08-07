require('prototypes');
const React = require('react');

const Header = require('./Header').default;
const GameWindow = require('./GameWindow').default;

const {
  isMobile,
} = require('react-device-detect');

class App extends React.Component {
  componentDidMount() {
    if (isMobile) {
      this.updateViewport();
    }
  }

  updateViewport() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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
