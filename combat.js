import {keys} from "./player.js";

export let attackTimer = 0;
export const attackInterval = 500;

let previousSpace = false;

export function updateCombat(deltaTime){
    if(previousSpace === false && keys.space === true){
        //攻撃処理
    }
    previousSpace = keys.space;

    if(keys.space === false){
        attackTimer = 0;
    }

    if(keys.space){
        attackTimer += deltaTime;
        if(attackTimer >= attackInterval){
            console.log("攻撃タイミング！")
            attackTimer = 0;
        }
    }
}