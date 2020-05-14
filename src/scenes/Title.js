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


        // preload sound effects
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');

    }

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width/3, 520, 'player');

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
        let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();
        
        // this.floor = new Floor(this,game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal');

        // set the collision property of player on objects
        this.physics.add.collider(this.player, floor);

    }

    // add all visible and invisible buttons
    addButtons() {
        // Play Button
        this.playButton = this.add.image(centerX, centerY / 2 + 200, 'button_play').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToDefaultLevel());
        this.playButton.setInteractive(); 
        this.playButton.on('pointerover', () => { console.log('pointerover'); }); //on hover

        // Level Select Button
        this.levelsButton = this.add.image(centerX, centerY / 2 + 250, 'button_levels').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.revealLevels());
        this.levelsButton.setInteractive(); 
        this.levelsButton.on('pointerover', () => { console.log('pointerover_levels'); }); //on hover

        // back button
        this.backButton = this.add.image(centerX, centerY / 2 + 325, 'button_back').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.back());
        this.backButton.setInteractive();
        this.backButton.visible = false;
        
        // Test Level Select Button
        this.testLevelButton = this.add.image(centerX, centerY / 2 + 275, 'button_test').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToTestLevel());
        this.testLevelButton.setInteractive();
        this.testLevelButton.visible = false;
        
        // Level 1 button
        this.oneLevelButton = this.add.image(centerX - 200, centerY / 2 + 200, 'button_one').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToLevel1());
        this.oneLevelButton.setInteractive();
        this.oneLevelButton.visible = false;

        // Level 2 button
        this.twoLevelButton = this.add.image(centerX - 100, centerY / 2 + 200, 'button_two_disabled').
            setScale(0.75, 0.75);
        this.twoLevelButton.setInteractive();
        this.twoLevelButton.visible = false;

        // Level 3 button
        this.threeLevelButton = this.add.image(centerX, centerY / 2 + 200, 'button_three_disabled').
            setScale(0.75, 0.75);
        this.threeLevelButton.setInteractive();
        this.threeLevelButton.visible = false;

        // Level 4 button
        this.fourLevelButton = this.add.image(centerX + 100, centerY / 2 + 200, 'button_four_disabled').
            setScale(0.75, 0.75);
        this.fourLevelButton.setInteractive();
        this.fourLevelButton.visible = false;

        // Level 5 button
        this.fiveLevelButton = this.add.image(centerX + 200, centerY / 2 + 200, 'button_five_disabled').
            setScale(0.75, 0.75);
        this.fiveLevelButton.setInteractive();
        this.fiveLevelButton.visible = false;
        
    }

    create() {
        // spawn frozen player
        this.createPlayer();

        // spawn the floor and set it immovable
        this.spawnFloor();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width / 2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // title stuff
        this.add.text(centerX, centerY / 1.5 - 10, 'CyberSplice', {
            fontFamily: 'Consolas', fontSize: '60px'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 40, 'A Matrix-esque Puzzle Platformer\nby Barry Day, Trevor Moropoulos, and Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '20px', align: 'center'
        }).setOrigin(0.5);

        this.addButtons();
    }

    goToDefaultLevel() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start(bestLevel); //change to default scene, rn is test level
    }

    goToTestLevel() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('testScene'); //change to default scene, rn is test level
    }

    goToLevel1() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('level1Scene'); //change to default scene, rn is test level
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
        this.player.anims.play('running', true);

    }
}