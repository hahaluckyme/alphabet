const Player = {};

export function load(data) {
  try {
    Object.assign(Player, data);
  } catch (e) {
    console.error('save for Player could not be loaded: ' + e.message);
    Player = {};
  }
}

export function save() {
  return Player;
}

export default Player;
