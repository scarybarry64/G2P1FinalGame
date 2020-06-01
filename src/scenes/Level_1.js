class Level_1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {

        // // OLD CODE
        // // load tilemap
        // this.load.image('tileset', './assets/tilemaps/test_tilemap.png');
        // this.load.image('tileset2', './assets/tilemaps/test_tilemap_t.png');
        // this.load.tilemapTiledJSON('tilemap', './assets/tilemaps/test_tilemap.json');

        // NEW CODE
        this.load.image('tileset', './assets/tiles_NEW/tileset.png');
        this.load.tilemapTiledJSON('tilemap', './assets/tiles_NEW/tilemap.json');

        /*
        // load player sprite
        this.load.image('player', './assets/sprites/hooded_figure_2.png');

        // load player sprite
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        

        // load player color sprites
        this.load.atlas('Glitch_Blue', './assets/sprites/Player/Blue/Glitch_Blue_IdleRunning.png', './assets/sprites/Player/Blue/Glitch_Blue_IdleRunning.json');
        this.load.atlas('Glitch_Red', './assets/sprites/Player/Red/Glitch_Red_IdleRunning.png', './assets/sprites/Player/Red/Glitch_Red_IdleRunning.json');
        this.load.atlas('Glitch_Yellow', './assets/sprites/Player/Yellow/Glitch_Yellow_IdleRunning.png', './assets/sprites/Player/Yellow/Glitch_Yellow_IdleRunning.json');
        */

        // Glitch blue anims
        this.load.atlas('Glitch_Blue_Idle', './assets/sprites/Player/Blue/Glitch_Blue_Idle.png', './assets/sprites/Player/Blue/Glitch_Blue_Idle.json');
        this.load.atlas('Glitch_Blue_Run', './assets/sprites/Player/Blue/Glitch_Blue_Running.png', './assets/sprites/Player/Blue/Glitch_Blue_Running.json');
        this.load.atlas('Glitch_Blue_Wall', './assets/sprites/Player/Blue/Glitch_Blue_Wall.png', './assets/sprites/Player/Blue/Glitch_Blue_Wall.json');

        // Glitch red anims
        this.load.atlas('Glitch_Red_Idle', './assets/sprites/Player/Red/Glitch_Red_Idle.png', './assets/sprites/Player/Red/Glitch_Red_Idle.json');
        this.load.atlas('Glitch_Red_Run', './assets/sprites/Player/Red/Glitch_Red_Running.png', './assets/sprites/Player/Red/Glitch_Red_Running.json');
        this.load.atlas('Glitch_Red_Wall', './assets/sprites/Player/Red/Glitch_Red_Wall.png', './assets/sprites/Player/Red/Glitch_Red_Wall.json');

        // Glitch yellow anims
        this.load.atlas('Glitch_Yellow_Idle', './assets/sprites/Player/Yellow/Glitch_Yellow_Idle.png', './assets/sprites/Player/Yellow/Glitch_Yellow_Idle.json');
        this.load.atlas('Glitch_Yellow_Run', './assets/sprites/Player/Yellow/Glitch_Yellow_Running.png', './assets/sprites/Player/Yellow/Glitch_Yellow_Running.json');
        this.load.atlas('Glitch_Yellow_Wall', './assets/sprites/Player/Yellow/Glitch_Yellow_Wall.png', './assets/sprites/Player/Yellow/Glitch_Yellow_Wall.json');

        // Deadzone anims
        this.load.atlas('Deadzone_Particles', './assets/sprites/deadzone.png', './assets/sprites/deadzone.json');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');

        // load various sprites
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png');
        this.load.image('deadzone', './assets/sprites/deadzone.png');
    }

    // *** CREATE FUNCTIONS ***

    // Creates level using tilemap and layers, hide blue and yellow layers
    createLevel() {

        // // OLD CODE
        // this.tilemap = this.add.tilemap('tilemap');
        // this.tileset = this.tilemap.addTilesetImage('test_tileset', 'tileset2');
        // this.baseLayer = this.tilemap.createStaticLayer('Base', this.tileset, 0, 0);
        // this.redLayer = this.tilemap.createStaticLayer('Red', this.tileset, 0, 0);
        // this.blueLayer = this.tilemap.createStaticLayer('Blue', this.tileset, 0, 0);
        // this.yellowLayer = this.tilemap.createStaticLayer('Yellow', this.tileset, 0, 0);
        // this.redLayer.alpha = 0;
        // this.yellowLayer.alpha = 0;

        // NEW CODE
        this.tilemap = this.add.tilemap('tilemap');
        this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset');

        this.backgroundLayer = this.tilemap.createStaticLayer('Background', this.tileset, 0, 0);
        this.buildingLayer = this.tilemap.createStaticLayer('Buildings', this.tileset, 0, 0);
        this.offLayer = this.tilemap.createStaticLayer('Off', this.tileset, 0, 0);
        this.yellowLayer = this.tilemap.createStaticLayer('Yellow', this.tileset, 0, 0);
        this.blueLayer = this.tilemap.createStaticLayer('Blue', this.tileset, 0, 0);
        this.redLayer = this.tilemap.createStaticLayer('Red', this.tileset, 0, 0);

        this.redLayer.alpha = 0;
        this.yellowLayer.alpha = 0;
    }

    createPlayerAnims() {
        // Blue Run Anim
        this.anims.create({
            key: 'Blue_Run',
            frames: this.anims.generateFrameNames('Glitch_Blue_Run'),
            frameRate: 10,
            repeat: -1
        });

        // Red Run Anim
        this.anims.create({
            key: 'Red_Run',
            frames: this.anims.generateFrameNames('Glitch_Red_Run'),
            frameRate: 10,
            repeat: -1
        });

        // Yellow Run Anim
        this.anims.create({
            key: 'Yellow_Run',
            frames: this.anims.generateFrameNames('Glitch_Yellow_Run'),
            frameRate: 10,
            repeat: -1
        });

        // Blue Idle Anim
        this.anims.create({
            key: 'Blue_Idle',
            frames: this.anims.generateFrameNames('Glitch_Blue_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Red Idle Anim
        this.anims.create({
            key: 'Red_Idle',
            frames: this.anims.generateFrameNames('Glitch_Red_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Yellow Idle Anim
        this.anims.create({
            key: 'Yellow_Idle',
            frames: this.anims.generateFrameNames('Glitch_Yellow_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Blue Wall Anim
        this.anims.create({
            key: 'Blue_Wall',
            frames: this.anims.generateFrameNames('Glitch_Blue_Wall'),
            frameRate: 1,
            repeat: -1
        });

        // Red Wall Anim
        this.anims.create({
            key: 'Red_Wall',
            frames: this.anims.generateFrameNames('Glitch_Red_Wall'),
            frameRate: 1,
            repeat: -1
        });

        // Yellow Wall Anim
        this.anims.create({
            key: 'Yellow_Wall',
            frames: this.anims.generateFrameNames('Glitch_Yellow_Wall'),
            frameRate: 1,
            repeat: -1
        });
    }


    // Creates player and spawns them into level
    createPlayer() {
        this.spawn = this.tilemap.findObject('Objects', obj => obj.name === 'Spawn');
        this.checkpoint1 = this.tilemap.findObject('Objects', obj => obj.name === 'Goal');

        let tempy = localStorage.getItem("checkpointy");
        let tempx = localStorage.getItem("checkpointx");

        this.player = this.physics.add.sprite(this.spawn.x, this.spawn.y - 20, 'Glitch_Blue_Idle', '0');

        if (tempy != null && tempx != null) {
            this.player.y = Number(tempy);
            this.player.x = Number(tempx);
        }
        this.player.setGravityY(600); // default gravity

        // create the anims necessary for the player
        this.createPlayerAnims();

        this.player.anims.play('Blue_Idle', true);

        this.player.body.setMaxSpeed(850); // set max speed to keep from collision bug
    }

    // Setup camera to follow player and stop at world bounds
    createCamera() {
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.cameras.roundPixels = true;
    }

    // Set collision between player and layers, disable blue and yellow by default
    createCollision() {

        // // OLD CODE
        // this.baseLayer.setCollisionByProperty({ collision: true });
        // this.blueLayer.setCollisionByProperty({ collision: true });
        // this.redLayer.setCollisionByProperty({ collision: true }, false);
        // this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        // this.physics.add.collider(this.player, this.baseLayer);
        // this.physics.add.collider(this.player, this.redLayer);
        // this.physics.add.collider(this.player, this.blueLayer);
        // this.physics.add.collider(this.player, this.yellowLayer);

        // NEW CODE
        this.buildingLayer.setCollisionByProperty({ collision: true });
        this.blueLayer.setCollisionByProperty({ collision: true });
        this.redLayer.setCollisionByProperty({ collision: true }, false);
        this.yellowLayer.setCollisionByProperty({ collision: true }, false);

        this.physics.add.collider(this.player, this.buildingLayer);
        this.physics.add.collider(this.player, this.redLayer);
        this.physics.add.collider(this.player, this.blueLayer);
        this.physics.add.collider(this.player, this.yellowLayer);
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

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
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

        jSight = true;
        kSight = false;
        lSight = false;
    }

    createDeadzone() {
        let tempy = localStorage.getItem("checkpointy");

        this.deadzone = this.physics.add.sprite(centerX, this.tilemap.heightInPixels + centerY * 1.75, 'deadzone');

        this.deadzone.body.onOverlap = true;
        this.deadzone.body.setVelocityY(-3);
        if (tempy != null) {
            this.deadzone.y = Number(tempy) + 100;
        }

        //Overlap check, runs GameOver scene if player overlaps with deadzone
        this.physics.world.on('overlap', () => {
            this.scene.start('GameOver');
        });

        // Deadzone animation
        this.anims.create({
            key: 'Deadzone_FX',
            frames: this.anims.generateFrameNames('Deadzone_Particles'),
            frameRate: 5,
            repeat: -1
        });
        this.deadzone.anims.play('Deadzone_FX', true);
    }

    createCheckpoint() {
        //Find locations flagged for checkpoints
        this.checkpointPos = this.tilemap.filterObjects('Objects', obj => obj.name === 'Checkpoint');


        this.checkpoints = [];

        //Create checkpoint objects at every flagged location
        for (const checkpoint of this.checkpointPos) {
            this.checkpoints.push(new Checkpoint(this, checkpoint.x, checkpoint.y, this.player));
        }
    }

    // *** MAIN CREATE FUNCTION ***
    create() {

        // Create level
        this.createLevel();

        // Create player
        this.createPlayer();

        // Create camera
        this.createCamera();

        // Create collision
        this.createCollision();

        // Create movement controls
        this.createControls();

        // Create and initialize variables
        this.createVariables();

        this.createDeadzone();

        // this.visionHud = this.add.text(14, 0, 'J',
        // { fontFamily: 'Consolas', fontSize: '60px', align: 'center' }).setScrollFactor(0);

        // this.visionHud2 = this.add.text(910, 0, 'J',
        // { fontFamily: 'Consolas', fontSize: '60px', align: 'center' }).setScrollFactor(0);

        this.createCheckpoint();


    }

    // *** UPDATE FUNCTIONS ***
    //jump check
    jumpCheck() {
        if (!isStuck) {
            if (keyW.isDown) {
                this.preJump();
            }

            // Let go of jump key and gravity returns to normal
            if (Phaser.Input.Keyboard.JustUp(keyW)) {
                this.postJump();
            }
        } else {
            this.stuckJump();
        }
    }
    // pre jump
    preJump() {
        // Jump functionality, single jump only
        if (Phaser.Input.Keyboard.JustDown(keyW) &&
            this.player.body.blocked.down) {
            isRunning = false;
            // this.player.anims.play('jumping', true);
            this.jumpStartHeight = this.player.y;
            this.canHoldJump = true;
            this.sound.play('sfx_jump');
            this.startJump();
        }

        // this causes the players jump to be longer if held down
        if (keyW.isDown && this.canHoldJump) {
            isRunning = false;
            // this.player.anims.play('jumping', true);
            this.holdJump();
        }
    }

    // Initial Jump made from object, -300 is the smallest possible jump height
    startJump() {
        this.player.setVelocityY(-175);
        isJumping = true;
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        if (!isStuck) {
            // only allow the player to jump 100 units above the 
            // height at which the jump was made
            if ((this.player.y > this.jumpStartHeight - 35) &&
                !this.player.body.blocked.right) {
                isJumping = true;
                this.player.setGravityY(-900); //negative gravity simulates extending a jump
            } else {
                // else reset the gravity to pull the player to the ground
                isJumping = true;
                this.player.setGravityY(600);
                this.canHoldJump = false; // disables double jump
            }
        }
    }

    // reset gravity after jump
    postJump() {
        this.canHoldJump = false;
        this.currGravity = 600;
        this.player.setGravityY(600);
    }

    // wall jump functionality
    stuckJump() {
        if (Phaser.Input.Keyboard.JustDown(keyW) && isStuck) {
            isRunning = false;
            // this.player.anims.play('jumping', true);
            this.jumpStartHeight = this.player.y;
            this.canHoldJump = true;
            this.sound.play('sfx_jump');
            this.startJump();
            isStuck = false;

        }

        // this causes the players jump to be longer if held down
        if (keyW.isDown && this.canHoldJump) {
            isRunning = false;
            // this.player.anims.play('jumping', true);
            this.holdJump();
        }
    }

    // Ground slam check
    checkGroundSlam() {
        if (Phaser.Input.Keyboard.JustDown(keyS) &&
            !this.player.body.blocked.down && !this.isSlamming) {
            this.groundSlam();
        }
    }

    // Ground slam function
    groundSlam() {
        this.isSlamming = true;
        isRunning = false;
        // this.player.anims.play('jumping', true);
        this.player.angle = 0;
        this.player.setVelocityY(800);
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
        // this.player.anims.play('running', true);
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
            if (kSight) {
                this.player.anims.play('Red_Run', true);
            } else if (lSight) {
                this.player.anims.play('Yellow_Run', true);
            } else {
                this.player.anims.play('Blue_Run', true);
            }
        } else if (keyA.isDown) {
            this.player.setVelocityX(-game.settings.playerSpeed);
            this.player.flipX = true;
            if (kSight) {
                this.player.anims.play('Red_Run', true);
            } else if (lSight) {
                this.player.anims.play('Yellow_Run', true);
            } else {
                this.player.anims.play('Blue_Run', true);
            }
        } else {
            if (kSight) {
                this.player.anims.play('Red_Idle', true);
            } else if (lSight) {
                this.player.anims.play('Yellow_Idle', true);
            } else {
                this.player.anims.play('Blue_Idle', true);
            }

            this.player.setVelocityX(0);
        }
    }

    handleSight() {
        // J key sight, distorts platforms to red
        if (Phaser.Input.Keyboard.JustDown(keyJ) &&
            !jSight) {

            // this.visionHud.text = 'J'; // set vision hud to current key press
            // this.visionHud2.text = 'J'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if (this.player.x == 81 || this.player.x == 879) {
                this.player.anims.play('Blue_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(1000);
            }

            jSight = true;
            kSight = false;
            lSight = false;

            // Enable red layer, disable blue and yellow layers
            this.redLayer.alpha = 0;
            this.blueLayer.alpha = 1;
            this.yellowLayer.alpha = 0;
            this.blueLayer.setCollisionByProperty({ collision: true });
            this.redLayer.setCollisionByProperty({ collision: true }, false);
            this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        }

        // K key sight, distorts platforms to blue
        if (Phaser.Input.Keyboard.JustDown(keyK) &&
            !kSight) {

            // this.visionHud.text = 'K'; // set vision hud to current key press
            // this.visionHud2.text = 'K'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if (this.player.x == 81 || this.player.x == 879) {
                this.player.anims.play('Red_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(1000);
            }

            kSight = true;
            jSight = false;
            lSight = false;

            // Enable blue layer, disable red and yellow layers
            this.redLayer.alpha = 1;
            this.blueLayer.alpha = 0;
            this.yellowLayer.alpha = 0;
            this.blueLayer.setCollisionByProperty({ collision: true }, false);
            this.redLayer.setCollisionByProperty({ collision: true });
            this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        }

        // L key sight, distorts platforms to yellow
        if (Phaser.Input.Keyboard.JustDown(keyL) &&
            !lSight) {

            // this.visionHud.text = 'L'; // set vision hud to current key press
            // this.visionHud2.text = 'L'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if (this.player.x == 81 || this.player.x == 879) {
                this.player.anims.play('Yellow_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(1000);
            }

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

    // check for wall jump on left
    wallJumpLeft() {
        //Stick to things on the left
        if (this.player.body.blocked.left && canStick && isJumping) {
            if (kSight) {
                this.player.anims.play('Red_Wall', true);
            } else if (lSight) {
                this.player.anims.play('Yellow_Wall', true);
            } else {
                this.player.anims.play('Blue_Wall', true);
            }
            isStuck = true; //set the global var true
            canStick = false; // make it so you can only stick to another wall after touching down
            this.player.body.velocity.y = 0; // neutralize vertical movement
            this.player.body.velocity.x = 0 // neutralize horizontal movement
            this.player.angle = 0; // set player sprite upright
            this.player.setGravityY(0); // kill gravity
            this.player.flipX = true; // flip players horizontal orientation
        }
    }

    // check for wall jump on right
    wallJumpRight() {
        // Stick to things on the right
        if (this.player.body.blocked.right && canStick && isJumping) {
            if (kSight) {
                this.player.anims.play('Red_Wall', true);
            } else if (lSight) {
                this.player.anims.play('Yellow_Wall', true);
            } else {
                this.player.anims.play('Blue_Wall', true);
            }
            isStuck = true; //set the global var true
            canStick = false; // make it so you can only stick to another wall after touching down
            this.player.body.velocity.y = 0; // neutralize vertical movement
            this.player.body.velocity.x = 0 // neutralize horizontal movement
            this.player.angle = 0; // set player sprite upright
            this.player.setGravityY(0); // kill gravity
            this.player.flipX = false; // flip players horizontal orientation
        }
    }

    checkPause() {
        if (Phaser.Input.Keyboard.JustDown(keyESC) &&
            !isPaused) {
            console.log("PAUSE");
            isPaused = true;
            this.scene.launch('pauseScene');
            this.scene.pause();
        }
    }


    // *** MAIN UPDATE FUNCTION ***

    update() {

        this.checkPause(); // check if should pause game

        //JUMP ---
        this.jumpCheck();

        // Only do while player is not stuck to wall
        if (!isStuck) {
            // Horizontal movement
            this.horizontalMovement();

            // ground slam functionality
            this.checkGroundSlam();

            // Spin the player whilst in the air
            if (!this.player.body.blocked.down && !this.isSlamming) {
                //this.player.anims.play('jumping', true);
                this.spinPlayer();
            }
        }

        this.wallJumpLeft();

        this.wallJumpRight();

        // reset the player sprite and angle when back on the ground
        if (this.player.body.blocked.down) {
            isJumping = false;
            canStick = true;
            this.resetPlayerAngle();
        }

        // Sight
        this.handleSight();

        //Check if player and deadzone overlap
        this.physics.overlap(this.player, this.deadzone)

        //Check if the player has made contact with any checkpoint objects
        for (const checkpoint of this.checkpoints) {
            checkpoint.update();
        }
    }
}