class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create(){
        this.add.text(centerX, centerY / 1.5 - 10, 'Game Over!', {
            fontFamily: 'Consolas', fontSize: '60px'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 40, 'Press \'R\' to go back to the main menu', {
            fontFamily: 'Consolas', fontSize: '60px'
        }).setOrigin(0.5);
    }
}