class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        this.add.text(centerX, centerY - 85, 'Credits', {
            fontFamily: 'Consolas', fontSize: '25px', align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 85, 'Art by Barry Day\nPrograming by Trevor Moropoulos and Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '20px', align: 'left'
        }).setOrigin(0.5);
    }
}