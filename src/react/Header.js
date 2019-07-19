const React = require('react');
const logo = require('logo.png');
const version = require('../../package.json').version;

function Header() {
  return (
    <div className="header row centered">
      <img src={logo} className="logo" alt="logo" />
      <div className="fill">
        Shifted Fates (Alpha {version})
      </div>
    </div>
  );
}

export default Header;
