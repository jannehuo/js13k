import {config} from "./gameConfig.js";

const random = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAreaGravity = (element) => {
  const screenThird = config.w / 3
  if(element.x > 0 && element.x < screenThird) {
    return config.gravity["1"].y
  }
  if(element.x > screenThird && element.x < (screenThird *2)) {
    return config.gravity["2"].y
  }
  if(element.x > (screenThird * 2) && element.x < (screenThird * 3)) {
    return config.gravity["3"].y
  }
  return 0
}

const getShuttlePosition = (shuttle) => {
  const middle = config.h / 2
  const bottomLimit = (middle / 2) + 100
  const bottomDistance = bottomLimit - shuttle.y
  if(bottomDistance < 0) {
    return -1
  }
  return 1
}

export {random, getAreaGravity, getShuttlePosition}