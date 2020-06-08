class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {
        this.load.image('button_mainmenu', './assets/buttons/button_mainmenu.png');
    }

    create() {
        var Border2 = new Phaser.Geom.Rectangle(centerX - 20, centerY - 95, 520, 520);

        var rectStyle2 = this.add.graphics({ fillStyle: { color: 0x1B2631 } });

        rectStyle2.fillRectShape(Border2);

        rectStyle2.setScale(0.5);

        this.add.text(centerX, centerY - 85, 'Credits', {
            fontFamily: 'Consolas', fontSize: '25px', align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 85, 'Art by Barry Day\nPrograming by Trevor Moropoulos and Lucio Espinoza', {
            fontFamily: 'Consolas', fontSize: '20px', align: 'left'
        }).setOrigin(0.5);

        // main menu button
        this.mainMenuButton = this.add.image(centerX, centerY + 70, 'button_mainmenu').
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
}