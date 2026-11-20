import {keys} from "./player.js";
import {playerX, playerY, playerDirection} from "./player.js";
import {enemyX, enemyY, enemyRadius} from "./enemy.js";

export let attackTimer = 0;
export const attackInterval = 500;

let previousSpace = false;

export function updateCombat(deltaTime){
    if(previousSpace === false && keys.space === true){
        if(checkAttackHit()){
            console.log("命中！");
        };
    }
    previousSpace = keys.space;

    if(keys.space === false){
        attackTimer = 0;
    }

    if(keys.space){
        attackTimer += deltaTime;
        if(attackTimer >= attackInterval){
            if(checkAttackHit()){
                console.log("命中!");
            }
            attackTimer = 0;
        }
    }
}

function getAttackArea(){
    if(playerDirection === "right"){
        //右向きの攻撃範囲
        const attackLeft = playerX + 15;
        const attackRight = attackLeft + 40;
        const attackTop = playerY - 15;
        const attackBottom = playerY + 15;
        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        };
    }
    if(playerDirection === "left"){
        //左向きの攻撃範囲
        const attackRight = playerX - 15;
        const attackLeft = attackRight - 40;
        const attackTop = playerY - 15;
        const attackBottom = playerY + 15;
        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        }
    }
    if(playerDirection === "down"){
        //下向きの攻撃範囲
        const attackRight = playerX + 15;
        const attackLeft = playerX - 15;
        const attackTop = playerY + 15;
        const attackBottom = attackTop + 40;
        return{
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        }
    }
    if(playerDirection === "up"){
        //上向きの攻撃範囲
        const attackRight = playerX + 15;
        const attackLeft = playerX - 15;
        const attackBottom = playerY - 15;
        const attackTop = attackBottom -40;
        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        }
    }
}

function checkAttackHit(){
    const attackArea = getAttackArea();

    const enemyLeft = enemyX - enemyRadius;
    const enemyRight = enemyX + enemyRadius;
    const enemyTop = enemyY - enemyRadius;
    const enemyBottom = enemyY + enemyRadius;

    const isHit = 
        enemyRight > attackArea.left &&
        enemyLeft < attackArea.right &&
        enemyTop < attackArea.bottom &&
        enemyBottom > attackArea.top;
    
    return isHit;
}