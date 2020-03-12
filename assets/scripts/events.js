'use strict'
const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// Sign Up function
const onSignUp = function (event) {
  event.preventDefault()
  console.log(event)
  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

// Sign In function
const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  // console.log(data)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

// Change Password function
const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

// Sign Out function
const onSignOut = function (event) {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onCreateInventory = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  data.inventory.name = data.inventory.name.toLowerCase()
  api.createInventory(data)
    .then(ui.onCreateInventorySuccess)
    .catch(ui.onCreateInventoryFailure)
}

let updateId

const onGetUpdateInventory = (event) => {
  event.preventDefault()
  updateId = undefined
  const id = $(event.target).data('id')
  updateId = id
}

const onUpdateInventory = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.updateInventory(updateId, data)
    .then(ui.onUpdateInventorySuccess)
    .catch(ui.onUpdateInventoryFailure)
}

const onIndexInventory = (event) => {
  event.preventDefault()

  api.indexInventories()
    .then(ui.onIndexInventoriesSuccess)
    .catch(ui.onIndexInventoriesFailure)
}

const onDeleteInventory = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')

  api.deleteInventory(id)
    .then(ui.onDeleteInventorySuccess)
    .catch(ui.onDeleteInventoryFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onDeleteInventory,
  onUpdateInventory,
  onGetUpdateInventory,
  onIndexInventory,
  onCreateInventory
}
