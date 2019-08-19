const util = require('util');
const exec = util.promisify(require('child_process').exec);
const glob = require('glob');
const fs = require('fs');

(async () => {
  const filepaths = await glob.sync('data/**/*.coffee');

  const temp_file = fs.createWriteStream('src/_compiled.coffee');

  const zones = [];

  for (const filepath of filepaths) {
    const match = filepath.match(/([^/]+?)(|-(NPC|Zone|Scenario|Room|Scene)).coffee$/);
    const filename = match[1];
    const type = match[3];

    switch (type) {
      case 'NPC':
      case 'Scenario':
      case 'Room': {
        temp_file.write(`export ${filename} = new class extends ${type}\n`);
        const a = fs.readFileSync(filepath, 'utf8');
        temp_file.write('  ' + a.trim().replace(/\n/g, '\n  ') + '\n\n');
        break;
      }
      case 'Zone': {
        zones.push([filename, filepath]);
        break;
      }
      case 'Scene': {
        temp_file.write(`export ${filename} = =>\n`);
        const a = fs.readFileSync(filepath, 'utf8');
        temp_file.write('  ' + a.trim().replace(/\n/g, '\n  ') + '\n\n');
        break;
      }
      case undefined: {
        const a = fs.readFileSync(filepath, 'utf8');
        temp_file.write(a + '\n\n');
        break;
      }
      default:
        throw new Error(`Unsupported type ${type}`);
    }
  }

  for (const pair of zones) {
    const [filename, filepath] = pair;
    temp_file.write(`export ${filename} = new class extends Zone\n`);
    const a = fs.readFileSync(filepath, 'utf8');
    temp_file.write('  ' + a.trim().replace(/\n/g, '\n  ') + '\n\n');
  }

  temp_file.end();
  const {stdout, stderr} = await exec('coffee -c src/_compiled.coffee');
  console.log(stdout);
  console.error(stderr);
})();
