class Board {
  ctx;
  ctxNext;
  grid;
  piece;
  next;
  requestId;
  time;

  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.init();
  }

  init() {
    // Calculate size of canvas from constants.
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale so we don't need to give size on every draw.
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  reset() {
    this.grid = this.getEmptyGrid();
    this.piece = new Piece(this.ctx);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }

  getNewPiece() {
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(
      0,
      0, 
      this.ctxNext.canvas.width, 
      this.ctxNext.canvas.height
    );
    this.next.draw();
  }

  draw() {
    this.piece.draw();
    this.drawBoard();
  }

  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      this.piece.ctx = this.ctx;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }

  clearLines() {
    let lines = 0;

    this.grid.forEach((row, y) => {

      // If every value is greater than 0.
      if (row.every(value => value > 0)) {
        lines++;

        // Remove the row.
        this.grid.splice(y, 1);

        // Add zero filled row at the top.
        this.grid.unshift(Array(COLS).fill(0));
      }
    });
    
    if (lines > 0) {
      this.points += this.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVEL[this.level];
      }
    }
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          value === 0 ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
        );
      });
    });
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  getEmptyGrid() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  insideWalls(x) {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y) {
    return y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  rotate(piece) {
    let p = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }

  getLinesClearedPoints(lines, level) {
    const lineClearPoints =
      lines === 1
        ? POINTS.SINGLE
        : lines === 2
        ? POINTS.DOUBLE
        : lines === 3
        ? POINTS.TRIPLE
        : lines === 4
        ? POINTS.TETRIS
        : 0;

    return (level + 1) * lineClearPoints;
  }
}
