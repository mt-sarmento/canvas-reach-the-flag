const controlCanvas = document.getElementById("control");
const controlContext = controlCanvas.getContext("2d");

const buttons = new Image();

let buttonPressed = null;

buttons.src = "tiles\\control.png";

const button = [
    [4, 0, 4],
    [5, 9, 1],
    [4, 6, 4]
];

controlCanvas.width = 48;
controlCanvas.height = 48

function drawControls() {

    const colunas = button[0].length;
    const linhas = button.length;

    const BUTTON_SIZE = 16;

    for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {

            let tile = button[y][x];

            if (tile === 4) {
                continue;
            }

            if (tile === buttonPressed) {
                tile = pressedButton[tile];
            }

            const buttonsColuna = tile % (buttons.width / BUTTON_SIZE);
            const buttonsLinha = Math.floor(tile / (buttons.width / BUTTON_SIZE));

            const rx = buttonsColuna * BUTTON_SIZE;
            const ry = buttonsLinha * BUTTON_SIZE;

            const cx = x * BUTTON_SIZE;
            const cy = y * BUTTON_SIZE;

            controlContext.drawImage(
                buttons,
                rx, ry,
                BUTTON_SIZE, BUTTON_SIZE,
                cx, cy,
                BUTTON_SIZE, BUTTON_SIZE
            );
        }
    }
}

const pressedButton = {
    0: 2, // cima
    1: 3, // direita
    5: 7, // esquerda
    6: 8  // baixo
};

setTimeout(() => { // voltar cor do botao
    buttonPressed = null;
    drawControls();
}, 100);

controlCanvas.addEventListener("click", (event) => { // click do mouse no canvas de controle

    const rect = controlCanvas.getBoundingClientRect();

    const x = Math.floor((event.clientX - rect.left) / 16);
    const y = Math.floor((event.clientY - rect.top) / 16);

    const pressedButton = button[y][x];

    console.log(pressedButton);

    if (pressedButton === 0) {
        buttonPressed = 0;
        moveCharacter("up");
        drawControls();

        setTimeout(() => {
            buttonPressed = null;
            drawControls();
        }, 100);
    }

    if (pressedButton === 5) {
        buttonPressed = 5;
        moveCharacter("left");
        drawControls();

        setTimeout(() => {
            buttonPressed = null;
            drawControls();
        }, 100);
    }

    if (pressedButton === 1) {
        buttonPressed = 1;
        moveCharacter("right");
        drawControls();

        setTimeout(() => {
            buttonPressed = null;
            drawControls();
        }, 100);
    }

    if (pressedButton === 6) {
        buttonPressed = 6;
        moveCharacter("down");
        drawControls();

        setTimeout(() => {
            buttonPressed = null;
            drawControls();
        }, 100);        
    }

    drawControls();
});