import { playerX, playerY } from "./player.js";
import { enemyX, enemyY, enemyRadius} from "./enemy.js";

//キャンバス
const canvas = document.getElementById("gameCanvas");
//筆
const ctx = canvas.getContext("2d");

export function render() {
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
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(playerX, playerY, 15, 0, Math.PI * 2);
    ctx.fill();

    //敵キャラ
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(enemyX, enemyY, enemyRadius, 0, Math.PI * 2);
    ctx.fill();
}

