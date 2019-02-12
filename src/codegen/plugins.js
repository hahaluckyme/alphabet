// @codegen
const glob = require('glob');
const files = glob.sync('./src/plugins/**/*.js');

const requires = files.map(filepath => {
  const module_name = filepath.split('/').pop().split('.')[0];
  return `  '${module_name}': require('${module_name}'),`;
}).join('\n');

module.exports = `module.exports = {
${requires}
}
`;
