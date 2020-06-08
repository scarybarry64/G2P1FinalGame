class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {
        this.load.image('button_mainmenu', './assets/buttons/button_mainmenu.png');
    }

    create() {

        this.add.text(centerX, centerY - 100, 'Credits', {
            fontFamily: 'Consolas', fontSize: '25px', align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 55, 'Art..............Barry Day\nProgramming......Trevor Moropoulos\nProgramming......Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '12px', align: 'left'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'University of California Santa Cruz\nCMPS/ARTG 120 Spring 2020', {
            fontFamily: 'Consolas', fontSize: '12px', align: 'center'
        }).setOrigin(0.5);

        // main menu button
        this.mainMenuButton = this.add.image(centerX, centerY + 80, 'button_mainmenu').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToMainMenu());
        this.mainMenuButton.setInteractive();
        this.mainMenuButton.visible = true;
    }

    goToMainMenu() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.stop('level1Scene');
        this.scene.start('titleScene');
        this.scene.setVisible(0);
        localStorage.clear();
    }

    update() {

    }
}