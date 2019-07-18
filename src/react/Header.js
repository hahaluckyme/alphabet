const React = require('react');

const logo = require('logo.png');

function Header() {
  return (
    <div className="header row centered">
      <img src={logo} className="logo" alt="logo" />
      <div className="fill">
        Shifted Fates (Alpha)
      </div>
    </div>
  );
}

export default Header;
