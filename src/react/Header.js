const React = require('react');
const logo = require('logo.png');
const version = require('../../package.json').version;

const VERSION_TITLE = `Shifted Fates (Pre-Alpha ${version})`;

class Header extends React.Component {
  componentDidMount() {
    document.title = VERSION_TITLE;
  }

  render() {
    return (
      <div className="header row centered">
        <img src={logo} className="logo" alt="logo" />
        <div className="fill">
          {VERSION_TITLE}
        </div>
      </div>
    );
  }
}

export default Header;
