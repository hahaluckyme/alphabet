/** @module plugins/Player */

const Player = {};

// Load/Save

/**
 * Sets a specific primary statistic as an absolute
 * @param {string} name - Statistic name, ex "strength"
 * @param {number} value - Statistic value as a number, ex 1
 */
export function load(data) {
  try {
    Object.assign(Player, data);
  } catch (e) {
    console.error('save for Player could not be loaded: ' + e.message);
  }
}

/**
 * Saves player data
 * @return {object} The current player.
 */
export function save() {
  return Player;
}

// Statistics

/** Private primary stats of the player */
Player.statistics = {
  "strength": 5,
  "perception": 5,
  "endurance": 5,
  "charisma": 5,
  "intelligence": 5,
  "agility": 5,
  "luck": 5,
}

/** Stats alias for short name convenience */
Player.stats = Player.statistics;

/** Private default stats for every player (for later stat extension/filtering) */
Player.defaulStats = Object.keys(Player.stats);

/**
 * Returns the primary statistics (stats) of this player in a {string, number} format.
 * @return {object} All current statistics.
 */
Player.currentStats = function() {
  return Player.stats;
}

/**
 * Returns a specific primary statistic
 * @param {string} name - Statistic name, ex "strength"
 * @return {number} The requested statistic.
 */
Player.getStat = function(name) {
  return Player.stats[name];
}

/**
 * Sets a specific primary statistic as an absolute
 * @param {string} name - Statistic name, ex "strength"
 * @param {number} value - Statistic value as a number, ex 1
 */
Player.setStat = function(name, value) {
  Player.stats[name] = Number(value)
}

/**
 * Adds a value to a primary statistic
 * @param {string} name - Statistic name, ex "strength"
 * @param {number} value - Statistic value to be added (or subtracted if negative) as a number, ex 1 or -1
 * @return {number} The updated statistic.
 */
Player.addStat = function(name, value) {
  this.setStat(name, this.getStat(name) + Number(value));
  return this.getStat(name);
};

export default Player;
