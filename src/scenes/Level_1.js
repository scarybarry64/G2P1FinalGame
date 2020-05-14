class Level_1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {

        // load tilemap
        this.load.image('tileset', './assets/tilemaps/test_tilemap.png');
        this.load.tilemapTiledJSON('tilemap', './assets/tilemaps/test_tilemap.json');

        // load player sprite
        this.load.atlas('player', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');
    }

    // *** CREATE FUNCTIONS ***

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width / 3, 520, 'player', 'Glitch_Running_01');
        // this.player.setVelocityY(-500); // initial jump off title screen platform
        this.player.setGravityY(1000); // default gravity
        this.player.body.setCollideWorldBounds(true);

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

    createControls() {
        // Movement controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Sight controls
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
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

        // Create tile stuff and layers, hide blue and yellow by default
        const tilemap = this.add.tilemap('tilemap');
        const tileset = tilemap.addTilesetImage('test_tileset', 'tileset');
        this.baseLayer = tilemap.createStaticLayer('Base', tileset, 0, 0);
        this.redLayer = tilemap.createStaticLayer('Red', tileset, 0, 0);
        this.blueLayer = tilemap.createStaticLayer('Blue', tileset, 0, 0);
        this.yellowLayer = tilemap.createStaticLayer('Yellow', tileset, 0, 0);
        this.blueLayer.alpha = 0;
        this.yellowLayer.alpha = 0;

        // Create player
        this.createPlayer();

        // Set collision between player and layers, disable blue and yellow by default
        this.baseLayer.setCollisionByProperty({ collision: true });
        this.redLayer.setCollisionByProperty({ collision: true });
        this.blueLayer.setCollisionByProperty({ collision: true }, false);
        this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        this.physics.add.collider(this.player, this.baseLayer);
        this.physics.add.collider(this.player, this.redLayer);
        this.physics.add.collider(this.player, this.blueLayer);
        this.physics.add.collider(this.player, this.yellowLayer);

        // create movement controls
        this.createControls();

        // create and initialize variables
        this.createVariables();

    }

    // *** UPDATE FUNCTIONS ***
    //jump check
    jumpCheck() {
        if (keyW.isDown) {
            this.preJump();
        }

        // Let go of jump key and gravity returns to normal
        if (Phaser.Input.Keyboard.JustUp(keyW)) {
            this.postJump();
        }
    }
    // pre jump
    preJump() {
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
    }

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

    // reset gravity after jump
    postJump() {
        this.canHoldJump = false;
        this.currGravity = 1000;
        this.player.setGravityY(1000);
    }

    // Ground slam check
    checkGroundSlam() {
        if (Phaser.Input.Keyboard.JustDown(keyS) &&
            !this.player.body.touching.down) {
            this.groundSlam();
        }
    }

    // Ground slam function
    groundSlam() {
        this.isSlamming = true;
        isRunning = false;
        this.player.anims.play('jumping', true);
        this.player.angle = 0;
        this.player.setVelocityY(850);
    }

    // Spin player while in the air
    spinPlayer() {
        if (!this.player.flipX) {
            this.player.angle += 30;
        } else {
            this.player.angle -= 30;
        }
    }

    // Reset player upright when hitting the ground
    resetPlayerAngle() {
        this.player.anims.play('running', true);
        isRunning = true;
        this.player.angle = 0;
        if (this.isSlamming) {
            // shake the camera (duration, intensity)
            this.cameras.main.shake(50, 0.005);
            this.isSlamming = false;
            this.sound.play('sfx_slam');
        }
    }

    horizontalMovement() {
        if (keyD.isDown) {
            this.player.setVelocityX(game.settings.playerSpeed);
            this.player.flipX = false;
        } else if (keyA.isDown) {
            this.player.setVelocityX(-game.settings.playerSpeed);
            this.player.flipX = true;
        } else {
            this.player.setVelocityX(0);
        }
    }

    handleSight() {
        // J key sight, distorts platforms to red
        if (Phaser.Input.Keyboard.JustDown(keyJ) &&
            !jSight) {
            console.log("J SIGHT");
            jSight = true;
            kSight = false;
            lSight = false;

            // Enable red layer, disable blue and yellow layers
            this.redLayer.alpha = 1;
            this.blueLayer.alpha = 0;
            this.yellowLayer.alpha = 0;
            this.redLayer.setCollisionByProperty({ collision: true });
            this.blueLayer.setCollisionByProperty({ collision: true }, false);
            this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        }

        // K key sight, distorts platforms to blue
        if (Phaser.Input.Keyboard.JustDown(keyK) &&
            !kSight) {
            console.log("K SIGHT");
            kSight = true;
            jSight = false;
            lSight = false;

            // Enable blue layer, disable red and yellow layers
            this.redLayer.alpha = 0;
            this.blueLayer.alpha = 1;
            this.yellowLayer.alpha = 0;
            this.redLayer.setCollisionByProperty({ collision: true }, false);
            this.blueLayer.setCollisionByProperty({ collision: true });
            this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        }

        // L key sight, distorts platforms to yellow
        if (Phaser.Input.Keyboard.JustDown(keyL) &&
            !lSight) {
            console.log("L SIGHT");
            lSight = true;
            jSight = false;
            kSight = false;

            // Enable yellow layer, disable blue and red layers
            this.redLayer.alpha = 0;
            this.blueLayer.alpha = 0;
            this.yellowLayer.alpha = 1;
            this.redLayer.setCollisionByProperty({ collision: true }, false);
            this.blueLayer.setCollisionByProperty({ collision: true }, false);
            this.yellowLayer.setCollisionByProperty({ collision: true });
        }
    }



    // *** MAIN UPDATE FUNCTION ***

    update() {

        // Simple jumping for now
        if (this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(keyW)) {
            this.player.body.setVelocityY(-650);
        }

        // Horizontal movement
        this.horizontalMovement();

        // Sight
        this.handleSight();

    }
}