class Checkpoint extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, texture2, player, checkpoints){
        super(scene, x, y, texture, texture2, player);
        this.active = false;
        this.player = player;
        this.x = x;
        this.y = y;
        this.setTexture(texture);
        this.secTexture = texture2;
        this.checkpoints = checkpoints;

        //add object to existing scene, displayList, updateList
        scene.add.existing(this);
    }

    create() {
        this.checkpointSet = false;
    }
    

    update(){
        //Check if the given player object makes contact with the checkpoint
        if(this.player.x < this.x + 25 && this.player.x > this.x - 25) {
            if(this.player.y < this.y + 20 && this.player.y > this.y - 20) {
                if(!this.checkpointSet){
                    this.setTexture(this.secTexture);
                    // console.log("player reached checkpoint");
                    this.tempx = localStorage.getItem('checkpointx');
                    this.tempy = localStorage.getItem('checkpointy');
                    // console.log(typeof this.tempy);
                    //console.log("tempx = " + this.tempx);
                    this.checkpointSet = true;

                    //Change the stored checkpoint x and y if there is no previous reached checkpoints
                    //or if the current checkpoint is the most advanced
                    if(this.y < this.tempy || this.tempy == null){
                        localStorage.setItem('checkpointx', this.x);
                        localStorage.setItem('checkpointy', this.y);
                    }
                }
            }
        }
    }
}