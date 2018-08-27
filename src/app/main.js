require('exports-loader?kontra!../libs/kontra.min.js')
import {config} from './gameConfig.js'
const canvas = document.getElementById('game-canvas')
canvas.width = config.w
canvas.height = config.h
kontra.init()

let sprites = {
  astronaut: kontra.sprite({
    x: 0,        
    y: config.h / 2,
    color: 'red',  
    width: 20,     
    height: 40,
    dx: 0          
  }),
  shuttle: kontra.sprite({
    x: config.w - 20,        
    y: (config.h / 2) - ((config.h / 2) / 2),
    color: 'white',  
    width: 20,     
    height: config.h / 2,
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
  sprites.astronaut.dx = config.fuelValues.right
}

let loop = kontra.gameLoop({  
  update: function() {     
    if (kontra.keys.pressed('right')) {
      addFuel('right')
    }
    if (kontra.keys.pressed('up')) {
      addFuel('up')
    }
    if (kontra.keys.pressed('down')) {
      addFuel('down')
    }
    if(config.launchActive) {
      sprites.astronaut.update()
    }
  },
  render: function() {        
    sprites.astronaut.render()
    sprites.shuttle.render()
  }
})

kontra.keys.bind(['enter', 'space'], function() {
  config.launchActive = true
  launch()
})

loop.start()