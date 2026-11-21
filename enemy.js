import { playerX, playerY } from "./player.js";

export let enemyX = 100;
export let enemyY = 100;
export const enemyRadius = 15;
export let enemyHp = 30;
let knockbackTimer = 0;
let knockbackDx = 0;
let knockbackDy = 0;
const knockbackDuration = 300;
const knockbackDistance = 80;
let currentKnockbackDistance = 60;

export function damageEnemy(damage) {
    if (enemyHp <= 0) {
        return;
    }
    enemyHp -= damage;
    currentKnockbackDistance = 60;

    if (enemyHp <= 0) {
        enemyHp = 0;
        currentKnockbackDistance = 180;
    }
    const dx = enemyX - playerX;
    const dy = enemyY - playerY;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length > 0) {
        knockbackDx = dx / length;
        knockbackDy = dy / length;
        knockbackTimer = knockbackDuration;
    }
};


export function moveEnemy(deltaTime) {
    if (knockbackTimer > 0) {
        enemyX += knockbackDx * currentKnockbackDistance * (deltaTime / knockbackDuration);
        enemyY += knockbackDy * currentKnockbackDistance * (deltaTime / knockbackDuration)
        knockbackTimer -= deltaTime;
        if(knockbackTimer <= 0 && enemyHp <= 0){
            enemyHp = -1;
        }
        return;
        ;
    }
    if (enemyHp <= 0) {
        return;
    }
    const dx = playerX - enemyX;
    const dy = playerY - enemyY;

    const length = Math.sqrt(dx * dx + dy * dy);

    if (length > 0) {
        enemyX += (dx / length) * 1;
        enemyY += (dy / length) * 1;
    }
}