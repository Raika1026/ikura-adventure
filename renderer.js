import { playerX, playerY, playerRadius, playerHp } from "./player.js";
import { enemyX, enemyY, enemyRadius, enemyHp, enemyMaxHp } from "./enemy.js";
import { getAttackArea, invincibilityTimer } from "./combat.js";

//キャンバス
const canvas = document.getElementById("gameCanvas");
//筆
const ctx = canvas.getContext("2d");

export function render(gameOver) {
    //芝生
    ctx.fillStyle = "#8fce7a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4b9b45";

    //ドット
    for (let x = 0; x < canvas.width; x += 20) {
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.fillRect(x, y, 3, 3);
        }
    }

    //道
    ctx.fillStyle = "#b89568";
    ctx.fillRect(0, 220, canvas.width, 40);

    //木の幹
    ctx.fillStyle = "#79502b";
    ctx.fillRect(100, 150, 15, 30);

    //木の葉っぱ
    ctx.fillStyle = "#236b32";
    ctx.beginPath();
    ctx.arc(107, 145, 25, 0, Math.PI * 2);
    ctx.fill();

    //木の幹2
    ctx.fillStyle = "#79502b";
    ctx.fillRect(450, 100, 15, 30);

    //木の葉っぱ2
    ctx.fillStyle = "#236b32";
    ctx.beginPath();
    ctx.arc(457, 95, 25, 0, Math.PI * 2);
    ctx.fill();

    //木の幹3
    ctx.fillStyle = "#79502b";
    ctx.fillRect(300, 400, 15, 45);

    //木の葉っぱ3
    ctx.fillStyle = "#236b32";
    ctx.beginPath();
    ctx.arc(307, 395, 25, 0, Math.PI * 2);
    ctx.fill();

    //いくら！
    if (invincibilityTimer <= 0 || Math.floor(invincibilityTimer / 100) % 2 === 0) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(playerX, playerY, playerRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    //イクラのライフ
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    for (let i = 0; i < 3; i++) {
        if (playerHp > i) {
            ctx.fillText("♥", 20 + i * 30, 30);
        } else {
            ctx.fillText("♡", 20 + i * 30, 30);
        }
    }

    //敵キャラ&HPバー
    if (enemyHp >= 0) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(enemyX, enemyY, enemyRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#333333";
        ctx.fillRect(enemyX - enemyRadius, enemyY - enemyRadius - 10, enemyRadius * 2, 4);
        ctx.fillStyle = "red";
        ctx.fillRect(enemyX - enemyRadius, enemyY - enemyRadius - 10, enemyRadius * 2 * enemyHp / enemyMaxHp, 4);
    }

    //攻撃範囲の可視化
    const attackArea = getAttackArea();
    ctx.strokeStyle = "red";
    ctx.strokeRect(attackArea.left, attackArea.top, attackArea.right - attackArea.left, attackArea.bottom - attackArea.top);

    //ゲームオーバー表示
    if(gameOver){
        ctx.fillStyle = "black";
        ctx.font = "50px sans-serif"
        ctx.fillText("いくらちゃん帰宅！", 100, 220);
    }


}

