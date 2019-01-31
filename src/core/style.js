import '../prototypes.js';
import React from 'react';

export function text(strings, ...keys) {
  let output = [];
  for (let i = 0; i < strings.length; i++) {
    let section = strings[i]
      .replaceAll(/\n +/, '\n') // remove leading whitespace in paragraphs
      .replaceAll(/\n\n+/, '\n\n'); // 2 newlines at max
    if (i === 0) {
      section = section.trimLeft();
    } else {
      if (section[0] === '\n') {
        section = section.substr(1); // remove the useless newline after ${}
      }
    }

    if (i === strings.length - 1) {
      section = section.trimRight();
    }

    output = output.concat(<div>{section}</div>);

    if (i < keys.length) {
      output = output.concat(keys[i]);
    }
  }

  return (
    <div>
      {output}
    </div>
  );
}

export function pink(strings) {
  return (
    <div className="pink">
      {strings}
    </div>
  );
}

export function bold(strings) {
  return (
    <div className="bold">
      {strings}
    </div>
  );
}

export function blue(strings, ...keys) {
  return text(strings, ...keys);
}
