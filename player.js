export let playerX = 320;
export let playerY = 240;

//1秒間に進むピクセル
export const playerSpeed = 100;

export const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener("keydown", (event) => {
    if(event.key in keys){
        keys[event.key] = true;
    }
});

document.addEventListener("keyup", (event) => {
    if(event.key in keys){
        keys[event.key] = false;
    }
})

window.addEventListener("blur", () => {
    keys.w = false;
    keys.a = false;
    keys.s = false;
    keys.d = false;
})


export function movePlayer(canvasWidth, canvasHight, deltaTime) {
    let moveX = 0;
    let moveY = 0;

    if (keys.w) {
        moveY -= 1;
    }
    if (keys.s) {
        moveY += 1;
    }
    if (keys.d) {
        moveX += 1;
    }
    if (keys.a) {
        moveX -= 1;
    }

    const length = Math.sqrt(moveX * moveX + moveY * moveY);
    if(length > 0){
        moveX = (moveX/length) * playerSpeed * (deltaTime/1000);
        moveY = (moveY/length) * playerSpeed * (deltaTime/1000);
    }

    playerX += moveX;
    playerY += moveY;

    playerX = Math.max(15, Math.min(canvasWidth - 15, playerX));
    playerY = Math.max(15, Math.min(canvasHight - 15, playerY));
}