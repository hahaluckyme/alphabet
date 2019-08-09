const fs = require('fs');
const graphviz = require('graphviz');
const glob = require('glob');

(async () => {
  const filepaths = await glob.sync('data/**/*.coffee');

  for (const filepath of filepaths) {
    const file = fs.readFileSync(filepath, 'utf8');

    // Create digraph G
    const g = graphviz.digraph("G");

    const nodes = {};
    let last_node = null;
    for (const line of file.split('\n')) {
      let match;

      match = line.match(/^([^ ]+): =>/);
      if (match != null) {
        const name = match[1];
        nodes[name] = g.addNode(match[1]);
        last_node = name;
        continue;
      }

      match = line.match(/^[^#]+await scene @(.+)/);
      if (match != null && last_node) {
        const name = match[1];
        g.addEdge(last_node, name);
        continue;
      }
    }

    // Print the dot script
    console.log( g.to_dot() );

    // Set GraphViz path (if not in your path)
    g.setGraphVizPath('C:/Program Files (x86)/Graphviz2.38/bin');

    // Generate a svg output
    g.output('svg', `svg/${filepath.replace(/\//g, '-')}.svg`);
  }
})();
