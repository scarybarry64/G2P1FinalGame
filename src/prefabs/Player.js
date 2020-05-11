// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body = custom_body;
        // player.setVelocityY(-500); // initial jump off title screen platform
        // this.setGravityY(1000); // default gravity

        // add to scene
        scene.add.existing(this);
    }

    update() {
/*
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
        */
    }
}