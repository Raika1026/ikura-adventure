
import { playerX, playerY } from "./player.js";
import { addCourage } from "./courage.js";

// 敵の基本設定
export const enemyRadius = 15;
export const enemyMaxHp = 30;

//撃破数管理
export let defeatCount = 0;
//ウェーブ数管理
export let waveCount = 1;

// ノックバック設定
const knockbackDuration = 300;
const knockbackDistance = 80;

// 敵の初期位置
const initialEnemyPositions = [
    { x: -50, y:50 },
    { x: 650, y: -20 },
    { x: 300, y: 700 }
];

// 敵を生成する
function createEnemy(x, y) {
    return {
        x,
        y,
        hp: enemyMaxHp,

        knockbackTimer: 0,
        knockbackDx: 0,
        knockbackDy: 0,
        currentKnockbackDistance: 60
    };
}

// 敵を複数体管理する
export let enemies = initialEnemyPositions.map(
    position => createEnemy(position.x, position.y)
);

// 敵にダメージを与える
export function damageEnemy(enemy, damage, knockbackDistance = null) {
    if (enemy.hp <= 0) {
        return;
    }

    enemy.hp -= damage;
    enemy.currentKnockbackDistance = knockbackDistance ?? 60;

    // 撃破された場合
    if (enemy.hp <= 0) {
        enemy.hp = 0;
        enemy.currentKnockbackDistance = knockbackDistance ?? 180;
        defeatCount++;
        addCourage();
    }

    // ノックバック方向を計算
    const dx = enemy.x - playerX;
    const dy = enemy.y - playerY;

    const length = Math.sqrt(dx * dx + dy * dy);

    if (length > 0) {
        enemy.knockbackDx = dx / length;
        enemy.knockbackDy = dy / length;
        enemy.knockbackTimer = knockbackDuration;
    }
}

// 敵を移動させる
export function moveEnemy(enemy, deltaTime) {
    // ノックバック中
    if (enemy.knockbackTimer > 0) {
        enemy.x += enemy.knockbackDx
            * enemy.currentKnockbackDistance
            * (deltaTime / knockbackDuration);

        enemy.y += enemy.knockbackDy
            * enemy.currentKnockbackDistance
            * (deltaTime / knockbackDuration);

        enemy.knockbackTimer -= deltaTime;

        // 撃破後のノックバックが終了したら消滅
        if (enemy.knockbackTimer <= 0 && enemy.hp <= 0) {
            enemy.hp = -1;
        }

        return;
    }

    // 撃破済みなら移動しない
    if (enemy.hp <= 0) {
        return;
    }

    // イクラを追いかける
    const dx = playerX - enemy.x;
    const dy = playerY - enemy.y;

    const length = Math.sqrt(dx * dx + dy * dy);

    if (length > 0) {
        enemy.x += (dx / length) * 1;
        enemy.y += (dy / length) * 1;
    }
}

// 敵を初期状態に戻す
export function resetEnemy() {
    enemies = initialEnemyPositions.map(
        position => createEnemy(position.x, position.y)
    );
    defeatCount = 0;
    waveCount = 1;
}

//敵の全滅判定
export function hasAliveEnemies(){
    const result = enemies.some(
        enemy => enemy.hp >0
    );
    return result;
}

//次の敵3体を出現させる
export function spawnEnemies(){
    enemies = initialEnemyPositions.map(
        position => createEnemy(position.x, position.y)
    );
}

//ウェーブ数を増やす
export function nextWave(){
    waveCount++;
}

