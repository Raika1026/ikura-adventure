import { movePlayer, playerHp, resetPlayer } from "./player.js";
import { render } from "./renderer.js";
import { moveEnemy, resetEnemy } from "./enemy.js";
import { updateCombat, resetCombat } from "./combat.js";


render();
let previousTime = null;
let gameOver = false;

document.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && gameOver){
        resetPlayer();
        resetEnemy();
        resetCombat();

        gameOver = false;
    }
})

function gameLoop(currentTime) {
    if (previousTime === null) {
        previousTime = currentTime;
    }

    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    if (!gameOver) {
        movePlayer(640, 480, deltaTime);
        moveEnemy(deltaTime);
        updateCombat(deltaTime);
        if (playerHp <= 0) {
            gameOver = true;
        }
    }

    render(gameOver);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);