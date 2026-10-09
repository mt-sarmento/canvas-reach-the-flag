let timer = document.getElementById("timer"); 
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const music =  new Audio("song/main.wav");
const winMusic = new Audio("song/win.wav");

const tileset = new Image();
const char = new Image();
const flag = new Image();

tileset.src = "tiles\\tile01.png";
char.src = "actor\\char.png";
flag.src = "actor\\flag.png";

canvas.style.border = "5px solid #4946ca";
canvas.style.borderRadius = "3px";
canvas.style.width = "128px";
canvas.style.height = "160px";

let charX = 6; // pos inicial 
let charY = 8;

let flagX = 6;
let flagY = 1;

let gameIni = false;
let win = false;

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const TILE_SIZE = 16; // tamanho do tile em pixels

const map = [
    [1, 1, 1, 1, 1, 1, 1, 4], // primeira linha delimita tamanho x
    [1, 0, 0, 2, 2, 0, 0, 1],
    [1, 0, 3, 1, 1, 3, 3, 1],
    [1, 0, 3, 1, 4, 1, 1, 1],
    [1, 0, 0, 2, 2, 0, 3, 1],
    [1, 1, 1, 1, 1, 0, 3, 1],
    [1, 3, 0, 2, 2, 0, 3, 1],
    [1, 3, 0, 4, 1, 3, 3, 1],
    [4, 3, 0, 2, 2, 0, 0, 1],
    [4, 4, 1, 1, 1, 1, 1, 1]    
];

context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

function draw(){
    const columns = map[0].length; // tamanho do map em colunas, com base na primeira linha do map
    const lines = map.length; // tamanho do map em linhas, com base no numero de linhas do map

    canvas.width = columns * TILE_SIZE; // define a largura do canvas com base no número de colunas e o tamanho dos tiles
    canvas.height = lines * TILE_SIZE; // define a altura do canvas com base no número de linhas e o tamanho dos tiles, ou seja 4 x 16 = 64

    for (let y = 0; y < lines; y++) { // percorre cada linha do map
        for (let x = 0; x < columns; x++) { // percorre cada coluna do map

            const tile = map[y][x]; // pega o valor do tile na posição (x, y) do map

            const tilesetColumn = tile % (tileset.width / TILE_SIZE);
            const tilesetLine = Math.floor(tile / (tileset.width / TILE_SIZE)); // descobre a posição do tile dentro do tileset, calculando o

            const rx = tilesetColumn * TILE_SIZE;
            const ry = tilesetLine * TILE_SIZE; // recorta

            const cx = x * TILE_SIZE;
            const cy = y * TILE_SIZE; // cola

            context.drawImage(        
                tileset,              // origem
                rx, ry,               // recorte
                TILE_SIZE, TILE_SIZE, // tamaanho
                cx, cy,               // cola
                TILE_SIZE, TILE_SIZE  // tamanho
            );
        }
    }

    context.drawImage( // desenha a bandeira
        flag,
        flagX * TILE_SIZE,
        flagY * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
    );

    context.drawImage( // desenha o personagem
        char,
        charX * TILE_SIZE,
        charY * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
    );    

    if (win) { // validacao win
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "white";
        context.font = "16px Arial";
        context.textAlign = "center";
        context.fillText(
            "You won!",
            canvas.width / 2,
            canvas.height / 2
        );
    }    
};

function canMove(x, y) { // verifica se eh passavel
    const tile = map[y][x];
    if (tile === 1 || tile === 3 || tile === 4) {
        return false;
    }
    return true;
}

function moveCharacter(direction) { // movimentacao do personagem com as setas do teclado

    if (direction === "up" && canMove(charX, charY - 1)) {
        charY--;
    }

    if (direction === "down" && canMove(charX, charY + 1)) {
        charY++;
    }

    if (direction === "left" && canMove(charX - 1, charY)) {
        charX--;
    }

    if (direction === "right" && canMove(charX + 1, charY)) {
        charX++;
    }

    if (charX === flagX && charY === flagY) { // verifica se ganhou
        win = true;
        stopTimer();
        music.pause();
        winMusic.play();
    }
    
    draw(); // redesenha o personagem a cada movimento
};

function restartGame() {
    win = false;

    charX = 6;
    charY = 8;

    music.currentTime = 0;
    music.play();
    
    startTimer();
    
    
    draw();
    drawControls();
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;

    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    timer.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0");
}

function startTimer() {
    clearInterval(timerInterval);

    startTime = Date.now();
    elapsedTime = 0;

    timer.textContent = "00:00:00";

    timerInterval = setInterval(updateTimer, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
    updateTimer();
}