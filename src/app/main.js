require('exports-loader?kontra!../libs/kontra.min.js')
import {config} from './gameConfig.js'
import {init as particlesInit,update as particlesUpdate} from './particles.js'
import {getAreaGravity, random, getShuttlePosition} from './utils.js'
import {updateFuel, updateTries} from './ui.js'
const canvas = document.getElementById('game-canvas')
canvas.width = config.w
canvas.height = config.h
let astronautImage = new Image()
astronautImage.src = 'images/astronaut.jpg'
let shuttleImage = new Image()
shuttleImage.src = 'images/shuttle.jpg'

kontra.init()
particlesInit()

let sprites = {
  astronaut: kontra.sprite({
    x: 10,        
    y: (config.h / 2) - 25,
    color: 'red',  
    width: 20,     
    height: 50,
    dx: 0,
    image: astronautImage
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
    config.launchActive = true
    config.fuelValues[type] += 1;
    updateFuel(type, config.fuelValues[type])
  }
}

const multiplyForce = (val) => {
  return val / 10
}

const checkCollission = () => {
  const xDist = Math.abs(sprites.astronaut.x - sprites.shuttle.x)
  const yDist = Math.abs(sprites.astronaut.y - sprites.shuttle.y)
  if(xDist < 50 && yDist < 50) {
    finisgGame()
  }
}

const endGame = () => {
  setTimeout(() => {
    loop.stop()
    document.getElementById('game-end-view').classList.remove('hidden')
  }, 1000);
}

const finisgGame = () => {
  loop.stop()
}

let loop = kontra.gameLoop({  
  update: function() {     
    if (kontra.keys.pressed('right')) {
      addFuel('right')
      sprites.astronaut.dx += multiplyForce(config.fuelValues.right) / 50
    }
    if (kontra.keys.pressed('up')) {
      addFuel('up')
      sprites.astronaut.dy += (multiplyForce(config.fuelValues.up) * -1) / 50
    }
    if (kontra.keys.pressed('down')) {
      addFuel('down')
      sprites.astronaut.dy += (multiplyForce(config.fuelValues.down)) / 50
    }
    sprites.astronaut.update()
    checkCollission()
    if(config.launchActive && sprites.astronaut.x < config.w) {
      sprites.astronaut.dy += getAreaGravity(sprites.astronaut) / 100
      sprites.astronaut.ddx = (config.resistance / 1000) * -1
      sprites.astronaut.update()
      if(sprites.astronaut.dx < 0) {
        sprites.astronaut.dx = 0
      }
      if(sprites.astronaut.x > config.w || sprites.astronaut.y > config.h || sprites.astronaut.x < 0 || sprites.astronaut.y < 0) {
        if(config.launches === 0) {
          endGame()
        } else {
          sprites.astronaut.x = 10
          sprites.astronaut.y = (config.h / 2) - 25
          sprites.astronaut.dx = 0
          sprites.astronaut.dy = 0
          sprites.astronaut.ddx = 0
          config.launches--
          updateTries(config.launches)
        }
      }
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

document.getElementById('start-game').addEventListener('click', (e) => {
  document.getElementById('start-game-view').classList.add('hidden')
  loop.start()
})

document.getElementById('restart-game').addEventListener('click', (e) => {
  location.reload()
})