/*
Aniruddh Sindhu
Shckiitzo
16 hours

Creative Tilt:
Technical:
I made it so that bullets spawn closer to the player depending on their position on the screen

Visual:
I was never an artisticly gifted person, so having to challenge myself with my own sprite creation made me proud of my game
even if it may not look as good as others.
*/

'use strict'

let keyW, keyA, keyS, keyD

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play, GameOver] //Menu and End TBD
}

let game = new Phaser.Game(config)
let {width , height} = game.config
let cursors
let playerHeight = 64
let logHeight = 32
let logWidth = 96
let logSpawnThreshold = 3*height/4      //when to spawn the next log
let logMinSpawnThreshold = 128
let bulletHeight = 8
let bulletWidth = 32
let time = 0