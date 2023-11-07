class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        this.load.image('snowbed', './assets/snowbed.png')
    }

    create(){
        this.snowbed = this.add.tileSprite(0,0,640,640,'snowbed').setOrigin(0,0)
        // Menu text config
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
        this.add.text(width/2, height/2 - height/4, "You have skis for some reason!", menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 - height/8, "The Soviets are after you for stealing their information!", menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 + height/8, 'Use Arrow Keys and try to escape!',menuConfig).setOrigin(0.5)
        this.add.text(width/2, height/2 + height/4, 'Press SPACE to start!',menuConfig).setOrigin(0.5)

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            this.scene.start('playScene')
        }
    }
}

