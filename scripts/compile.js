const util = require('util');
const exec = util.promisify(require('child_process').exec);
const glob = require('glob');
const fs = require('fs');

(async () => {
  const filepaths = await glob.sync('data/**/*.coffee');

  const temp_file = fs.createWriteStream('src/_compiled.coffee');

  for (const filepath of filepaths) {
    const match = filepath.match(/([^/]+?)(NPC|Scenario|Room|).coffee$/);
    const filename = match[1];
    const type = match[2];

    switch (type) {
      case 'NPC':
      case 'Scenario':
      case 'Room': {
        temp_file.write(`export ${filename} = new class extends ${type}\n`);
        const a = fs.readFileSync(filepath, 'utf8');
        temp_file.write('  ' + a.trim().replace(/\n/g, '\n  ') + '\n\n');
        break;
      }
      case '': {
        const a = fs.readFileSync(filepath, 'utf8');
        temp_file.write(a + '\n\n');
        break;
      }
      default:
        throw new Error(`Unsupported type ${type}`);
    }
  }

  temp_file.end();
  const {stdout, stderr} = await exec('coffee -c src/_compiled.coffee');
  console.log(stdout);
  console.error(stderr);
})();
