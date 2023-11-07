class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, playerX, velocity){
        super(scene, -32, Phaser.Math.Between(bulletHeight/2, height-bulletHeight/2), 'bullet')
        this.flip = false
        if(playerX < width/2){
            this.x = -bulletWidth/2
        }else{
            this.flip = true
            this.x = width+bulletWidth/2
            this.flipX = true
            velocity *= -1
        }
        this.parentScene = scene 

        scene.add.existing(this)            //make it exist in the scene and phyiscs engine
        scene.physics.add.existing(this)
        this.setVelocityX(velocity)        //start moving
        this.setImmovable()
        this.isNew = true                   //for spawning logic

    }

    update(){
        if(!this.flip){
            if(this.isNew && this.x > width/2){
                this.parentScene.addBullet()
                this.isNew = false
            }

        }else{
            if(this.isNew && this.x < width/2){
                this.parentScene.addBullet()
                this.isNew = false
            }
        }
        if(this.x > width + this.width || this.x < -this.width){
            this.destroy()
        }
    }
}