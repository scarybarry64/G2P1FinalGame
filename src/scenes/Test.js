class Test extends Phaser.Scene {
    constructor() {
        super('testScene');
    }

    preload() {
        
        // load sprites
        this.load.atlas('player', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        this.load.image('obstacle_red', './assets/sprites/obstacle_red.png');
        this.load.image('obstacle_green', './assets/sprites/obstacle_green.png');
        this.load.image('obstacle_blue', './assets/sprites/obstacle_blue.png');

    }

    create() {

        // create player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'player', 'Glitch_Running_01');
        
        // create obstacles
        this.obstacle_01
        this.obstacle_02
        this.obstacle_03

        // create movement controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update() {

        // stuff

        }
    }
}