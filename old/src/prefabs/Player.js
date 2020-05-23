// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to existing, displayList, updateList
        scene.add.existing(this);
    }

    update() {
        // left/right movement
        if (keyA.isDown) {
            this.x -= game.settings.playerSpeed;
        }
        else if (keyD.isDown) {
            this.x += game.settings.playerSpeed;
        }
    }


    reset() {
        // stuff
    }
}