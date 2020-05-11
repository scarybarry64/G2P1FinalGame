// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
    }

    update() {

        // movement
        // left
        if (keyA.isDown) {
            this.x -= game.settings.playerSpeed;
        }
        // right
        else if (keyD.isDown) {
            this.x += game.settings.playerSpeed;
        }
        // jump
        else if (keyW.isDown) {
            // stuff
        }
    }


    reset() {
        // stuff
    }
}