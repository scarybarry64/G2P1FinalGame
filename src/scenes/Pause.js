class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }

    preload() {
        // preload buttons
        this.load.image('button_resume', './assets/buttons/button_resume.png');
        this.load.image('button_mainmenu', './assets/buttons/button_mainmenu.png');
        this.load.image('button_lastcheckpoint', './assets/buttons/button_lastcheckpoint.png');
        this.load.image('button_restartlevel', './assets/buttons/button_restartlevel.png');
        this.load.image('button_x', './assets/buttons/button_x.png');

        // preload sfx
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');
    }

    createBox() {
        var Border2 = new Phaser.Geom.Rectangle(centerX - 260, centerY - 260, 520, 520);

        var rectStyle2 = this.add.graphics({ fillStyle: { color: 0x1B2631 } });

        rectStyle2.fillRectShape(Border2);


        var Border = new Phaser.Geom.Rectangle(centerX - 250, centerY - 250, 500, 500);

        var rectStyle = this.add.graphics({ fillStyle: { color: 0x34495E  } });

        rectStyle.fillRectShape(Border);

        this.add.text(centerX, 165, 'Game is paused', {
            fontFamily: 'Consolas', fontSize: '30px', align: 'center'
        }).setOrigin(0.5);
    }

    createButtons() {
        // Resume button
        this.backButton = this.add.image(centerX, centerY / 2 + 100, 'button_resume').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goBack());
        this.backButton.setInteractive();
        this.backButton.visible = true;

        // Restart Checkpoint button
        this.restartCheckpointButton = this.add.image(centerX, centerY / 2 + 175, 'button_lastcheckpoint').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.restartFromLastCheckpoint());
        this.restartCheckpointButton.setInteractive();
        this.restartCheckpointButton.visible = true;

        // Restart Level button
        this.restartLevelButton = this.add.image(centerX, centerY / 2 + 250, 'button_restartlevel').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.restartLevel());
        this.restartLevelButton.setInteractive();
        this.restartLevelButton.visible = true;

        // main menu button
        this.mainMenuButton = this.add.image(centerX, centerY / 2 + 325, 'button_mainmenu').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goToMainMenu());
        this.mainMenuButton.setInteractive();
        this.mainMenuButton.visible = true;

        // x button
        this.backButton = this.add.image(centerX + 220, 100, 'button_x').
            setScale(0.75, 0.75).
            on('pointerdown', () => this.goBack());
        this.backButton.setInteractive();
        this.backButton.visible = true;
    }

    

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.createBox();

        this.createButtons();
        
    }

    goBack() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.resume('level1Scene');
        this.scene.setVisible(0);
        //this.scene.stop();
        //this.scene.remove('pauseScene');
    }

    goToMainMenu() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.stop('level1Scene');
        this.scene.start('titleScene');
        this.scene.setVisible(0);
        localStorage.clear();
    }

    restartLevel() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.launch('level1Scene');
        this.scene.setVisible(0);
        localStorage.clear();
    }

    restartFromLastCheckpoint() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.launch('level1Scene');
        this.scene.setVisible(0);
        // no functionality currently
    }

    update() {

    }
}