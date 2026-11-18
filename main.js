import { movePlayer } from "./player.js";
import {render} from "./renderer.js";
import { moveEnemy} from "./enemy.js";


render();
d
let previousTime = null;

function gameLoop(currentTime){
    if(previousTime === null){
        previousTime = currentTime;
    }

    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    movePlayer(640, 480, deltaTime);
    moveEnemy();

    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);