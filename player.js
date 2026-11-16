export let playerX = 320;
export let playerY = 240;

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


export function movePlayer() {
    if (keys.w) {
        playerY -= 1;
    }
    if (keys.s) {
        playerY += 1;
    }
    if (keys.d) {
        playerX += 1;
    }
    if (keys.a) {
        playerX -= 1;
    }
}