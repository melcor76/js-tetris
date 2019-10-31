const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;
const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
const SHAPES = [
  [],
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];

class KEY {
  static ESC = 27;
  static SPACE = 32;
  static LEFT = 37;
  static UP = 38;
  static RIGHT = 39;
  static DOWN = 40;
  static P = 80;
}

class POINTS {
  static SINGLE = 100;
  static DOUBLE = 300;
  static TRIPLE = 500;
  static TETRIS = 800;
  static SOFT_DROP = 1;
  static HARD_DROP = 2;
}

class LEVEL {
  static 0 = 800;
  static 1 = 720;
  static 2 = 630;
  static 3 = 550;
  static 4 = 470;
  static 5 = 380;
  static 6 = 300;
  static 7 = 220;
  static 8 = 130;
  static 9 = 100;
  static 10 = 80;
  static 11 = 80;
  static 12 = 80;
  static 13 = 70;
  static 14 = 70;
  static 15 = 70;
  static 16 = 50;
  static 17 = 50;
  static 18 = 50;
  static 19 = 30;
  static 20 = 30;
  // 29+ is 20ms
}