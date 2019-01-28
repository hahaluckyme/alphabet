require('./prototypes.js');

function requireAll(r) {
  console.log(r.keys());
  return r.keys().reduce((acc, e) => {
    const module_name = e.stripLeft('./').stripRight('.js');
    acc[module_name] = r(e);
    return acc;
  }, {});
}

const rooms = requireAll(require.context('./rooms/', true, /\.js$/));
module.exports = rooms;
