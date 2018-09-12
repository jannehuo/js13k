const updateFuel = (val) => {
  const percentage = val * 100
  const animVal = 100 - percentage
  const bar = document.getElementById('fuel-bar')
  if(animVal < 75) {
    bar.style.backgroundColor = 'yellow'
  }
  if(animVal < 25) {
    bar.style.backgroundColor = 'red'
  }
  bar.style.width = animVal + '%'
}

const updateTries = (tries) => {
  document.getElementById('tries').innerHTML = tries
}

const resetUi = () => {
  document.getElementById('fuel-bar').style.width = '100%'
  document.getElementById('fuel-bar').style.backgroundColor = 'green'
}

export {updateFuel,updateTries, resetUi}