// @preval
const glob = require('glob');
const files = glob.sync('./src/data/scenes/**/*.js');

const map = {};
files.forEach(filepath => {
  const file_name = filepath.split('/').pop().split('.')[0];
  const module_name = file_name.charAt(0).toUpperCase() + file_name.slice(1); 
  map[module_name] = module_name;
});
module.exports = map;
