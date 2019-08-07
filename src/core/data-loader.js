const data = require('_compiled');

for (const key of Object.keys(data)) {
  switch (typeof data[key]) {
    case 'object':
      // entity
      for (const property of Object.keys(data[key])) {
        if (typeof data[key][property] === 'function') {
          // scenes in entities
          data[key][property].parent_id = key;
          data[key][property].id = property;
        }
      }
      break;
    case 'function':
      // scenes
      data[key].id = key;
      break;
    default:
      break;
  }
}

export default data;
