// Define html documents
const board = document.getElementById("game-board") as HTMLElement;

// Define game variables
let snake = [{ x: 10, y: 10 }];

// draw game map, snake and food
function draw() {
  board.innerHTML = "";
  drawSnake();
}

// draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
  });
}
