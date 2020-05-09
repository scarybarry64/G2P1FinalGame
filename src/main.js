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

    scene: [Test],
};

// define game
let game = new Phaser.Game(config);

// settings
game.settings = {
    playerSpeed: 100,
}

// reserve keyboard controls
let keyW, keyA, keyS, keyD, keyJ, keyK, keyL;