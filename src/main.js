// Barry Day, Trevor Moropoulos, Lucio Espinoza

// config for game
let config = {
    type: Phaser.CANVAS,
    width: 480, // 480
    height: 320, // 320
    zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    //pixelArt: true,
    antialias: false,
    scene: [Title, Test, Tutorial, Level_1, Pause, GameOver],
};

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let isRunning = false;
let bestLevel = 'level1Scene';
let currLevel = 'level1Scene';
let jSight = true; // the first sight initially on
let kSight = false;
let lSight = false;
let isStuck = false;
let canStick = true;
let isJumping = false;
let isPaused = false;
let isLoading = true;
let loadCount = 0;
let canStickRight = false;
let canStickLeft = false;
let ease = false;

// settings
game.settings = {
    playerSpeed: 100,
}

// reserve keyboard controls
let keyW, keyA, keyS, keyD, keyJ, keyK, keyL, keyESC, keyR;

