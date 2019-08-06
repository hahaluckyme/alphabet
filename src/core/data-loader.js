const data = require('_compiled');

for (const key of Object.keys(data)) {
  switch (typeof data[key] === 'object') {
    case 'object':
      for (const scene of Object.keys(data[key])) {
        data[key][scene].parent_id = key;
        data[key][scene].id = scene;
      }
      break;
    case 'function':
      data[key].id = key;
      break;
    default:
      break;
  }
}

export default data;
