import {random} from './utils.js'

const config = {
  w: window.innerWidth,
  h: window.innerHeight,
  fuelValues: {
    up:0,
    right:0,
    down:0
  },
  fuel: 0,
  fuelLimit: 1000,
  launchActive: false,
  gravity: random(0.01,1),
  gravitySpeed: 0
}

export {config}