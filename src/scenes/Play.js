class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //loading assets
        this.load.path = './assets/'
        this.load.image('snowbed', 'snowbed.png')
        this.load.spritesheet('player', 'player.png',{
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.image('log', 'log.png')
        this.load.image('soldier', 'soldier.png')
        this.load.image('bullet', 'bullet.png')
        this.load.audio('bgm', ['bgm.mp3'])
    }

    create(){

        //tileSprite for background
        this.snowbed = this.add.tileSprite(0,0,640,640,'snowbed').setOrigin(0,0)

        //Player
        this.player = this.physics.add.sprite(width/2, height - 32, 'player',0)
        this.player.body.setCollideWorldBounds(true)
        this.PLAYER_VELOCITY = 350
        this.anims.create({
            key: 'ski',
            frameRate: 15,
            repeat: -1,
            yoyo: true,
            frames: this.anims.generateFrameNumbers('player',{
                start: 0,
                end: 2
            })
        })
                
        //Keys
        cursors = this.input.keyboard.createCursorKeys()

        //Logs
        this.LOG_VELOCITY = 450
        this.logGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(5000, () => {
            this.addLog()
        })

        //Enemy Soldier
        this.enemy = this.physics.add.sprite(Phaser.Math.Between(this.player.width/2, width - this.player.width/2),
        -this.player.height, 'soldier')

        //Bullets
        this.BULLET_VELOCITY = 525
        this.bulletGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(13000, () =>{
            this.addBullet()
        })

        //timer
        this.upTime = this.time.addEvent({
            delay: 1000,
            callback: this.incrementTime,
            callbackScope: this,
            loop: true
        })

        //audio
        this.bgm = this.sound.add('bgm',{
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.bgm.play()
    }

    incrementTime(){
        time+=1
    }

    addLog(){
        let log = new Log(this, this.LOG_VELOCITY)
        this.logGroup.add(log)
    }

    addBullet(){
        let bullet = new Bullet(this, this.player.x, this.BULLET_VELOCITY)
        this.bulletGroup.add(bullet)
    }

    update(){
        this.player.play('ski', true)
        let SNOWBED_VELOCITY_Y = -5
        //playerMovement
        let playerVector = new Phaser.Math.Vector2(0,0)
        if(cursors.left.isDown){
            playerVector.x = -1
            this.snowbed.tilePositionX -= 4
        }else if(cursors.right.isDown){
            playerVector.x = 1
            this.snowbed.tilePositionX += 4
        }
        if(cursors.up.isDown){
            playerVector.y = -1
            SNOWBED_VELOCITY_Y = -7
        }else if (cursors.down.isDown){
            playerVector.y = 1
            SNOWBED_VELOCITY_Y = -3
        }
        playerVector.normalize() //make vectors diagonal same
        this.player.setVelocity(this.PLAYER_VELOCITY*playerVector.x , this.PLAYER_VELOCITY*playerVector.y)

        //Collisions
        this.physics.world.collide(this.player, this.logGroup, this.playerCollision, null, this)
        this.physics.world.collide(this.player, this.bulletGroup, this.playerCollision, null, this)
        this.physics.world.collide(this.player, this.enemy, this.playerCollision, null, this)
        //background scrolling
        this.snowbed.tilePositionY += SNOWBED_VELOCITY_Y

        //enemyMovement
        this.enemy.y -= SNOWBED_VELOCITY_Y
        if(this.enemy.y - this.enemy.height / 2 > height){  
            //console.log("reset")
            this.enemy.y = -this.enemy.height
            this.enemy.x = Phaser.Math.Between(this.enemy.width/2, width - this.player.width/2)
        }


    }

    playerCollision(){
        this.scene.pause()
        //play death animation
        this.scene.start('gameOver')

    }
}