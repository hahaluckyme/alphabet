const ROOMS = {
  church: require('rooms/church'),
};

const room_interface = {
  // scene hooks
  function onFirstEnter() { } // replaces the first time entering the room
  function onEnter() { } // entering the room
  function onExit() { } // exiting the room
  function defaultExits() { } // if no exits are defined, runs this
}

module.exports = {
  church: function() {
    const church = ROOMS.church;
    const internal_state = church._internal_vars;

    if (church.onFirstEnter !== undefined) {
      if (internal_vars.times_visited === 0) {
        church.onFirstEnter();
      } else {
        church.onEnter();
      }
    } else {
      church.onEnter();
    }

    internal_state.times_visited += 1;
  }
}
