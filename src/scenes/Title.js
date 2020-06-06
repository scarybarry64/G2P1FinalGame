class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // preload images
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal

        // preload buttons
        this.load.image('button_play', './assets/buttons/button_play.png');
        this.load.image('button_tutorial', './assets/buttons/button_tutorial.png');
        this.load.image('button_levels', './assets/buttons/button_levels.png');
        this.load.image('button_back', './assets/buttons/button_back.png');
        this.load.image('button_test', './assets/buttons/button_test.png');
        this.load.image('button_one', './assets/buttons/button_1.png');
        this.load.image('button_two', './assets/buttons/button_2.png');
        this.load.image('button_three', './assets/buttons/button_3.png');
        this.load.image('button_four', './assets/buttons/button_4.png');
        this.load.image('button_five', './assets/buttons/button_5.png');
        this.load.image('button_five_disabled', './assets/buttons/button_5_disabled.png');
        this.load.image('button_four_disabled', './assets/buttons/button_4_disabled.png');
        this.load.image('button_three_disabled', './assets/buttons/button_3_disabled.png');
        this.load.image('button_two_disabled', './assets/buttons/button_2_disabled.png');

        // preload text images
        this.load.image('title_purple', './assets/text/title_purple.png');
        this.load.image('title_blue', './assets/text/title_blue.png');
        this.load.image('title_red', './assets/text/title_red.png');
        this.load.image('title_yellow', './assets/text/title_yellow.png');
        this.load.image('skyway_1', './assets/text/logo_skyway_1.png');
        this.load.image('sunset_1', './assets/text/logo_sunset_1.png');
        this.load.image('starfall_1', './assets/text/logo_starfall_1.png');
        this.load.image('skyway_2', './assets/text/logo_skyway_2.png');
        this.load.image('sunset_2', './assets/text/logo_sunset_2.png');
        this.load.image('starfall_2', './assets/text/logo_starfall_2.png');


        // preload sound effects
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');

        this.load.audio('music', './assets/audio/CyberPunk.wav');

    }

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width / 2, 365, 'Glitch');

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

        //ANIMATION 
        this.anims.create(playerRunAnimConfig);
    }

    spawnFloor() {
        // let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 76, 'bounds_terminal').
           // setScale(2, 0.25);
        // floor.setImmovable();
        
        // this.floor = new Floor(this,game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal');

        // set the collision property of player on objects
        // this.physics.add.collider(this.player, floor);

    }

    // add all visible and invisible buttons
    addButtons() {
        // Play Button (goes to tutorial first)
        this.playButton = this.add.image(centerX, centerY / 2 + 130, 'button_play').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToLevel1());
        this.playButton.setInteractive(); 
        this.playButton.on('pointerover', () => { }); //on hover

        this.levelsButton = this.add.image(centerX, centerY / 2 + 170, 'button_tutorial').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToTutorial());
        this.levelsButton.setInteractive(); 

        
    }

    create() {
        
        var musicConfig = {
            mute: false,
            volume: 0.05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        game.music = this.sound.add('music');
        game.music.play(musicConfig);
        

        // spawn frozen player
        this.createPlayer();

        // spawn the floor and set it immovable
        this.spawnFloor();

        // spawn the roof and set it immovable
        // let roof = this.physics.add.sprite(game.config.width / 2, 4, 'bounds_terminal').
           //  setScale(2, 0.25);
        // roof.setImmovable();

        // title stuff
        // this.add.text(centerX, centerY / 1.5 - 10, 'Nightsight', {
           // fontFamily: 'Consolas', fontSize: '30px'
        // }).setOrigin(0.5);
        this.add.text(centerX, centerY - 20, 'A Matrix-esque Puzzle Platformer\nby Barry Day, Trevor Moropoulos, and Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '10px', align: 'center'
        }).setOrigin(0.5);

        this.title = this.add.image(centerX, centerY - 80, 'skyway_1');

        this.color = 0; // 0 = blue, 1 = red, 2 = yellow

        this.addButtons();

        this.timer = 0;
    }

    goToTutorial() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('tutorialScene'); //change to default scene, rn is tutorial level
    }

    goToTestLevel() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('testScene'); //change to default scene, rn is test level
    }

    goToLevel1() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('level1Scene'); // goes to tutorial first
        localStorage.clear();
    }

    back() {
        // set buttons invisible
        this.playButton.visible = true;
        this.levelsButton.visible = true;

        //set buttons not interactive
        this.playButton.setInteractive = true;
        this.levelsButton.setInteractive = true;

        // set levels visible
        this.testLevelButton.visible = false;
        this.testLevelButton.setInteractive = false; 

        this.oneLevelButton.visible = false;
        this.oneLevelButton.setInteractive = false; 

        this.twoLevelButton.visible = false;
        this.twoLevelButton.setInteractive = false; 

        this.threeLevelButton.visible = false;
        this.threeLevelButton.setInteractive = false; 

        this.fourLevelButton.visible = false;
        this.fourLevelButton.setInteractive = false; 

        this.fiveLevelButton.visible = false;
        this.fiveLevelButton.setInteractive = false; 

        this.backButton.visible = false;
        this.backButton.setInteractive = false;
    }

    revealLevels() {
        // set buttons invisible
        this.playButton.visible = false;
        this.levelsButton.visible = false;

        //set buttons not interactive
        this.playButton.setInteractive = false;
        this.levelsButton.setInteractive = false;

        // set levels visible
        this.testLevelButton.visible = true;
        this.testLevelButton.setInteractive = true; 

        this.oneLevelButton.visible = true;
        this.oneLevelButton.setInteractive = true; 

        this.twoLevelButton.visible = true;
        this.twoLevelButton.setInteractive = true; 

        this.threeLevelButton.visible = true;
        this.threeLevelButton.setInteractive = true; 

        this.fourLevelButton.visible = true;
        this.fourLevelButton.setInteractive = true; 

        this.fiveLevelButton.visible = true;
        this.fiveLevelButton.setInteractive = true; 

        this.backButton.visible = true;
        this.backButton.setInteractive = true; 
    }

    update() {
        this.timer++;

        if((this.timer % 200) == 0) {
            if(this.color == 0) {
                this.title.setTexture('sunset_1');
                this.color = 1;
            } else if(this.color == 1) {
                this.title.setTexture('starfall_1');
                this.color = 2;
            } else if(this.color == 2) {
                this.title.setTexture('skyway_2');
                this.color = 3;
            } else if(this.color == 3) {
                this.title.setTexture('sunset_2');
                this.color = 4;
            } else if(this.color == 4) {
                this.title.setTexture('starfall_2');
                this.color = 5;
            } else if(this.color == 5) {
                this.title.setTexture('skyway_1');
                this.color = 0;
            }
        }
        // this.player.anims.play('running', true);

    }
}