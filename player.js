export let playerX = 320;
export let playerY = 240;
export const playerRadius = 15;

//1秒間に進むピクセル
export const playerSpeed = 100;

export const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

export let playerDirection = "down";

export let playerHp = 3;

document.addEventListener("keydown", (event) => {
    const key = event.key === " " ? "space" : event.key;
    if (key in keys) {
        keys[key] = true;
        if (key === "w") {
            playerDirection = "up";
        }
        if (key === "s") {
            playerDirection = "down";
        }
        if (key === "a") {
            playerDirection = "left";
        }
        if (key === "d") {
            playerDirection = "right";
        }
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key === " " ? "space" : event.key;
    if (key in keys) {
        keys[key] = false;
    }
})

window.addEventListener("blur", () => {
    keys.w = false;
    keys.a = false;
    keys.s = false;
    keys.d = false;
    keys.space = false;
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
    if (length > 0) {
        moveX = (moveX / length) * playerSpeed * (deltaTime / 1000);
        moveY = (moveY / length) * playerSpeed * (deltaTime / 1000);
    }

    playerX += moveX;
    playerY += moveY;

    playerX = Math.max(15, Math.min(canvasWidth - 15, playerX));
    playerY = Math.max(15, Math.min(canvasHight - 15, playerY));
}

export function damagePlayer(){
    if(playerHp > 0){
        playerHp -= 1;
    }
}

export function resetPlayer(){
    playerX = 320;
    playerY = 240;
    playerHp = 3;
    playerDirection = "down";

    keys.w = false;
    keys.a = false;
    keys.s = false;
    keys.d = false;
    keys.space = false;
}