"use strict";
// Define html documents
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;
// draw game map, snake and food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
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
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
// set position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}
// draw food function
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}
// generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}
// moving snake
function move() {
    const head = Object.assign({}, snake[0]);
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
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }
    else {
        snake.pop();
    }
}
// start game function
function startGame() {
    gameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}
// keypress event listen
function handleKeyPress(e) {
    if ((!gameStarted && e.code === "Space") || (!gameStarted && e.key === " ")) {
        startGame();
    }
    else {
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
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}
function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;
    updateScore();
}
function updateScore() {
    const currentScore = snake.length - 1;
    // console.log(currentScore);
    score.textContent = currentScore.toString().padStart(3, "0");
}
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = "block";
    logo.style.display = "block";
}
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, "0");
    }
    highScoreText.style.display = "block";
}
