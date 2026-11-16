import { movePlayer } from "./player.js";

import "./renderer.js";
import {render} from "./renderer.js";


render();

function gameLoop(){
    movePlayer();
    render();

    requestAnimationFrame(gameLoop);
}

gameLoop();