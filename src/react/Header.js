const React = require('react');

const logo = require('logo.svg');

function Header() {
  return (
    <div className="header row centered">
      <img src={logo} className="logo" alt="logo" />
      <div className="fill">
        Alpha
      </div>
    </div>
  );
}

export default Header;
