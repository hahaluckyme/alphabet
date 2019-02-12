// @codegen
const glob = require('glob');
const files = glob.sync('./src/data/scenes/**/*.js');

module.exports = files.map(filepath => {
  const file_name = filepath.split('/').pop().split('.')[0];
  const module_name = file_name.charAt(0).toUpperCase() + file_name.slice(1); 
  return `export ${module_name} from 'data/scenes/${file_name}'`;
}).join('\n');
