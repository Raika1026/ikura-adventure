
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

export let attackTimer = 0;
export const attackInterval = 500;

export let invincibilityTimer = 0;
const invincibilityInterval = 1500;

let previousSpace = false;

export function updateCombat(deltaTime) {
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
}
