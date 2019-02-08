require('prototypes');

const requireAllModules = function(r) {
  const modules = {};
  r.keys().forEach(module_path => {
    const pieces = module_path.split('/');
    const module_name = pieces[pieces.length-1].split('.')[0];
    const module = r(module_path);
    modules[module_name] = module;
  });
  return modules;
};

export default requireAllModules;
