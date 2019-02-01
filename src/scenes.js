require('prototypes');

function requireAll(scenes, r) {
  r.keys().forEach(e => {
    const module_name = e.stripLeft('./').stripRight('.js');
    const module = r(e);
    Object.keys(module).forEach(property_name => {
      if (typeof module[property_name] === 'function') {
        scenes[property_name] = module[property_name];
      }
    });
  });
}

let scenes = {};
module.exports = scenes;
requireAll(scenes, require.context('./scenes/', true, /\.js$/));
