require('exports-loader?kontra!../libs/kontra.min.js')
import {random} from './utils.js'
const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2s')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const screen = {
  w: window.innerWidth,
  h: window.innerHeight
}
const fuelValues = {
  up:0,
  right:0,
  down:0
}
let fuel = 0
let fuelLimit = 1000
let launchActive = false

kontra.init()

let sprites = {
  astronaut: kontra.sprite({
    x: 0,        
    y: screen.h / 2,
    color: 'red',  
    width: 20,     
    height: 40,
    dx: 0          
  }),
  shuttle: kontra.sprite({
    x: screen.w - 20,        
    y: (screen.h / 2) - ((screen.h / 2) / 2),
    color: 'white',  
    width: 20,     
    height: screen.h / 2,
    dx: 0          
  })
}

const addFuel = (type) => {
  fuel += 1;
  if(fuel <= fuelLimit) {
    fuelValues[type] += 1;
  }
}

const launch = () => {
  sprites.astronaut.dx = fuelValues.right
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
    if(launchActive) {
      sprites.astronaut.update()
    }
  },
  render: function() {        
    sprites.astronaut.render()
    sprites.shuttle.render()
  }
})

kontra.keys.bind(['enter', 'space'], function() {
  launchActive = true
  launch()
})


loop.start()