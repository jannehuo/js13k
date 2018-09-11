const updateFuel = (type,val) => {
  const updatedEl = document.getElementById(type)
  updatedEl.innerHTML = val
}

const updateTries = (tries) => {
  document.getElementById('tries').innerHTML = tries
}

export {updateFuel,updateTries}