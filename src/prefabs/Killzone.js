
class Killzone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, player){
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.player = player;

        this.rect = scene.add.rectangle(x, y, game.config.width, 0, 0xFFFFFF).setOrigin(0,0);
        scene.physics.add.existing(this.rect);
        this.rect.body.onOverlap = true;

    }

    create(){
        scene.physics.world.on('overlap', ()=>{
            console.log("player hit");
        });
    }

    update(){
        this.rect.height += 1;
        this.scene.physics.overlap(this.player, this);
        //console.log("height is " + this.rect.height);
    }
}