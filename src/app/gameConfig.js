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
  fuelLimit: 200,
  launchActive: false,
  astronautSaved: false,
  resistance:random(1,5),
  gravityMultiplier: random(1,5),
  shuttleMovement: 0.01,
  gravity: {
    "1": {
      y: random(1,5)
    },
    "2": {
      y: random(1,5) * -1
    },
    "3": {
      y: random(2,8)
    }
  }
}

export {config}