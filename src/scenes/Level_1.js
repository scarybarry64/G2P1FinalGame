class Level_1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {

        // load tilemap
        this.load.image('tileset', './assets/tilemaps/test_tilemap.png');
        this.load.tilemapTiledJSON('tilemap', './assets/tilemaps/test_tilemap.json');

        // load player sprite
        this.load.image('player', './assets/sprites/hooded_figure_2.png');

        // load player sprite
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');;

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');

        // load various sprites
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png');
        this.load.image('killzone', './assets/sprites/green_rectangle.png');
    }

    // *** CREATE FUNCTIONS ***

    // Creates level using tilemap and layers, hide blue and yellow layers
    createLevel() {
        this.tilemap = this.add.tilemap('tilemap');
        this.tileset = this.tilemap.addTilesetImage('test_tileset', 'tileset');
        this.baseLayer = this.tilemap.createStaticLayer('Base', this.tileset, 0, 0);
        this.redLayer = this.tilemap.createStaticLayer('Red', this.tileset, 0, 0);
        this.blueLayer = this.tilemap.createStaticLayer('Blue', this.tileset, 0, 0);
        this.yellowLayer = this.tilemap.createStaticLayer('Yellow', this.tileset, 0, 0);
        this.blueLayer.alpha = 0;
        this.yellowLayer.alpha = 0;
    }

    // Creates player and spawns them into level
    createPlayer() {
        this.spawn = this.tilemap.findObject('Objects', obj => obj.name === 'Spawn');

        this.player = this.physics.add.sprite(this.spawn.x, this.spawn.y, 'Glitch', 'Glitch_Running_01');
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

        // Placeholder player idle animation config
        let playerIdleAnimConfig = {
            key: 'idle',
            frames: this.anims.generateFrameNames('Glitch', {
                prefix: 'Glitch_Running_',
                start: 3,
                end: 3,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        };

        // Placeholder player idle animation config
        let playerStuckAnimConfig = {
            key: 'stuck',
            frames: this.anims.generateFrameNames('Glitch', {
                prefix: 'Glitch_Running_',
                start: 1,
                end: 1,
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
        this.anims.create(playerIdleAnimConfig);
        this.anims.create(playerStuckAnimConfig);

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
        this.baseLayer.setCollisionByProperty({ collision: true });
        this.redLayer.setCollisionByProperty({ collision: true });
        this.blueLayer.setCollisionByProperty({ collision: true }, false);
        this.yellowLayer.setCollisionByProperty({ collision: true }, false);
        this.physics.add.collider(this.player, this.baseLayer);
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
    }

    spawnKillzone(){
        this.killzone = this.physics.add.sprite(0, this.tilemap.heightInPixels, 'killzone').setScale(1);
        this.killzone.body.onOverlap = true;
        this.killzone.body.setVelocityY(-20);

        this.physics.world.on('overlap', ()=>{
           //this.scene.start('Gameover');
           console.log("player hit");
        });
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

        this.spawnKillzone();
        this.visionHud = this.add.text(14, 0, 'J',
            { fontFamily: 'Consolas', fontSize: '60px', align: 'center' }).setScrollFactor(0);

        this.visionHud2 = this.add.text(910, 0, 'J',
            { fontFamily: 'Consolas', fontSize: '60px', align: 'center' }).setScrollFactor(0);

    }

    // *** UPDATE FUNCTIONS ***
    //jump check
    jumpCheck() {
        if(!isStuck){
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
        this.player.setVelocityY(-300);
        isJumping = true;
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        if(!isStuck) {
            // only allow the player to jump 100 units above the 
            // height at which the jump was made
            if ((this.player.y > this.jumpStartHeight - 65) &&
                    !this.player.body.blocked.right) {
                isJumping = true;
                this.player.setGravityY(-1500); //negative gravity simulates extending a jump
            } else {
                // else reset the gravity to pull the player to the ground
                isJumping = true;
                this.player.setGravityY(1000);
                this.canHoldJump = false; // disables double jump
            }
        }
    }

    // reset gravity after jump
    postJump() {
        this.canHoldJump = false;
        this.currGravity = 1000;
        this.player.setGravityY(1000);
    }

    // wall jump functionality
    stuckJump() {
        if(Phaser.Input.Keyboard.JustDown(keyW) && isStuck) {
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
            this.player.anims.play('running', true);
        } else if (keyA.isDown) {
            this.player.setVelocityX(-game.settings.playerSpeed);
            this.player.flipX = true;
            this.player.anims.play('running', true);
        } else {
            this.player.anims.play('idle', true);
            this.player.setVelocityX(0);
        }
    }

    handleSight() {
        // J key sight, distorts platforms to red
        if (Phaser.Input.Keyboard.JustDown(keyJ) &&
            !jSight) {
            
            this.visionHud.text = 'J'; // set vision hud to current key press
            this.visionHud2.text = 'J'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if(this.player.x == 77 || this.player.x == 883){
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

            this.visionHud.text = 'K'; // set vision hud to current key press
            this.visionHud2.text = 'K'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if(this.player.x == 77 || this.player.x == 883){
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

            this.visionHud.text = 'L'; // set vision hud to current key press
            this.visionHud2.text = 'L'; // set vision hud to current key press

            // unstick to wall if on an obstacle
            if(this.player.x == 77 || this.player.x == 883){
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
        if(this.player.body.blocked.left && canStick && isJumping){
            this.player.anims.play('stuck', true);
            isStuck = true; //set the global var true
            canStick = false; // make it so you can only stick to another wall after touching down
            this.player.body.velocity.y = 0; // neutralize vertical movement
            this.player.body.velocity.x = 0 // neutralize horizontal movement
            this.player.angle = 0; // set player sprite upright
            this.player.setGravityY(0); // kill gravity
            this.player.flipX = false; // flip players horizontal orientation
        }
    }

    // check for wall jump on right
    wallJumpRight() {
        // Stick to things on the right
        if(this.player.body.blocked.right && canStick && isJumping) {
            this.player.anims.play('stuck', true);
            isStuck = true; //set the global var true
            canStick = false; // make it so you can only stick to another wall after touching down
            this.player.body.velocity.y = 0; // neutralize vertical movement
            this.player.body.velocity.x = 0 // neutralize horizontal movement
            this.player.angle = 0; // set player sprite upright
            this.player.setGravityY(0); // kill gravity
            this.player.flipX = true; // flip players horizontal orientation
        }
    }

    checkPause() {
        if(Phaser.Input.Keyboard.JustDown(keyESC) && 
                !isPaused) {
            console.log("PAUSE");
            isPaused = true;
            this.scene.launch('pauseScene');
            this.scene.pause();
        }
    }

    // *** MAIN UPDATE FUNCTION ***

    update() {
        console.log();

        this.checkPause(); // check if should pause game
    
        //JUMP ---
        this.jumpCheck();

        // Only do while player is not stuck to wall
        if(!isStuck){
            // Horizontal movement
            this.horizontalMovement();

            // ground slam functionality
            this.checkGroundSlam();

            // Spin the player whilst in the air
            if (!this.player.body.blocked.down && !this.isSlamming) {
                this.player.anims.play('jumping', true);
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

        //Check if player and killzone overlap
        this.physics.overlap(this.player, this.killzone)

    }
}