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

        // load tile stuff
        this.load.image('tileset', './assets/tiles/tileset.png');
        this.load.tilemapTiledJSON('tilemap', './assets/tiles/tilemap.json');

        // load backgrounds
        // this.load.image('background', './assets/tiles/background.png');
        // this.load.image('background_1', './assets/tiles/background_1.png');
        // this.load.image('background_2', './assets/tiles/background_2.png');
        // this.load.image('background_3', './assets/tiles/background_3.png');
        // this.load.image('background_4', './assets/tiles/background_4.png');

        this.load.image('background_1', './assets/tiles/background_1_2.png');
        this.load.image('background_2', './assets/tiles/background_2_2.png');
        this.load.image('background_3', './assets/tiles/background_3_2.png');
        this.load.image('background_4', './assets/tiles/background_4_2.png');
        this.load.image('background_5', './assets/tiles/background_5_2.png');

        /*
        // load player sprite
        this.load.image('player', './assets/sprites/hooded_figure_2.png');

        // load player sprite
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        

        // load player color sprites
        this.load.atlas('Glitch_Skyway', './assets/sprites/Player/Skyway/Glitch_Skyway_IdleRunning.png', './assets/sprites/Player/Skyway/Glitch_Skyway_IdleRunning.json');
        this.load.atlas('Glitch_Sunset', './assets/sprites/Player/Sunset/Glitch_Sunset_IdleRunning.png', './assets/sprites/Player/Sunset/Glitch_Sunset_IdleRunning.json');
        this.load.atlas('Glitch_Starfall', './assets/sprites/Player/Starfall/Glitch_Starfall_IdleRunning.png', './assets/sprites/Player/Starfall/Glitch_Starfall_IdleRunning.json');
        */

        // Glitch skyway anims
        this.load.atlas('Glitch_Skyway_Idle', './assets/sprites/Player/Skyway/Idle/Glitch_Skyway_Idle.png', './assets/sprites/Player/Skyway/Idle/Glitch_Skyway_Idle.json');
        this.load.atlas('Glitch_Skyway_Run', './assets/sprites/Player/Skyway/Running/Glitch_Skyway_Running.png', './assets/sprites/Player/Skyway/Running/Glitch_Skyway_Running.json');
        this.load.atlas('Glitch_Skyway_Wall', './assets/sprites/Player/Skyway/Holding/Glitch_Skyway_Holding.png', './assets/sprites/Player/Skyway/Holding/Glitch_Skyway_Holding.json');
        this.load.atlas('Glitch_Skyway_Jumping', './assets/sprites/Player/Skyway/Jumping/Glitch_Skyway_Jumping.png', './assets/sprites/Player/Skyway/Jumping/Glitch_Skyway_Jumping.json');

        // Glitch sunset anims
        this.load.atlas('Glitch_Sunset_Idle', './assets/sprites/Player/Sunset/Idle/Glitch_Sunset_Idle.png', './assets/sprites/Player/Sunset/Idle/Glitch_Sunset_Idle.json');
        this.load.atlas('Glitch_Sunset_Run', './assets/sprites/Player/Sunset/Running/Glitch_Sunset_Running.png', './assets/sprites/Player/Sunset/Running/Glitch_Sunset_Running.json');
        this.load.atlas('Glitch_Sunset_Wall', './assets/sprites/Player/Sunset/Holding/Glitch_Sunset_Holding.png', './assets/sprites/Player/Sunset/Holding/Glitch_Sunset_Holding.json');
        this.load.atlas('Glitch_Sunset_Jumping', './assets/sprites/Player/Sunset/Jumping/Glitch_Sunset_Jumping.png', './assets/sprites/Player/Sunset/Jumping/Glitch_Sunset_Jumping.json');

        // Glitch starfall anims
        this.load.atlas('Glitch_Starfall_Idle', './assets/sprites/Player/Starfall/Idle/Glitch_Starfall_Idle.png', './assets/sprites/Player/Starfall/Idle/Glitch_Starfall_Idle.json');
        this.load.atlas('Glitch_Starfall_Run', './assets/sprites/Player/Starfall/Running/Glitch_Starfall_Running.png', './assets/sprites/Player/Starfall/Running/Glitch_Starfall_Running.json');
        this.load.atlas('Glitch_Starfall_Wall', './assets/sprites/Player/Starfall/Holding/Glitch_Starfall_Holding.png', './assets/sprites/Player/Starfall/Holding/Glitch_Starfall_Holding.json');
        this.load.atlas('Glitch_Starfall_Jumping', './assets/sprites/Player/Starfall/Jumping/Glitch_Starfall_Jumping.png', './assets/sprites/Player/Starfall/Jumping/Glitch_Starfall_Jumping.json');

        // Deadzone anims
        this.load.atlas('Deadzone_Particles', './assets/sprites/deadzone.png', './assets/sprites/deadzone.json');

        // load audio
        this.load.audio('sfx_jump', './assets/audio/Jump19.wav');
        this.load.audio('sfx_slam', './assets/audio/Hit_Hurt39.wav');
        this.load.audio('checkpoint_achieved', './assets/audio/checkpoint_achieved.mp3');
        this.load.audio('electricity_1', './assets/audio/electricity_1.mp3');
        this.load.audio('electricity_2', './assets/audio/electricity_2.mp3');
        this.load.audio('electricity_3', './assets/audio/electricity_3.mp3');

        // load various sprites
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png');
        this.load.image('deadzone', './assets/sprites/deadzone.png');
        this.load.image('checkpoint_off', './assets/sprites/checkpoint_off.png');
        this.load.image('checkpoint_on', './assets/sprites/checkpoint_on.png');

        // loading animation
        this.load.spritesheet('loadAnim', 'assets/sprites/loadingAnim.png', { frameWidth: 8, frameHeight: 8 });

    }

    // *** CREATE FUNCTIONS ***

    // Creates level using tilemap and layers, hide skyway and starfall layers
    createLevel() {

        // Create tile stuff
        this.tilemap = this.add.tilemap('tilemap');
        this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset');

        // Create background layers
        // this.backgroundLayer_1 = this.add.image(0, 0, 'background_1').setOrigin(0, 0);
        // this.backgroundLayer_2 = this.add.image(0, 2294, 'background_2').setOrigin(0, 1);
        // this.backgroundLayer_3 = this.add.image(0, 3176, 'background_3').setOrigin(0, 1);
        // this.backgroundLayer_4 = this.add.image(0, this.tilemap.heightInPixels, 'background_4').setOrigin(0, 1);

        this.backgroundLayer_1 = this.add.image(0, 0, 'background_1').setOrigin(0, 0);
        this.backgroundLayer_2 = this.add.image(0, 0, 'background_2').setOrigin(0, 0);
        this.backgroundLayer_3 = this.add.image(0, 0, 'background_3').setOrigin(0, 0);
        this.backgroundLayer_4 = this.add.image(0, 0, 'background_4').setOrigin(0, 0);
        this.backgroundLayer_5 = this.add.image(0, 0, 'background_5').setOrigin(0, 0);

        // Parallax scrolling
        this.backgroundLayer_1.setScrollFactor(1, 0.40);
        this.backgroundLayer_2.setScrollFactor(1, 0.60);
        this.backgroundLayer_3.setScrollFactor(1, 0.85);
        this.backgroundLayer_4.setScrollFactor(1, 0.80);
        this.backgroundLayer_5.setScrollFactor(1, 0.95);

        // Rest o' the level
        this.buildingLayer = this.tilemap.createStaticLayer('Buildings', this.tileset, 0, 0);
        this.offLayer = this.tilemap.createStaticLayer('Off', this.tileset, 0, 0);
        this.starfallLayer = this.tilemap.createStaticLayer('Starfall', this.tileset, 0, 0);
        this.sunsetLayer = this.tilemap.createStaticLayer('Sunset', this.tileset, 0, 0);
        this.skywayLayer = this.tilemap.createStaticLayer('Skyway', this.tileset, 0, 0);

        // Set only skyway to visible by default
        this.sunsetLayer.alpha = 0;
        this.starfallLayer.alpha = 0;
    }

    createPlayerAnims() {
        // Skyway Run Anim
        this.anims.create({
            key: 'Skyway_Run',
            frames: this.anims.generateFrameNames('Glitch_Skyway_Run'),
            frameRate: 12,
            repeat: -1
        });

        // Sunset Run Anim
        this.anims.create({
            key: 'Sunset_Run',
            frames: this.anims.generateFrameNames('Glitch_Sunset_Run'),
            frameRate: 12,
            repeat: -1
        });

        // Starfall Run Anim
        this.anims.create({
            key: 'Starfall_Run',
            frames: this.anims.generateFrameNames('Glitch_Starfall_Run'),
            frameRate: 12,
            repeat: -1
        });

        // Skyway Idle Anim
        this.anims.create({
            key: 'Skyway_Idle',
            frames: this.anims.generateFrameNames('Glitch_Skyway_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Sunset Idle Anim
        this.anims.create({
            key: 'Sunset_Idle',
            frames: this.anims.generateFrameNames('Glitch_Sunset_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Starfall Idle Anim
        this.anims.create({
            key: 'Starfall_Idle',
            frames: this.anims.generateFrameNames('Glitch_Starfall_Idle', {
                start: 0,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1
        });

        // Skyway Wall Anim
        this.anims.create({
            key: 'Skyway_Wall',
            frames: this.anims.generateFrameNames('Glitch_Skyway_Wall'),
            frameRate: 1,
            repeat: -1
        });

        // Sunset Wall Anim
        this.anims.create({
            key: 'Sunset_Wall',
            frames: this.anims.generateFrameNames('Glitch_Sunset_Wall'),
            frameRate: 1,
            repeat: -1
        });

        // Starfall Wall Anim
        this.anims.create({
            key: 'Starfall_Wall',
            frames: this.anims.generateFrameNames('Glitch_Starfall_Wall'),
            frameRate: 1,
            repeat: -1
        });

        // Skyway Jump Anim
        this.anims.create({
            key: 'Skyway_Jumping',
            frames: this.anims.generateFrameNames('Glitch_Skyway_Jumping'),
            frameRate: 1,
            repeat: -1
        });

        // Sunset Jump Anim
        this.anims.create({
            key: 'Sunset_Jumping',
            frames: this.anims.generateFrameNames('Glitch_Sunset_Jumping'),
            frameRate: 1,
            repeat: -1
        });

        // Starfall Jump Anim
        this.anims.create({
            key: 'Starfall_Jumping',
            frames: this.anims.generateFrameNames('Glitch_Starfall_Jumping'),
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

        this.player = this.physics.add.sprite(this.spawn.x, this.spawn.y - 20, 'Glitch_Skyway_Idle', '0');

        if (tempy != null && tempx != null) {
            this.player.y = Number(tempy);
            this.player.x = Number(tempx);
        }
        this.player.setGravityY(600); // default gravity

        // create the anims necessary for the player
        this.createPlayerAnims();

        this.player.anims.play('Skyway_Idle', true);

        this.player.body.setMaxSpeed(850); // set max speed to keep from collision bug
    }

    // Setup camera to follow player and stop at world bounds
    createCamera() {
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.cameras.roundPixels = true;
    }

    // Set collision between player and layers, disable skyway and starfall by default
    createCollision() {

        // // OLD CODE
        // this.baseLayer.setCollisionByProperty({ collision: true });
        // this.skywayLayer.setCollisionByProperty({ collision: true });
        // this.sunsetLayer.setCollisionByProperty({ collision: true }, false);
        // this.starfallLayer.setCollisionByProperty({ collision: true }, false);
        // this.physics.add.collider(this.player, this.baseLayer);
        // this.physics.add.collider(this.player, this.sunsetLayer);
        // this.physics.add.collider(this.player, this.skywayLayer);
        // this.physics.add.collider(this.player, this.starfallLayer);

        // NEW CODE
        this.buildingLayer.setCollisionByProperty({ collision: true });
        this.skywayLayer.setCollisionByProperty({ collision: true });
        this.sunsetLayer.setCollisionByProperty({ collision: true }, false);
        this.starfallLayer.setCollisionByProperty({ collision: true }, false);

        this.physics.add.collider(this.player, this.buildingLayer);
        this.physics.add.collider(this.player, this.sunsetLayer);
        this.physics.add.collider(this.player, this.skywayLayer);
        this.physics.add.collider(this.player, this.starfallLayer);
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
        // this.deadzone.body.setVelocityY(-3);
        if (tempy != null) {
            this.deadzone.y = Number(tempy) + 480;
        }

        this.moveRate = 16;
        

        //Overlap check, runs GameOver scene if player overlaps with deadzone
        this.physics.world.on('overlap', () => {
            this.scene.start('GameOver');
        });

        // Deadzone animation
        this.anims.create({
            key: 'Deadzone_FX',
            frames: this.anims.generateFrameNames('Deadzone_Particles'),
            frameRate: 6,
            repeat: -1
        });
        //this.deadzone.anims.play('Deadzone_FX', true);
    }

    createCheckpoint() {
        //Find locations flagged for checkpoints
        this.checkpointPos = this.tilemap.filterObjects('Objects', obj => obj.name === 'Checkpoint');

        this.checkpoints = [];

        //Create checkpoint objects at every flagged location
        for (const checkpoint of this.checkpointPos) {
            this.checkpoints.push(new Checkpoint(this, checkpoint.x, checkpoint.y, 'checkpoint_off', 'checkpoint_on', this.player, this.checkpoints, 'checkpoint_achieved'));
            // this.add.image(this.checkpoint.x, this.checkpoint.y)
        }
    }

    loadingScreen() {
        this.Border = new Phaser.Geom.Rectangle(0, this.player.y, 5000, 5000);

        this.rectStyle = this.add.graphics({ fillStyle: { color: 0x000000 } });

        this.rectStyle.fillRectShape(this.Border);
        this.rectStyle.setScale(0.5);

        this.loadingText = this.add.text(this.player.x, this.player.y, 'Loading', {
            fontFamily: 'Consolas', fontSize: '10px', align: 'center'
        }).setOrigin(0.5);

        this.anims.create({
            key: 'load',
            frames: this.anims.generateFrameNumbers('loadAnim'),
            frameRate: 24,
            repeat: -1
        });

        this.loading = this.add.sprite(this.player.x + 28, this.player.y - 3, 'loadAnim').setScale(2);

        this.loading.anims.play('load');
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

        // this.checkpoint1 = this.add.image(centerX - 150, centerY + 168, 'checkpoint_off');

        this.timer = 0;

        this.loadingScreen();

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
        this.player.setVelocityY(-150);
        isJumping = true;
    }

    // This makes it possible to hold your jump to increase height
    holdJump() {
        if (!isStuck) {
            // only allow the player to jump 100 units above the 
            // height at which the jump was made
            if ((this.player.y > this.jumpStartHeight - 23) &&
                !this.player.body.blocked.right) {
                if (kSight) {
                    this.player.anims.play('Sunset_Jumping', true);
                } else if (lSight) {
                    this.player.anims.play('Starfall_Jumping', true);
                } else {
                    this.player.anims.play('Skyway_Jumping', true);
                }
                isJumping = true;
                this.player.setGravityY(-900); //negative gravity simulates extending a jump
            } else {
                if (kSight) {
                    this.player.anims.play('Sunset_Jumping', true);
                } else if (lSight) {
                    this.player.anims.play('Starfall_Jumping', true);
                } else {
                    this.player.anims.play('Skyway_Jumping', true);
                }
                // else reset the gravity to pull the player to the ground
                isJumping = true;
                this.player.setGravityY(600);
                this.canHoldJump = false; // disables double jump
            }
        }
    }

    // reset gravity after jump
    postJump() {
        if (kSight) {
            this.player.anims.play('Sunset_Jumping', true);
        } else if (lSight) {
            this.player.anims.play('Starfall_Jumping', true);
        } else {
            this.player.anims.play('Skyway_Jumping', true);
        }
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
        this.player.setVelocityY(200);
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
            // this.sound.play('sfx_slam');
        }
    }

    horizontalMovement() {
        if (keyD.isDown) {
            isMoving = true;
            this.player.setVelocityX(game.settings.playerSpeed);
            game.settings.playerSpeed = 100;
            this.player.flipX = false;
            if (kSight && !isJumping) {
                this.player.anims.play('Sunset_Run', true);
            } else if (lSight && !isJumping) {
                this.player.anims.play('Starfall_Run', true);
            } else if (jSight && !isJumping) {
                this.player.anims.play('Skyway_Run', true);
            }
        } else if (keyA.isDown) {
            isMoving = true;
            this.player.setVelocityX(-game.settings.playerSpeed);
            game.settings.playerSpeed = 100;
            this.player.flipX = true;
            if (kSight && !isJumping) {
                this.player.anims.play('Sunset_Run', true);
            } else if (lSight && !isJumping) {
                this.player.anims.play('Starfall_Run', true);
            } else if (jSight && !isJumping) {
                this.player.anims.play('Skyway_Run', true);
            }
        } else if (!keyD.isDown && !keyA.isDown && !isJumping) {
            isMoving = false;
            if (kSight && !isJumping) {
                this.player.anims.play('Sunset_Idle', true);
            } else if (lSight && !isJumping) {
                this.player.anims.play('Starfall_Idle', true);
            } else if (jSight && !isJumping) {
                this.player.anims.play('Skyway_Idle', true);
            }

            this.player.setVelocityX(0);
        } else {
            if (!this.player.flipX && game.settings.playerSpeed > 2 && canStick && isMoving) {
                this.player.setVelocityX((game.settings.playerSpeed = game.settings.playerSpeed - 3));
            } else if (this.player.flipX && game.settings.playerSpeed > 0 && canStick && isMoving) {
                this.player.setVelocityX(-(game.settings.playerSpeed = game.settings.playerSpeed - 3));
            } else {
                game.settings.playerSpeed = 100;
            }

        }
    }

    handleSight() {
        // J key sight, distorts platforms to sunset
        if (Phaser.Input.Keyboard.JustDown(keyJ) &&
            !jSight) {
            
            this.sound.play('electricity_1');

            // unstick to wall if on an obstacle
            if (this.player.x == 24 || this.player.x == 456) {
                this.player.anims.play('Skyway_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(600);
            }

            jSight = true;
            kSight = false;
            lSight = false;

            // Enable sunset layer, disable skyway and starfall layers
            this.sunsetLayer.alpha = 0;
            this.skywayLayer.alpha = 1;
            this.starfallLayer.alpha = 0;
            this.skywayLayer.setCollisionByProperty({ collision: true });
            this.sunsetLayer.setCollisionByProperty({ collision: true }, false);
            this.starfallLayer.setCollisionByProperty({ collision: true }, false);
        }

        // K key sight, distorts platforms to skyway
        if (Phaser.Input.Keyboard.JustDown(keyK) &&
            !kSight) {

            this.sound.play('electricity_2');
            // unstick to wall if on an obstacle
            if (this.player.x == 24 || this.player.x == 456) {
                this.player.anims.play('Sunset_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(600);
            }

            kSight = true;
            jSight = false;
            lSight = false;

            // Enable skyway layer, disable sunset and starfall layers
            this.sunsetLayer.alpha = 1;
            this.skywayLayer.alpha = 0;
            this.starfallLayer.alpha = 0;
            this.skywayLayer.setCollisionByProperty({ collision: true }, false);
            this.sunsetLayer.setCollisionByProperty({ collision: true });
            this.starfallLayer.setCollisionByProperty({ collision: true }, false);
        }

        // L key sight, distorts platforms to starfall
        if (Phaser.Input.Keyboard.JustDown(keyL) &&
            !lSight) {

            this.sound.play('electricity_3');
            // unstick to wall if on an obstacle
            if (this.player.x == 24 || this.player.x == 456) {
                this.player.anims.play('Starfall_Wall', true);
                // do not unstick
            } else {
                //console.log("UNSTICK");
                this.isStuck = false;
                this.player.setGravityY(600);
            }

            lSight = true;
            jSight = false;
            kSight = false;

            // Enable starfall layer, disable skyway and sunset layers
            this.sunsetLayer.alpha = 0;
            this.skywayLayer.alpha = 0;
            this.starfallLayer.alpha = 1;
            this.sunsetLayer.setCollisionByProperty({ collision: true }, false);
            this.skywayLayer.setCollisionByProperty({ collision: true }, false);
            this.starfallLayer.setCollisionByProperty({ collision: true });
        }
    }

    // check for wall jump on left
    wallJumpLeft() {
        //Stick to things on the left
        if ((this.player.body.blocked.left && canStick && isJumping) || (this.player.body.blocked.left && canStickLeft && isJumping)) {
            if (kSight) {
                this.player.anims.play('Sunset_Wall', true);
            } else if (lSight) {
                this.player.anims.play('Starfall_Wall', true);
            } else {
                this.player.anims.play('Skyway_Wall', true);
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
        if ((this.player.body.blocked.right && canStick && isJumping) || (this.player.body.blocked.right && canStickRight && isJumping)) {
            if (kSight) {
                this.player.anims.play('Sunset_Wall', true);
            } else if (lSight) {
                this.player.anims.play('Starfall_Wall', true);
            } else {
                this.player.anims.play('Skyway_Wall', true);
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
            // console.log("PAUSE");
            isPaused = true;
            this.scene.start('pauseScene');
            this.scene.pause();
        }
    }


    // *** MAIN UPDATE FUNCTION ***

    update() {
        this.moveMod = 1;

        for(let x = 0; x < this.checkpoints.length; x++){
            if(!this.checkpoints[x].checkpointSet){
                this.moveMod += Math.floor(x/2);
                break;
            }
        }

        if (isLoading) {
            loadCount++;
            if (loadCount > 200) {
                isLoading = false;
            }
        } else {

           

            // Sight
            this.handleSight();

            if(this.player.x > 342 && this.player.x < 470) {
                if(this.player.y > 125) {
                    this.scene.start('GameWin');
                }
            }

            if(isJumping && jSight) {
                this.player.anims.play('Skyway_Jumping', true);

            } else if(isJumping && kSight) {
                this.player.anims.play('Sunset_Jumping', true);

            } else if(isJumping && lSight) {
                this.player.anims.play('Starfall_Jumping', true);

            }

            this.rectStyle.destroy();
            this.loadingText.destroy();
            this.loading.destroy();

            this.timer++;

            if (this.timer % 50 == 0) {
                this.deadzone.y = this.deadzone.y - (this.moveRate * this.moveMod);
                // console.log(this.moveMod);
                this.deadzone.anims.play('Deadzone_FX', true);
            }



            // this.checkPause(); // check if should pause game

            //JUMP ---
            this.jumpCheck();

            // Only do while player is not stuck to wall
            if (!isStuck && !isLoading) {
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

            if (Phaser.Input.Keyboard.JustDown(keyS) && isStuck) {
                isStuck = false;
                this.player.setGravityY(600);
            }

            this.wallJumpLeft();

            this.wallJumpRight();

            // reset the player sprite and angle when back on the ground
            if (this.player.body.blocked.down) {
                isJumping = false;
                canStick = true;
                this.resetPlayerAngle();
            }

            if (this.player.body.blocked.left) {
                canStickRight = true;
                canStickLeft = false;
            }

            if (this.player.body.blocked.right) {
                canStickRight = false;
                canStickLeft = true;
            }

            //Check if player and deadzone overlap
            this.physics.overlap(this.player, this.deadzone)

            //Check if the player has made contact with any checkpoint objects
            for (const checkpoint of this.checkpoints) {
                checkpoint.update();
            }
        }
    }
}