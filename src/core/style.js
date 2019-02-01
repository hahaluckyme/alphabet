import 'prototypes';
import React from 'react';

let cur_style = (s) => <span>{s}</span>;

export function text(strings, ...keys) {
  const components = strings.map((string, i) => {
    string = string.replaceAll(/\n +/, '\n');
    string = string.replaceAll(/\n\n+/, '\n\n');

    if (i === 0) {
      string = string.trimLeft('\n');
    }

    if (i === strings.length - 1 ) {
      string = string.trimRight('\n');
    }

    if (typeof keys[i] === 'function') {
      string = string.replaceAll(/\n$/, '');
      const output = cur_style(string);
      keys[i]();
      return <>{output}</>;
    } else if (keys[i] == null) {
      return <>{cur_style(string)}</>;
    } else {
      return <>{cur_style(string)}<span>{keys[i]}</span></>;
    }
  });

  return <>{components}</>;
}

export function normal() {
  cur_style = (s) => <span>{s}</span>;
}

export function pink() {
  cur_style = (s) => <span className="pink">{s}</span>;
}
