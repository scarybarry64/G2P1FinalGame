class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.atlas('Glitch', './assets/sprites/Glitch.png', './assets/sprites/Glitch.json');
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
    }

    create() {
        // spawn frozen player
        this.player = this.physics.add.sprite(game.config.width / 3, 520, 'Glitch', 'Glitch_Running_01');
        this.player.setGravityY(0);

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width / 2, game.config.width / 2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

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

        // Message to start
        this.add.text(centerX, game.config.height - 70, 'W to START', {
            fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
        }).setOrigin(0.5);
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(controls.up)) {
            initialTime = this.time.now;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}