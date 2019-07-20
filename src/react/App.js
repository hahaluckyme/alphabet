require('prototypes');
const React = require('react');

const Header = require('./Header').default;
const GameWindow = require('./GameWindow').default;
const Div100vh = require('react-div-100vh').default;
const {
  BrowserView,
  MobileView,
} = require('react-device-detect');

class App extends React.Component {
  async componentDidMount() {
  }

  render() {
    return (
      <>
        <BrowserView>
          <div className="root column">
            <Header />
            <GameWindow />
          </div>
        </BrowserView>
        <MobileView>
          <Div100vh className="root column">
            <Header />
            <GameWindow />
          </Div100vh>
        </MobileView>
      </>
    );
  }
}

export default App;
