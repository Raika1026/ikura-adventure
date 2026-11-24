import { playerX, playerY, playerRadius, playerHp } from "./player.js";
import { enemies, enemyRadius, enemyMaxHp } from "./enemy.js";
import { getAttackArea, invincibilityTimer,getScreamProgress, getScreamRadius, getScreamMaxRadius } from "./combat.js";
import { courageGauge } from "./courage.js";

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

    //勇気ゲージ
    for (let i = 0; i < 3; i++) {
        if (courageGauge > i) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(150 + i * 101, 15, 100, 20);
        } else {
            ctx.fillStyle = "grey";
            ctx.fillRect(150 + i * 101, 15, 100, 20);
        }
    }


    //敵キャラ&HPバー
    for (const enemy of enemies) {
        //消滅済みの敵は描画しない
        if (enemy.hp < 0) {
            continue;
        }

        //敵キャラ
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemyRadius, 0, Math.PI * 2);
        ctx.fill();

        //HPバーの背景
        ctx.fillStyle = "#333333";
        ctx.fillRect(
            enemy.x - enemyRadius,
            enemy.y - enemyRadius - 10,
            enemyRadius * 2,
            4
        );

        //HPバー
        ctx.fillStyle = "red";
        ctx.fillRect(
            enemy.x - enemyRadius,
            enemy.y - enemyRadius - 10,
            enemyRadius * 2 * enemy.hp / enemyMaxHp,
            4
        );
    }


    //攻撃範囲の可視化
    const attackArea = getAttackArea();
    ctx.strokeStyle = "red";
    ctx.strokeRect(attackArea.left, attackArea.top, attackArea.right - attackArea.left, attackArea.bottom - attackArea.top);

    //ゲームオーバー表示
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "50px sans-serif"
        ctx.fillText("いくらちゃん帰宅！", 100, 220);
    }

    //波紋の半径を求めて波紋を描く
    const maxRadius = getScreamMaxRadius(canvas.width, canvas.height);
    const screamRadius = getScreamRadius(maxRadius);

    if(screamRadius > 0) {
        ctx.beginPath();
        ctx.arc(playerX, playerY, screamRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.globalAlpha = 1 - getScreamProgress();
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

