// Simple tutorial scene which guides the player through the basics
class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {

        // Keeps track of tutorial progress
        this.progress = 0;

        // Create buttons
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Create first tutorial message
        this.message = this.add.text(centerX, centerY,
            'Use the WASD buttons to move in 4 directions (W jumps).\nJump next to a wall/platform to wall-jump.\n' +
            'Press S while jumping to ground slam.\n\n\n\n\n' +
            '(Press C to continue or S to skip the tutorial . . .)',
            { fontFamily: 'Consolas', fontSize: '10px', align: 'center' }).setOrigin(0.5);

    }


    doTutorial() {

        // Pressing C continues the tutorial, pressing S skips it
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.scene.start('level1Scene');
        }
        else if (Phaser.Input.Keyboard.JustDown(this.keyC)) {

            if (this.progress == 0) {
                this.progress = 1;
                this.message.text = 'Use the JKL buttons to activate and deactivate neon signs.\n This changes most platforms.\n' +
                '"J" turns on the Skyway signs,\n "K" illuminates the Sunset signs,\n "L" activates the Starfall signs.\n\n\n\n\n' +
                '(Press C to continue . . .)';
                console.log(this.progress);
            }
            else if (this.progress == 1) {
                this.message.text = 'Only one type of sign can be active at a time.\n Move quickly and try to escape the corruption' +
                ' of CyberCity 010!\n\n\n\n' +
                '(Press C to continue . . .)';
                this.progress = 2;
                console.log(this.progress);
            }
            else if (this.progress == 2) {
                this.scene.start('titleScene');
            }
        }

    }

    update() {

        // Do tutorial
        this.doTutorial();

    }
}