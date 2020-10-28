const resourcePath = {
  'Character': {
    'Jerry': {
      'stay': {
        'path': 'img/sprites/jerry-stay.png',
        'frames': '1',
      },
      'walk': {
        'path': 'img/sprites/jerry-walk.png',
        'frames': '8',
      }
    },
    'Tuffy': {
      'stay': {
        'path': 'img/sprites/tuffy-stay.png',
        'frames': '1',
      },
      'walk': {
        'path': 'img/sprites/tuffy-walk.png',
        'frames': '3',
      }
    },
  },
  'Enemy': {
    'path': 'img/sprites/tom-walk.png',
    'frames': '15',
  },
  'Hill': 'img/Chair.png',
  'Cheese': 'img/Cheese.png',
  'BG': 'img/BG.jpg',
};

let playerInfo = {
  'character': null,
  'nickname': null,
};

let gameResources = {
  'CharacterSprite': {
    'stay': null,
    'walk': null,
  },
  'Enemy': null,
  'Hill': null,
  'Cheese': null,
  'BG': null,
};
