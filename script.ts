// Define html documents
const board = document.getElementById("game-board") as HTMLElement;
const instructionText = document.getElementById(
  "instruction-text"
) as HTMLElement;
const logo = document.getElementById("logo")!;

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval: any;
let gameSpeedDelay = 200;
let gameStarted = false;

// draw game map, snake and food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

// draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// create a snake or food cube
function createGameElement(tag: string, className: string): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// set position of snake or food
function setPosition(element: any, position: any) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// draw food function
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

// generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;

  return { x, y };
}

// moving snake
function move() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  // snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// setInterval(() => {
//   move();
//   draw();
// }, 6000);

// start game function
function startGame() {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    // checkCollision();
    draw();
  }, gameSpeedDelay);
}

// keypress event listen
function handleKeyPress(e: any) {
  if ((!gameStarted && e.code === "Space") || (!gameStarted && e.key === " ")) {
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

// function checkCollision() {
//   const head = snake[0]


// }
