'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')
const showInventoryTemplate = require('./templates/inventory-show.handlebars')
const QRCode = require('qrcode')
const config = require('./config.js')

const successMessage = function () {
  $('#message').removeClass()
  $('#message').addClass('success-message')
}
const failureMessage = function () {
  $('#message').removeClass()
  $('#message').addClass('failure-message')
}
const resetForms = function () {
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
  $('#create-inventory-form').trigger('reset')
  $('#update-inventory-form').trigger('reset')
}
// Sign Up
const onSignUpSuccess = function (response) {
  successMessage()
  $('#message').text(response.user.email + ' successfully signed up!')
  // Clear Form Fields
  resetForms()
  // $('.close').trigger('click')
}

const onSignUpFailure = function (response) {
  //
  failureMessage()
  $('#message').text('Failed to sign up')
  // Clear Form Fields
  resetForms()
}

// Sign In
const onSignInSuccess = function (response) {
  successMessage()
  $('#message').text(response.user.email + ' successfully signed in')
  // Clear Form Fields
  resetForms()
  // Show These Stuff
  $('.create-inventory').show()
  $('nav').show()
  // Hide These Stuff
  $('.cont').hide()
  store.user = response.user
  // $('.close').trigger('click')
}

const onSignInFailure = function (response) {
  failureMessage()
  $('#message').text('Signed in failed. 😭')
  // Clear Form Fields
  resetForms()
}

// Change Password
const onChangePasswordSuccess = function (response) {
  successMessage()
  $('#message').text('Changed Password Succeeded!')
  // Clear Form Fields
  resetForms()
  $('.close').trigger('click')
}

const onChangePasswordFailure = function (response) {
  $('#modal-message-change-password').removeClass()
  $('#modal-message-change-password').addClass('failure-message')
  $('#modal-message-change-password').text('You can not change your password muahahaha!')
  // Clear Form Fields
  resetForms()
}

// Sign Out
const onSignOutSuccess = function (response) {
  successMessage()
  $('#message').text('Sign Out Succeeded!')
  // Hide these stuff
  $('.create-inventory').hide()
  $('nav').hide()
  // Show these stuff
  $('.cont').show()
  resetForms()
  $('.inventory-content').empty()
}

const onSignOutFailure = function (response) {
  failureMessage()
  $('#message').text('Sign Out Failed 😭')
  resetForms()
}

const onCreateInventorySuccess = function (response) {
  const inventory = response.inventory
  QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
    if (error) console.error(error)
    inventory.qr = url
  })

  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('#item').prepend(showInventoryHTML)
  successMessage()
  resetForms()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Created!')
}

const onCreateInventoryFailure = function (response) {
  failureMessage()
  $('#message').text('Create Attempt Failed! 😱')
}

const onUpdateInventorySuccess = function (response) {
  const inventory = response.inventory
  QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
    if (error) console.error(error)
    inventory.qr = url
  })

  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('#item').prepend(showInventoryHTML)
  window.scrollTo(0, 0)
  successMessage()
  resetForms()
  $('.close').trigger('click')
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Updated!')
  $('#modal-message-update-inventory').text('Item Successfully Updated')
}

const onUpdateInventoryFailure = function (response) {
  failureMessage()
  $('#modal-message-update-inventory').text('Item was not successfully updated')
  $('#message').text('Update Attempt Failed')
}

let inventories
const onIndexInventoriesSuccess = function (response) {
  inventories = response.inventories
  inventories.forEach(function (inventory) {
    QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
      if (error) console.error(error)
      inventory.qr = url
    })
  })

  successMessage()
  resetForms()
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
  $('#message').text('Here are all your items in your inventory.')
}

const onIndexInventoriesFailure = function (response) {
  failureMessage()
  $('#message').text('You broke the database!')
}

const editInventories = function (editingId) {
  inventories.forEach(function (inventory) {
    inventory.isEditing = editingId === inventory._id
  })
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
}

const onDeleteInventorySuccess = function (response, id) {
  successMessage()

  $(`#${id}`).remove()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Deleted!')
}

const onDeleteInventoryFailure = function (response) {
  failureMessage()
  $('#message').text('You can not delete the item muahahaha!')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateInventorySuccess,
  onCreateInventoryFailure,
  onUpdateInventorySuccess,
  onUpdateInventoryFailure,
  onIndexInventoriesSuccess,
  onIndexInventoriesFailure,
  onDeleteInventorySuccess,
  onDeleteInventoryFailure,
  editInventories,
  successMessage,
  failureMessage
}
