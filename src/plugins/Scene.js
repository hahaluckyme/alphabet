import React from 'react';
import * as game from 'game';
import * as scenes from 'scenes';
import {Intro} from 'scenes.mock';

function UnimplementedError(msg) {
  return new Error(msg);
}

let cur_scene = null;

export function load(data) {
  try {
    play(data.cur_scene);
  } catch (e) {
    console.error('save for Scene could not be loaded: ' + e.message);
    play(Intro);
  }
}

export function save() {
  const data = {
    cur_scene: cur_scene,
  };
  // Object.keys(scenes).forEach(scene_name => {
  //   console.log(scene_name);
  // });
  return data;
}

export function play(scene) {
  if (typeof scene === 'function') {
    scene();
    return;
  }

  // if (typeof scene === 'string') {
  //   scene = scene in rooms[cur_room]
  //     ? rooms[cur_room][scene]
  //     : scenes[scene];
  // }

  cur_scene = scene;
  scenes[scene].play();

  // set choices from the scene
  game.setChoices(scenes[scene].getChoices());
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
