const React = require('react');

function GameButton(props) {
  let className = 'fill';
  if (props.depressed) {
    className += ' active';
  }

  if (!props.label) {
    return (
      <button
        className={className}
        disabled={true}
        style={{
          opacity: 0.3,
        }}
      >
        <div>{props.hotkey}</div>
      </button>
    );
  } else if (props.blocked) {
    return (
      <button
        className={className}
        style={{
          opacity: 0.6,
        }}
      >
        <div>{props.label}</div>
      </button>
    );
  } else {
    return (
      <button
        className={className}
        onClick={() => props.onClick(props.scene)}
      >
        <div>{props.label}</div>
      </button>
    );
  }
}

export default GameButton;
