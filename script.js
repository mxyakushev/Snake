const gameBoard = document.querySelector('#canvas');
const ctx = gameBoard.getContext('2d');
const resetButton = document.querySelector('#resetButton');
const scoreText = document.querySelector('#scoreText');

const unit = 20;
const width = gameBoard.width;
const height = gameBoard.height;
let snake = [
    {x: unit * 4, y: 0},
    {x: unit * 3, y: 0},
    {x: unit * 2, y: 0},
    {x: unit * 1, y: 0},
    {x: 0, y: 0}
]
let score = 0;
let xWay = unit;
let yWay = 0;
let xFood;
let yFood;
let running = false;

window.addEventListener('keydown', moveDirection);
resetButton.addEventListener('click', resetGame);

startTheGame();

function startTheGame(){
    running = true;
    createFood();
    drawFood();
    frame();
    
};
function drawFood(){
    ctx.fillStyle = '#8A0C00';
    ctx.fillRect(xFood, yFood, unit, unit);
};
function createFood(){
    function randomFunc(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unit) * unit;
        return randNum;
    }
    xFood = randomFunc(0, width - unit);
    yFood = randomFunc(0, height - unit);
};
function clearBoard(){
    ctx.fillStyle = '#377771'
    ctx.clearRect(0, 0, width, height);
    
};
function frame(){
    if(running){
        setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        frame();
    }, 50)}
};
function drawSnake(){
    snake.forEach((snakePart)=>{
        ctx.fillStyle = '#4CE0B3';
        ctx.fillRect(snakePart.x, snakePart.y, unit, unit);
})}

function moveSnake(){
    const head = {x: snake[0].x + xWay,
                  y: snake[0].y + yWay}

    snake.unshift(head);
    if(head.x == xFood && head.y == yFood){
        ++score;
        scoreText.textContent = `Score: ${score}`
        createFood();
    }
    else{
    snake.pop()
    }
};
function moveDirection(event){
    const keyValue = event.keyCode;
    console.log(keyValue);
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const rightDirection = (xWay == unit);
    const downDirection = (yWay == unit);
    const leftDirection = (xWay == -unit);
    const upDirection = (yWay == -unit);

    switch(true){
        case (keyValue == LEFT && !rightDirection):{
            setTimeout(()=>{xWay = -unit;
            yWay = 0;},40)
            break;
        }
        case (keyValue == UP && !downDirection):{
            setTimeout(()=>{xWay = 0;
                yWay = -unit;},40)
            break;
        }
        case (keyValue == RIGHT && !leftDirection):{
            setTimeout(()=>{xWay = unit;
                yWay = 0;},40)
            break;
        }
        case (keyValue == DOWN && !upDirection):{
            setTimeout(()=>{xWay = 0;
                yWay = unit;},40)
            break;
        }
    }
};
function resetGame(){
    snake = [
        {x: unit * 4, y: 0},
        {x: unit * 3, y: 0},
        {x: unit * 2, y: 0},
        {x: unit * 1, y: 0},
        {x: 0, y: 0}
    ]
    score = 0;
    scoreText.textContent = `Score: ${score}`
    xWay = unit;
    yWay = 0;
    running = true;
    startTheGame();
};
function checkGameOver(){
    if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= width || snake[0].y >= height){
        running = false;
        showGameOver();
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
            showGameOver();
        }
    }
};
function showGameOver(){
    ctx.font = '120px PT Sans Narrow, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText("Game Over", width/2, height/2);
};
