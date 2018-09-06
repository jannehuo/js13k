require('exports-loader?kontra!../libs/kontra.min.js')
import {config} from './gameConfig.js'
import {init as particlesInit,update as particlesUpdate} from './particles.js'
import {getAreaGravity, random} from './utils.js'
const canvas = document.getElementById('game-canvas')
canvas.width = config.w
canvas.height = config.h
kontra.init()
particlesInit()
let sprites = {
  astronaut: kontra.sprite({
    x: 0,        
    y: config.h / 2,
    color: 'red',  
    width: 20,     
    height: 40,
    dx: 0,
    repel: false          
  }),
  shuttle: kontra.sprite({
    x: config.w - 20,        
    y: (config.h / 2) - ((config.h / 5) / 2),
    color: 'white',  
    width: 20,     
    height: config.h / 5,
    dx: 0          
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
  sprites.astronaut.ddx = random(1,2)
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
      sprites.astronaut.dy = getAreaGravity(sprites.astronaut) * config.gravityMultiplier
      sprites.astronaut.update()
    } else {
      sprites.astronaut.repel = false
      config.launchActive = false
    }
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