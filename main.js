const canvas = document.getElementById("board");
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById("next");
const ctxNext = canvasNext.getContext('2d');

let level;
let lines;
let points;
let requestId;

let board = new Board(ctx);

function init() {
  initNext();
  resetGame();
}

function initNext() {
  // Calculate size of canvas from constants.
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;

  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function resetGame() {
  points = 0;
  lines = 0;
  level = 0;
  board.reset();
  time = { start: 0, elapsed: 0, level: LEVEL[level] };
}

function play() {
  resetGame();
  next = new Piece(ctx);
  next.drawNext(ctxNext);
  time.start = performance.now();

  // If we have an old game running a game then cancel the old
  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  animate();
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (!board.drop()) {
      gameOver();
      return;
    }
  }
  board.draw();
  requestId = requestAnimationFrame(animate);
}

