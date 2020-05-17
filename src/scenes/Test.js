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
        this.load.image('killzone', './assets/sprites/green_rectangle.png');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');
    }

    // *** CREATE FUNCTIONS ***

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width / 3, 520, 'player', 'Glitch_Running_01');
        // this.player.setVelocityY(-500); // initial jump off title screen platform
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

    // spawn the walls on the sides of the screen
    spawnWalls() {
        this.wall1 = this.physics.add.sprite(-40, 175, 'bounds_terminal').
            setScale(0.5, 4);
        this.wall1.setImmovable();

        this.wall2 = this.physics.add.sprite(game.config.width + 40, 175, 'bounds_terminal').
            setScale(0.5, 4);
        this.wall2.setImmovable();
    }

    // Handle wall jump and wall collision
    wallCollision() {
        // Left wall collision
        this.physics.add.collider(this.player, this.wall1, function(player, wall){
            if(canStick && !player.body.touching.down){
                console.log("STUCK");
                isStuck = true; //set the global var true
                canStick = false; // make it so you can only stick to another wall after touching down
                player.angle = 0; // set player sprite upright
                player.setGravityY(0); // kill gravity
                player.body.velocity.y = 0; // neutralize vertical movement
                player.body.velocity.x = 0 // neutralize horizontal movement
                player.flipX = false; // flip players horizontal orientation
            }
        });

        // Right wall collision
        this.physics.add.collider(this.player, this.wall2, function(player, wall){
            if(canStick && !player.body.touching.down){
                isStuck = true; //set the global var true
                canStick = false; // make it so you can only stick to another wall after touching down
                player.angle = 0; // set player sprite upright
                player.setGravityY(0); // kill gravity
                player.body.velocity.y = 0; // neutralize vertical movement
                player.body.velocity.x = 0 // neutralize horizontal movement
                player.flipX = true; // flip players horizontal orientation
            }
        });
    }

    spawnFloor() {
        let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // set the collision property of player on objects
        this.physics.add.collider(this.player, floor);

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

    spawnKillzone(){
        this.killzone = this.physics.add.sprite(0, game.config.height, 'killzone').setScale(1);
        this.killzone.body.onOverlap = true;
        this.killzone.body.setVelocityY(-10);
    }

    configureCamera(){
        this.cameras.main.setBounds(0,0, game.config.width, game.config.height);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player, true);
    }

    // *** MAIN CREATE FUNCTION ***
    create() {

        // CREATE THE PLAYER
        this.createPlayer();

        // spawn the left wall
        this.spawnWalls();

        // spawn the floor and set it immovable
        this.spawnFloor();

        // create movement controls
        this.createControls();

        // create and initialize variables
        this.createVariables();

        // THIS HOLDS WALL JUMP FUNCTION
        this.wallCollision();

        this.spawnKillzone();
        this.physics.world.on('overlap', ()=>{
            console.log("player hit in test");
        });

        // centers camera and follows player
        this.configureCamera();
        
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
            if(!isStuck) { 
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
        }

        // reset gravity after jump
        postJump() {
            // only reset if player is not stuck on wall
            if(!isStuck){
                this.canHoldJump = false;
                this.currGravity = 1000;
                this.player.setGravityY(1000);
            }
        }

        // wall jump functionality
        stuckJump() {
            if(Phaser.Input.Keyboard.JustDown(keyW) && isStuck) {
                isRunning = false;
                this.player.anims.play('jumping', true);
                this.jumpStartHeight = this.player.y;
                this.canHoldJump = true;
                this.sound.play('sfx_jump');
                this.startJump();
                isStuck = false;

            }

            // this causes the players jump to be longer if held down
            if (keyW.isDown && this.canHoldJump) {
                isRunning = false;
                this.player.anims.play('jumping', true);
                this.holdJump();
            }
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
        if(!this.player.flipX) {
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
            if(keyD.isDown) {
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
            // J key sight
            if (Phaser.Input.Keyboard.JustDown(keyJ) &&
            !jSight) {
                console.log("J SIGHT");
                jSight = true;
                kSight = false;
                lSight = false;
            }

        // K key sight
        if (Phaser.Input.Keyboard.JustDown(keyK) &&
            !kSight) {
                console.log("K SIGHT");
                kSight = true;
                jSight = false;
                lSight = false;

        }

        // L key sight
        if (Phaser.Input.Keyboard.JustDown(keyL) &&
            !lSight) {
                console.log("L SIGHT");
                lSight = true;
                jSight = false;
                kSight = false;
        }
        }



    // *** MAIN UPDATE FUNCTION ***

    update() {

        //JUMP ---
        this.jumpCheck();

        // Only do while player is not stuck to wall
        if(!isStuck){
            // Horizontal movement
            this.horizontalMovement();

            // ground slam functionality
            this.checkGroundSlam();

            // Spin the player whilst in the air
            if (!this.player.body.touching.down && !this.isSlamming) {
                this.spinPlayer();
            }
        }

        // reset the player sprite and angle when back on the ground
        if (this.player.body.touching.down) {
            canStick = true;
            this.resetPlayerAngle();
        }

        // Input to change sight mode
        this.handleSight();

        //this.killzone.setScale(this.killzone.height + 1, this.killzone.width);
        console.log(this.killzone.height);
        this.physics.overlap(this.player, this.killzone);
        
    }
}