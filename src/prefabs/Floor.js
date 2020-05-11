// Floor prefab
class Floor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        this.body = custom_body;
        this.setImmovable();
        this.setScale(4, 0.5);

        // add collider
        scene.physics.add.collider(scene, player, this);

        // add to scene
        scene.add.existing(this);
        
    }

    update() {
        // stuff
    }
}