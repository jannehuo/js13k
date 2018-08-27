import {random} from './utils.js'
/** TODO: Randomize velocity and gravity values */
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
  velX: 1,
  velY: 1,
  gravity: 0.5
}

export {config}