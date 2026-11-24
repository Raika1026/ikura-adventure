
import { keys } from "./player.js";
import {
    playerX,
    playerY,
    playerRadius,
    playerDirection,
    damagePlayer
} from "./player.js";

import {
    enemies,
    enemyRadius,
    damageEnemy
} from "./enemy.js";

import { courageGauge, consumeCourage, resetCourage } from "./courage.js";

export let attackTimer = 0;
export const attackInterval = 500;

export let invincibilityTimer = 0;
const invincibilityInterval = 1500;

//絶叫時間
let screamTimer = 0;
const screamDuration = 1500;
//絶叫にあたった敵
const screamHitEnemies = new Set();

let previousSpace = false;
let previousQ = false;

export function updateCombat(deltaTime, canvasWidth, canvasHeight) {
    // Spaceキーを押した瞬間に攻撃
    if (previousSpace === false && keys.space === true) {
        attackAllEnemies();
    }

    previousSpace = keys.space;

    // Spaceキーを離したら攻撃タイマーをリセット
    if (keys.space === false) {
        attackTimer = 0;
    }

    // Spaceキーを押し続けている間、一定間隔で攻撃
    if (keys.space) {
        attackTimer += deltaTime;

        if (attackTimer >= attackInterval) {
            attackAllEnemies();
            attackTimer = 0;
        }
    }

    //絶叫時間の経過
    if (screamTimer > 0) {
        screamTimer -= deltaTime;
    }
    if (screamTimer <= 0) {
        screamTimer = 0;
    }

    //波紋が敵に届いたか判定
    if (screamTimer > 0) {
        const maxRadius = getScreamMaxRadius(canvasWidth, canvasHeight);
        const screamRadius = getScreamRadius(maxRadius);

        for (const enemy of enemies) {
            if (enemy.hp <= 0) {
                continue;
            }

            if (hasScreamReachedEnemy(enemy, screamRadius)) {
                hitEnemyWithScream(enemy, 20, 120);
            }
        }
    }

    //絶叫
    if (previousQ === false && keys.q === true) {
        if (courageGauge === 3) {
            screamHitEnemies.clear();
            console.log("絶叫！")
            consumeCourage();
            screamTimer = screamDuration;
        }
    }
    previousQ = keys.q

    // 無敵時間の更新
    if (invincibilityTimer > 0) {
        invincibilityTimer -= deltaTime;
    }

    if (invincibilityTimer <= 0) {
        invincibilityTimer = 0;
    }

    // 接触ダメージ
    if (checkPlayerContact()) {
        if (invincibilityTimer <= 0) {
            damagePlayer();
            invincibilityTimer = invincibilityInterval;
        }
    }
}

// 攻撃範囲内の敵すべてに攻撃
function attackAllEnemies() {
    for (const enemy of enemies) {
        if (checkAttackHit(enemy)) {
            damageEnemy(enemy, 10);
        }
    }
}

// 攻撃範囲を取得
export function getAttackArea() {
    if (playerDirection === "right") {
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

    if (playerDirection === "left") {
        const attackRight = playerX - 15;
        const attackLeft = attackRight - 40;
        const attackTop = playerY - 15;
        const attackBottom = playerY + 15;

        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        };
    }

    if (playerDirection === "down") {
        const attackRight = playerX + 15;
        const attackLeft = playerX - 15;
        const attackTop = playerY + 15;
        const attackBottom = attackTop + 40;

        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        };
    }

    if (playerDirection === "up") {
        const attackRight = playerX + 15;
        const attackLeft = playerX - 15;
        const attackBottom = playerY - 15;
        const attackTop = attackBottom - 40;

        return {
            left: attackLeft,
            right: attackRight,
            top: attackTop,
            bottom: attackBottom
        };
    }
}

// 敵1体に対する攻撃判定
function checkAttackHit(enemy) {
    // 撃破済みの敵には攻撃できない
    if (enemy.hp <= 0) {
        return false;
    }

    const attackArea = getAttackArea();

    const enemyLeft = enemy.x - enemyRadius;
    const enemyRight = enemy.x + enemyRadius;
    const enemyTop = enemy.y - enemyRadius;
    const enemyBottom = enemy.y + enemyRadius;

    const isHit =
        enemyRight > attackArea.left &&
        enemyLeft < attackArea.right &&
        enemyTop < attackArea.bottom &&
        enemyBottom > attackArea.top;

    return isHit;
}

// イクラと敵の接触判定
function checkPlayerContact() {
    for (const enemy of enemies) {
        // 消滅済みの敵は接触判定を行わない
        if (enemy.hp === -1) {
            continue;
        }

        const distance = Math.sqrt(
            (playerX - enemy.x) ** 2 +
            (playerY - enemy.y) ** 2
        );

        if (distance <= playerRadius + enemyRadius) {
            return true;
        }
    }

    return false;
}

// 戦闘状態をリセット
export function resetCombat() {
    attackTimer = 0;
    invincibilityTimer = 0;
    previousSpace = false;
    previousQ = false;
    screamTimer = 0;
    screamHitEnemies.clear();
    resetCourage();
}

//絶叫波紋の進行度
export function getScreamProgress() {
    if (screamTimer <= 0) {
        return 0;
    } else {
        return 1 - screamTimer / screamDuration;
    }
}

//絶叫波紋の半径
export function getScreamRadius(maxRadius) {
    return getScreamProgress() * maxRadius;
}

//当たったか？
function hasScreamHitEnemy(enemy) {
    return screamHitEnemies.has(enemy);
}

//敵との距離
function getDistanceToEnemy(enemy) {
    return Math.hypot(playerX - enemy.x, playerY - enemy.y);
}

//波紋が届いたか
function hasScreamReachedEnemy(enemy, screamRadius) {
    return getDistanceToEnemy(enemy) <= screamRadius + enemyRadius;
}

//波紋でダメージを与える
function hitEnemyWithScream(enemy) {
    if (hasScreamHitEnemy(enemy)) {
        return;
    }

    damageEnemy(enemy, 20, 120);
    screamHitEnemies.add(enemy);
}

export function getScreamMaxRadius(canvasWidth, canvasHeight) {
    const maxDx = Math.max(playerX, canvasWidth - playerX);
    const maxDy = Math.max(playerY, canvasHeight - playerY);

    return Math.hypot(maxDx, maxDy);
}