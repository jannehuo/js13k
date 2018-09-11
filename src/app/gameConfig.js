import {random} from './utils.js'
/** TODO: Randomize velocity and gravity values */
const config = {
  w: window.innerWidth,
  h: window.innerHeight,
  launches: 3,
  fuelValues: {
    up:0,
    right:0,
    down: 0
  },
  fuel: 0,
  fuelLimit: 100,
  launchActive: false,
  resistance:random(1,5),
  gravityMultiplier: random(20,100),
  shuttleMovement: 0.01,
  gravity: {
    "1": {
      y: random(1,5) / 10
    },
    "2": {
      y: (random(1,5) / 10) * -1
    },
    "3": {
      y: random(2,8) / 10
    }
  }
}

export {config}