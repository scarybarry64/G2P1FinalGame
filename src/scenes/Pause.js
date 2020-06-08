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

    createButtons() {

        this.resumeButton = this.add.image(centerX, centerY - 30, 'button_resume').
        setScale(0.5, 0.5).
        on('pointerdown', () => this.resume());
        this.resumeButton.setInteractive();
        this.resumeButton.visible = true;

        // Restart Checkpoint button
        this.restartCheckpointButton = this.add.image(centerX, centerY + 10, 'button_lastcheckpoint').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.restartFromLastCheckpoint());
        this.restartCheckpointButton.setInteractive();
        this.restartCheckpointButton.visible = true;

        // Restart Level button
        this.restartLevelButton = this.add.image(centerX, centerY + 50, 'button_restartlevel').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.restartLevel());
        this.restartLevelButton.setInteractive();
        this.restartLevelButton.visible = true;

        // main menu button
        this.mainMenuButton = this.add.image(centerX, centerY + 90, 'button_mainmenu').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToMainMenu());
        this.mainMenuButton.setInteractive();
        this.mainMenuButton.visible = true;

    }

    createBorder() {
        var Border2 = new Phaser.Geom.Rectangle(centerX - 20, centerY - 95, 520, 520);

        var rectStyle2 = this.add.graphics({ fillStyle: { color: 0x1B2631 } });

        rectStyle2.fillRectShape(Border2);

        rectStyle2.setScale(0.5);


        var Border = new Phaser.Geom.Rectangle(centerX - 10, centerY - 85, 500, 500);

        var rectStyle = this.add.graphics({ fillStyle: { color: 0x34495E  } });

        rectStyle.fillRectShape(Border);
        rectStyle.setScale(0.5);

        this.add.text(centerX, centerY - 85, 'Game Paused', {
            fontFamily: 'Consolas', fontSize: '25px', align: 'center'
        }).setOrigin(0.5);
    }

    create(){
        /*
        this.add.text(centerX, centerY / 1.5 - 10, 'Game Over!', {
            fontFamily: 'Consolas', fontSize: '40px'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 40, 'Press \'R\' to go back to the main menu', {
            fontFamily: 'Consolas', fontSize: '40px'
        }).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        */

        this.createBorder();

        this.createButtons();

    }

    resume() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.resume('level1Scene');
        this.scene.stop();
        this.scene.setVisible(0);
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

    }

    update(){
        /*
        if(keyR.isDown){
            this.scene.start('titleScene');
        }
        */
    }
}