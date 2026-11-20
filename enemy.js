import { playerX, playerY} from "./player.js";

export let enemyX = 100;
export let enemyY = 100;

export const enemyRadius = 15;


export function moveEnemy() {
    const dx = playerX - enemyX;
    const dy = playerY - enemyY;

    const length = Math.sqrt(dx * dx + dy *dy);

    if(length > 0){
        enemyX += (dx / length) * 1;
        enemyY += (dy / length) * 1;
    }
}