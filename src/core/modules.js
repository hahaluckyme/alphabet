const requireAllModules = require('requireAllModules').default;

const scenes = {};
const rooms = {};

module.exports = {
  scenes,
  rooms,
};

// SCENES
// scene modules just contain scenes, pretty much
const scene_modules = requireAllModules(require.context('data/scenes', true, /\.js$/));
const room_modules = requireAllModules(require.context('data/rooms', true, /\.js$/));

Object.keys(scene_modules).forEach(module_name => {
  const module = scene_modules[module_name];
  Object.keys(module).forEach(property_name => {
    if (typeof module[property_name] === 'function') {
      scenes[property_name] = module[property_name];
    }
  });
});

// ROOMS
// room module names are the room itself.
// all scenes within a room can also be accessed universally if not one of the Room-specific Scenes
Object.keys(room_modules).forEach(module_name => {
  const module = room_modules[module_name];
  module.has_entered = false;
  module.name = module_name;

  const room = {};
  Object.keys(module).forEach(property_name => {
    if (typeof module[property_name] === 'function') {
      if (/^on[^a-z]/.test(module[property_name].name)) {
        // a scene in a room that's NOT an interface scene? save it into the room itself
        rooms[module_name] = module;
      } else {
        // otherwise collect the exported regular scene
        scenes[property_name] = module[property_name];
      }
    }
  });
});

function saveState() {
  const data = {
    scene_state: {},
    room_state: {},
  };
  Object.keys(scene_modules).forEach(module_name => {
    const module = scene_modules[module_name];
    Object.keys(module).forEach(property_name => {
      if (!module[property_name]) {
        return;
      }

      if (typeof module[property_name] !== 'function') {
        data.scene_state[property_name] = module[property_name];
      }
    });
  });
  Object.keys(room_modules).forEach(module_name => {
    const module = room_modules[module_name];
    Object.keys(module).forEach(property_name => {
      if (!module[property_name]) {
        return;
      }

      if (property_name === 'name') {
        return;
      }

      if (typeof module[property_name] !== 'function') {
        if (!(module_name in data.room_state)) {
          data.room_state[module_name] = {};
        }
        data.room_state[module_name][property_name] = module[property_name];
      }
    });
  });
  return data;
}

function loadState(data) {
  Object.keys(scene_modules).forEach(module_name => {
    const module = scene_modules[module_name];
    module.loadState(data.scene_state); // produced by babel-plugin-alpha
  });
  Object.keys(room_modules).forEach(module_name => {
    const module = room_modules[module_name];
    if (data.room_state[module_name]) {
      module.loadState(data.room_state[module_name]); // produced by babel-plugin-alpha
    }
  });
}

module.exports.saveState = saveState;
module.exports.loadState = loadState;
