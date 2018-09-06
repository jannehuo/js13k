import {random} from './utils.js'
/** TODO: Randomize velocity and gravity values */
const config = {
  w: window.innerWidth,
  h: window.innerHeight,
  launches: 3,
  fuelValues: {
    up:0,
    right:0
  },
  fuel: 0,
  fuelLimit: 1000,
  launchActive: false,
  resistance:random(-0.1,-0.9),
  gravityMultiplier: random(20,100),
  gravity: {
    "1": {
      y: 0.2
    },
    "2": {
      y: -0.2
    },
    "3": {
      y: 0.3
    }
  }
}

export {config}