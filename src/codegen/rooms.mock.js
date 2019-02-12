// @preval
const glob = require('glob');
const files = glob.sync('./src/data/rooms/**/*.js');

const map = {};
files.forEach(filepath => {
  const module_name = filepath.split('/').pop().split('.')[0];
  map[module_name] = module_name;
});
module.exports = map;
