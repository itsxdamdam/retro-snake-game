"use strict";
// Define html documents
const board = document.getElementById("game-board");
// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
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
    snake.pop();
}
setInterval(() => {
    move();
    draw();
}, 1000);
