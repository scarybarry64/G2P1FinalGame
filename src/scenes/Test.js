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
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
    }

    // *** CREATE FUNCTIONS ***

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width/3, 520, 'player', 'Glitch_Running_01');
        this.player.setVelocityY(-500); // initial jump off title screen platform
        this.player.setGravityY(1000); // default gravity

        
        // player running animation config
        let playerRunAnimConfig = {
            key: 'running',
            frames: this.anims.generateFrameNames('Glitch', {
                prefix: 'Glitch_Running_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        };

        // player jumping animation config
        let playerJumpAnimConfig = {
            key: 'jumping',
            defaultTextureKey: 'Glitch',
            frames: [
                { frame: 'Glitch_Jumping' }
            ],
            repeat: -1
        };

        //ANIMATION 
        this.anims.create(playerRunAnimConfig);
        this.anims.create(playerJumpAnimConfig);
    }

    spawnFloor() {
        let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();
        
        // this.floor = new Floor(this,game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal');

        // set the collision property of player on objects
        this.physics.add.collider(this.player, floor);

    }

    createControls() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    createVariables() {
       // BOOLEAN VARIABLES
       this.isSlamming = false; // keeps track of if player is ground slamming
       this.isGameOver = false; // keeps track of if game should go to game over scene'
       this.canHoldJump = false; // keeps track of if player can continue to gain height in their jump
       game.settings.isStuck = false; //reset the global isStuck variable
       this.allowedToLeft = true;
       this.allowedToRight = true;

       // INTEGER VARIABLES
       this.jumpStartHeight = 0; // used to calculate relative max jump height
       game.settings.scrollSpeed = -200; // global game scroll speed, this is how we imitate time dilation
       this.lefts = 0;
       this.rights = 0; 
    }

    // *** MAIN CREATE FUNCTION ***
    create() {

        // CREATE THE PLAYER
        this.createPlayer();

        // spawn the floor and set it immovable
        this.spawnFloor();

        // create obstacles
        this.obstacle_01;
        this.obstacle_02;
        this.obstacle_03;

        // create movement controls
        this.createControls();

        // create and initialize variables
        this.createVariables();
        
    }

    // *** UPDATE FUNCTIONS ***

    // Initial Jump made from object, -300 is the smallest possible jump height
    startJump() {
        this.player.setVelocityY(-300);
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        // only allow the player to jump 100 units above the 
        // height at which the jump was made
        if (this.player.y > this.jumpStartHeight - 65) {
            this.player.setGravityY(-1500); //negative gravity simulates extending a jump
        } else {
            // else reset the gravity to pull the player to the ground
            this.player.setGravityY(1000);
            this.canHoldJump = false; // disables double jump
        }
    }

    

    update() {

        //JUMP ---
        // Jump functionality, single jump only
        if (Phaser.Input.Keyboard.JustDown(keyW) &&
                this.player.body.touching.down) {
            isRunning = false;
            this.player.anims.play('jumping', true);
            this.jumpStartHeight = this.player.y;
            this.canHoldJump = true;
            this.sound.play('sfx_jump');
            this.startJump();
        }

        // this causes the players jump to be longer if held down
        if (keyW.isDown && this.canHoldJump) {
            isRunning = false;
            this.player.anims.play('jumping', true);
            this.holdJump();
        }

        // Let go of jump key and gravity returns to normal
        if (Phaser.Input.Keyboard.JustUp(keyW)) {
            this.canHoldJump = false;
            this.currGravity = 1000;
            this.player.setGravityY(1000);
        }

    }
}