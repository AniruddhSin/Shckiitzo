class GameOver extends Phaser.Scene {
    constructor(){
        super("gameOver")
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: '#FF0000',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Show Menu Text
        this.add.text(width/2, height/2 - height/3, "GAME OVER", menuConfig).setOrigin(0.5)

        this.add.text(width/2, height/2 - height/6, "You Survived for "+time+ " seconds!", menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 - height/4, "Press R to restart!", menuConfig).setOrigin(0.5)

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)


        this.add.text(width/2, height/2 + height/8, "Credits:", menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 + height/6, "I made all of my own sprites", menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 + height/4, "BGM from Breaking Copyright - Royalty Free Music", menuConfig).setOrigin(0.5)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyR)){
            time = 0
            this.scene.start('playScene')
        }
    }
}