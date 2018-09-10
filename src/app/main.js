require('exports-loader?kontra!../libs/kontra.min.js')
import {config} from './gameConfig.js'
import {init as particlesInit,update as particlesUpdate} from './particles.js'
import {getAreaGravity, random, getShuttlePosition} from './utils.js'
const canvas = document.getElementById('game-canvas')
canvas.width = config.w
canvas.height = config.h
let astronautImage = new Image()
astronautImage.src = '/images/astronaut.png'
let shuttleImage = new Image()
shuttleImage.src = '/images/shuttle.png'

kontra.init()
particlesInit()

let sprites = {
  astronaut: kontra.sprite({
    x: 0,        
    y: (config.h / 2) - 25,
    color: 'red',  
    width: 20,     
    height: 50,
    dx: 0,
    image: astronautImage,
    repel: false          
  }),
  shuttle: kontra.sprite({
    x: config.w - 100,        
    y: 0,
    color: 'white',  
    width: 20,     
    height: 100,
    dx: 0,
    dy:0,
    image: shuttleImage          
  })
}

const addFuel = (type) => {
  config.fuel += 1;
  if(config.fuel <= config.fuelLimit) {
    config.fuelValues[type] += 1;
  }
}

const launch = () => {
  console.log(config.fuelValues)
  sprites.astronaut.dx += 1
  //sprites.astronaut.ddx = -0.001
  //sprites.astronaut.ddy = 1
}

const checkCollission = (astronaut) => {

}

let loop = kontra.gameLoop({  
  update: function() {     
    if (kontra.keys.pressed('right')) {
      addFuel('right')
    }
    if (kontra.keys.pressed('up')) {
      addFuel('up')
    }
    if(config.launchActive && sprites.astronaut.x < config.w) {
      //sprites.astronaut.dy = getAreaGravity(sprites.astronaut)
      sprites.astronaut.update()
    } else {
      sprites.astronaut.repel = false
      config.launchActive = false
    }
    sprites.shuttle.dy += 0.01 * getShuttlePosition(sprites.shuttle)
    sprites.shuttle.update()
  },
  render: function() {        
    sprites.astronaut.render()
    sprites.shuttle.render()
    particlesUpdate(sprites.astronaut)
  }
})

kontra.keys.bind(['enter', 'space'], function() {
  config.launchActive = true
  sprites.astronaut.repel = true
  launch()
})

loop.start()