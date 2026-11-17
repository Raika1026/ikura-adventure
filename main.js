import { movePlayer } from "./player.js";

import {render} from "./renderer.js";


render();

function gameLoop(){
    movePlayer(640, 480);
    render();

    requestAnimationFrame(gameLoop);
}

gameLoop();