// Barry Day, Trevor Moropoulos, Lucio Espinoza

// config for game
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },

    scene: [Title, Test],
};

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let isRunning = false;

// settings
game.settings = {
    playerSpeed: 200,
}

// reserve keyboard controls
let keyW, keyA, keyS, keyD, keyJ, keyK, keyL;

