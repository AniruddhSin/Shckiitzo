class Log extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, velocity){
        super(scene, Phaser.Math.Between(logWidth/2, width - logWidth/2), 0-logHeight, 'log')
        this.parentScene = scene 

        scene.add.existing(this)            //make it exist in the scene and phyiscs engine
        scene.physics.add.existing(this)
        this.setVelocityY(velocity)        //start moving
        this.setImmovable()
        this.isNew = true                   //for spawning logic
        

    }

    update(){
        if(this.isNew && this.y > logSpawnThreshold){
            this.parentScene.addLog(this.parent, this.velocity)
            this.isNew = false
        }
        if(this.y > height + this.height){
            this.destroy()
        }
    }
}