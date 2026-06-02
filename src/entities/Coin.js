/**
 * src/entities/Coin.js
 * ---------------------------------------------------------------
 * Entity koin. Animasi:
 *   - rotasi 360 derajat (terlihat berputar)
 *   - pulsing scale (berkilat seperti spin 3D dari samping)
 *
 * POSISI DIKUNCI LAPIS BERLAPIS untuk mencegah koin jatuh:
 *   1. setImmovable(true)
 *   2. setAllowGravity(false)
 *   3. setGravity(0, 0)            -- eksplisit
 *   4. setVelocity(0, 0)            -- no velocity drift
 *   5. setSize(28, 28) + offset 0   -- body match texture
 *   6. updateFromGameObject()       -- sync body ke sprite
 *
 * collected() dipanggil dari GameScene.collectCoin():
 *   - kill semua tween
 *   - tween mengecil lalu menghilang
 *   - hancurkan objek
 * ---------------------------------------------------------------
 */
export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'coin');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.value = 10;

    // ---- POSITION LOCK (6 lapis) ----
    this.setImmovable(true);
    this.body.setAllowGravity(false);
    this.body.setGravity(0, 0);
    this.body.setVelocity(0, 0);
    this.body.setSize(28, 28);
    this.body.setOffset(0, 0);
    this.body.updateFromGameObject();

    // ---- ANIMASI (TIDAK menyentuh Y) ----
    // rotasi penuh
    scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 900,
      repeat: -1
    });
    // pulsing scale (berkilat)
    scene.tweens.add({
      targets: this,
      scaleX: { from: 1, to: 0.4 },
      scaleY: { from: 1, to: 1.15 },
      duration: 450,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  collect() {
    if (!this.active) return;
    this.body.setEnable(false);
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleY: 0,
      alpha: 0,
      angle: this.angle + 180,
      duration: 180,
      onComplete: () => this.destroy()
    });
  }
}
