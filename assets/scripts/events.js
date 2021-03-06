'use strict'
const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// Sign Up function
const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

// Sign In function
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then((response) => {
      ui.onSignInSuccess(response)
      onIndexInventory(event)
    })
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

// Index inventory
const onIndexInventory = (event) => {
  event.preventDefault()

  api.indexInventories()
    .then(ui.onIndexInventoriesSuccess)
    .catch(ui.onIndexInventoriesFailure)
}

// Create new inventory function
const onCreateInventory = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  data.inventory.name = data.inventory.name.toLowerCase()
  api.createInventory(data)
    .then((response) => {
      ui.onCreateInventorySuccess(response)
      onIndexInventory(event)
    })
    .catch(ui.onCreateInventoryFailure)
}

const onGetUpdateInventory = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.showInventory(id)
    .then(ui.onGetUpdateInventorySuccess)
    .catch(ui.onGetUpdateInventoryFailure)
}

const onQuickAddInventory = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.showInventory(id)
    .then((response) => {
      const quantity = parseInt(response.inventory.quantity) + 1
      const data = {
        inventory: {
          quantity: quantity
        }
      }
      return api.updateInventory(id, data)
    })
    .then(ui.onQuickChangeInventorySuccess)
    .catch(ui.onQuickChangeInventoryFailure)
}

const onQuickMinusInventory = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.showInventory(id)
    .then((response) => {
      const quantity = parseInt(response.inventory.quantity) - 1
      const data = {
        inventory: {
          quantity: quantity
        }
      }
      return api.updateInventory(id, data)
    })
    .then(ui.onQuickChangeInventorySuccess)
    .catch(ui.onQuickChangeInventoryFailure)
}

const onUpdateInventory = (event) => {
  event.preventDefault()
  const updateId = $(event.target).data('id')
  const $row = $(`tr[data-id=${updateId}]`)
  const data = {
    inventory: {
      quantity: $row.find('[name="inventory[quantity]"]').val(),
      name: $row.find('[name="inventory[name]"]').val().toLowerCase(),
      price: $row.find('[name="inventory[price]"]').val()
    }
  }
  api.updateInventory(updateId, data)
    .then(ui.onUpdateInventorySuccess)
    .catch(ui.onUpdateInventoryFailure)
}

const onDeleteInventory = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')

  api.deleteInventory(id)
    .then((response) => {
      ui.onDeleteInventorySuccess(response, id)
    })
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
  onCreateInventory,
  onQuickAddInventory,
  onQuickMinusInventory
}
