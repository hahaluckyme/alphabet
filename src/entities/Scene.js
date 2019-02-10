function UnimplementedError(msg) {
  return new Error(msg);
}

export default class Scene {
  writer = 'unowned';
  choices = null;

  play() {
    this.onPlay();
  }

  getChoices() {
    if (this.choices == null) {
      const choices = {};
      Object.keys(this).forEach(property_name => {
        if (/^[12345qwertasdfg] /.test(property_name)) {
          const key = property_name.substr(0, 1);
          const label = property_name.substr(2);

          choices[key] = {
            label,
            action: this[property_name],
          };
        }
      });

      return choices;
    }

    return this.choices;

    // return {
    //   '1': {
    //     label: 'error',
    //     action: function() {
    //       throw new UnimplementedError('the writer didnt make any options!');
    //     }
    //   }
    // };
  }

  // interface
  onPlay() { throw new UnimplementedError('this scene was called but has no content!'); }
}
