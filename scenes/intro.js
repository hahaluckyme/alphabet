import {go, print, text, choices, consent} from '../core/game.js';
import * as vault from '../rooms/vault.js';

export default function*() {
  print(text`
    A voice speaks to you.

    "Hey, are you all right?"

    You look up and you see you are in a void. You instinctively blink a few times, but you can't see your eyelids. The silhouette in front of you has no color, no light, but you can still tell someone is there.

    "I need you for a moment. Come with me, across the border."

    You feel yourself following, but you can't quite tell if it's intentional. This all feels like a dream, and you're about ready to wake up at any moment.

    "I need you to make a choice. Your new body will quite like it."

    Feats:
  `);
  first_feat = choices(['Athletic', 'Intuitive']);
  var first_feat = yield;

  print(text`
    You chose ${first_feat}. This will make you more likely to solve problems using ${{
      'Athletic': 'your strength and dexterity',
      'Intuitive': 'your smarts and wits',
    }[first_feat]}.
  `);

  go(vault);
};
