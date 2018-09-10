import {random, getAreaGravity} from './utils.js'
import {config} from './gameConfig.js'
const particleCount = config.w
const particleColor = "#f2f2f2"
const particleSize = 1
const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')
let particleArray
const maxDistance = 200

const init = () => {
  particleArray = Array(particleCount).fill().map((i) => {
    const x = random(0, config.w)
    const y = random(0, config.h)
    return {
      x0: x,
      y0:y,
      x: x,
      y: y,
      color: particleColor,
      size: particleSize
    }
  })
}

const draw = (particle, astronaut) => {
  if(particle.y > config.h) {
    particle.y = 0
  }
  if(particle.y < 0) {
    particle.y = config.h
  }
  if(particle.x < 0) {
    particle.x = config.w
  }

  const relativeToAstronaut = {
    x: particle.x - astronaut.x,
    y: particle.y - astronaut.y
  }

  const distance = Math.sqrt(
    relativeToAstronaut.x * relativeToAstronaut.x +
    relativeToAstronaut.y * relativeToAstronaut.y
  )

  const forceDirection = {
    x: relativeToAstronaut.x / distance,
    y: relativeToAstronaut.y / distance
  }

  let force = (maxDistance - distance) / maxDistance
  
  if(astronaut.repel) {
    
    if (force < 0) {
      force = 0
    } else {
      particle.x = particle.x0
      particle.y = particle.y0
    }
    particle.x0 = particle.x
    particle.y0 = particle.y
    particle.x0 += config.resistance
    particle.y0 += getAreaGravity(particle)
    particle.x += forceDirection.x * force * 50 * 0.99 + (config.resistance)
    particle.y += forceDirection.y * force * 50 * 0.99 + (getAreaGravity(particle))
  } else {
    particle.y += getAreaGravity(particle)
    particle.x += config.resistance
  }
  
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI)
  ctx.fillStyle = particle.color
  ctx.fill()
}

const update = (astronaut) => {
  particleArray.forEach(p => {
    draw(p, astronaut)
  })
}

export {
  init,
  update
}