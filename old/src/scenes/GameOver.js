// Game over screen
class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        // load the necessary images and tile sprites
        this.load.image('bounds', './assets/sprites/bounds.png'); //placeholder
        this.load.image('obstacle', './assets/sprites/obstacle.png'); //placeholder
        this.load.image('obstacle_terminal', './assets/sprites/obstacle_terminal.png'); //placeholder terminal
        this.load.image('bounds_terminal', './assets/sprites/bounds_terminal.png'); //placeholder terminal
    
        // load audio
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');

    }

    create() {
        // handle high score
        // check if local storage is supported in the brower
        if(window.localStorage){
            console.log("Supports Browser Storage");
            var locScore = JSON.parse(localStorage.getItem('highscore')); //parse the string
            if(!locScore){
                this.updateScore(); //update the local storage
            }
            if(game.settings.highScore > locScore) { // if a new high score should be reported
                this.updateScore(); //update the local storage
            }
            // add the high score text
            this.add.text(centerX, centerY+5, "This browser's high score: " + locScore, {
                fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
                }).setOrigin(0.5);
        // ELSE if local storage is not supported
        } else {
            console.log("Does not support Brower Storage");
            // Just add the current session high score to the screen
            this.add.text(centerX, centerY+5, 'Current session high score: ' + game.settings.highScore, {
                fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
            }).setOrigin(0.5);
        }
        

        // spawn the floor and set it immovable
        let floor = this.physics.add.sprite(game.config.width/2, game.config.width/2 + 110, 'bounds_terminal').
            setScale(4, 0.5);
        floor.setImmovable();

        // spawn the roof and set it immovable
        let roof = this.physics.add.sprite(game.config.width/2, 40, 'bounds_terminal').
            setScale(4, 0.5);
        roof.setImmovable();

        // game over text
        this.add.text(centerX, centerY-50, 'GAME OVER', {
            fontFamily: 'Consolas', fontSize: '48px', color: primaryColor
        }).setOrigin(0.5);
        
        this.add.text(centerX, game.config.height - 50, 'Press DOWN ARROW for Main Menu', {
            fontFamily: 'Consolas', fontSize: '24px', color: primaryColor
        }).setOrigin(0.5);

        // set up cursor keys
        controls = this.input.keyboard.createCursorKeys();
        
    }

    updateScore() {
        localStorage.setItem('highscore', game.settings.highScore);
    }

    update() {
        // check for DOWN input
        if (Phaser.Input.Keyboard.JustDown(controls.down)) {
            this.sound.play('sfx_select');
            this.scene.start('titleScene');
        }
    }
}