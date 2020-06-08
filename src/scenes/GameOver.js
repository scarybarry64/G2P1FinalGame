class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        // preload buttons
        this.load.image('button_resume', './assets/buttons/button_resume.png');
        this.load.image('button_mainmenu', './assets/buttons/button_mainmenu.png');
        this.load.image('button_lastcheckpoint', './assets/buttons/button_lastcheckpoint.png');
        this.load.image('button_restartlevel', './assets/buttons/button_restartlevel.png');
        this.load.image('button_x', './assets/buttons/button_x.png');
        this.load.image('button_yes', './assets/buttons/button_yes.png');
        this.load.image('button_no', './assets/buttons/button_no.png');
        this.load.image('button_graderOff', './assets/buttons/button_grader-difficulty-off.png');
        this.load.image('button_graderOn', './assets/buttons/button_grader-difficulty-on.png');

        // preload sfx
        this.load.audio('sfx_select', './assets/audio/Blip_Select5.wav');
    }

    createButtons() {

        // Restart Checkpoint button
        this.restartCheckpointButton = this.add.image(centerX, centerY - 30, 'button_lastcheckpoint').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.restartFromLastCheckpoint());
        this.restartCheckpointButton.setInteractive();
        this.restartCheckpointButton.visible = true;

        // Restart Level button
        this.restartLevelButton = this.add.image(centerX, centerY + 10, 'button_restartlevel').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.restartLevel());
        this.restartLevelButton.setInteractive();
        this.restartLevelButton.visible = true;

        // main menu button
        this.mainMenuButton = this.add.image(centerX, centerY + 50, 'button_mainmenu').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToMainMenu());
        this.mainMenuButton.setInteractive();
        this.mainMenuButton.visible = true;

        // grader difficulty off button
        this.graderOffButton = this.add.image(centerX, centerY + 90, 'button_graderOff').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.changeDifficulty());
        this.graderOffButton.setInteractive();
        if(graderDifficulty) {
            this.graderOffButton.visible = false;
        } else {
            this.graderOffButton.visible = true;
        }
        

        // grader difficulty on button
        this.graderOnButton = this.add.image(centerX, centerY + 90, 'button_graderOn').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.changeDifficulty());
        this.graderOnButton.setInteractive();
        if(graderDifficulty) {
            this.graderOnButton.visible = true;
        } else {
            this.graderOnButton.visible = false;
        }

        // Yes Button
        this.yesButton = this.add.image(centerX - 40, centerY + 60, 'button_yes').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToYesButton());
        this.yesButton.setInteractive();
        this.yesButton.visible = false;

        // no button
        this.noButton = this.add.image(centerX + 40, centerY + 60, 'button_no').
            setScale(0.5, 0.5).
            on('pointerdown', () => this.goToNoButton());
        this.noButton.setInteractive();
        this.noButton.visible = false;

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

        this.text1 = this.add.text(centerX, centerY - 85, 'Game Over!', {
            fontFamily: 'Consolas', fontSize: '20px', align: 'center'
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

    goToMainMenu() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.stop('level1Scene');
        this.scene.start('titleScene');
        this.scene.setVisible(0);
        localStorage.clear();
    }

    restartLevel() {
        this.yesButton.visible = true;
        this.noButton.visible = true;
        this.restartCheckpointButton.visible = false;
        this.restartLevelButton.visible = false;
        this.mainMenuButton.visible = false;
        this.graderOffButton.visible = false;
        this.graderOnButton.visible = false;
        this.text1.setText('Restart\nentire level?');
    }

    restartFromLastCheckpoint() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.launch('level1Scene');
        this.scene.setVisible(0);

    }

    changeDifficulty() {
        if(graderDifficulty) {
            this.sound.play('sfx_select');
            graderDifficulty = false;
            this.graderOffButton.visible = true;
            this.graderOnButton.visible = false;
        } else {
            this.sound.play('sfx_select');
            graderDifficulty = true;
            this.graderOffButton.visible = false; 
            this.graderOnButton.visible = true;
        }
    }

    goToYesButton() {
        this.sound.play('sfx_select');
        isPaused = false;
        this.scene.launch('level1Scene');
        this.scene.setVisible(0);
        localStorage.clear();
    }

    goToNoButton() {
        this.yesButton.visible = false;
        this.noButton.visible = false;
        this.restartCheckpointButton.visible = true;
        this.restartLevelButton.visible = true;
        this.mainMenuButton.visible = true;

        if(!graderDifficulty) {
            this.sound.play('sfx_select');
            this.graderOffButton.visible = true;
            this.graderOnButton.visible = false;
        } else {
            this.sound.play('sfx_select');
            this.graderOffButton.visible = false; 
            this.graderOnButton.visible = true;
        }
        
        this.text1.setText('Game Over!');
    }

    update(){
        /*
        if(keyR.isDown){
            this.scene.start('titleScene');
        }
        */
    }
}