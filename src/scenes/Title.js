class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // preload images
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
        this.load.image('button_play', './assets/buttons/button_play.png');
        this.load.image('button_levels', './assets/buttons/button_levels.png'); 

        // preload sound effects
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');

    }

    createPlayer() {
        this.player = this.physics.add.sprite(game.config.width/3, 520, 'player', 'Glitch_Running_01');

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

        // Play Button
        const playButton = this.add.image(centerX, centerY / 2 + 200, 'button_play').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToDefaultLevel());
        playButton.setInteractive(); 
        playButton.on('pointerover', () => { console.log('pointerover'); }); //on hover

        // Level Select Button
        const levelsButton = this.add.image(centerX, centerY / 2 + 250, 'button_levels').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToDefaultLevel());
        levelsButton.setInteractive(); 
        levelsButton.on('pointerover', () => { console.log('pointerover_levels'); }); //on hover
        
    }

    goToDefaultLevel() {
        // initialTime = this.time.now;
        this.sound.play('sfx_select');
        this.scene.start('testScene'); //change to default scene, rn is test level
    }

    update() {
        this.player.anims.play('running', true);

    }
}