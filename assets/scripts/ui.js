'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')
const showInventoryTemplate = require('./templates/inventory-show.handlebars')

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
  // console.log(response)
  successMessage()
  $('#message').text(response.user.email + ' successfully signed up!')
  // Clear Form Fields
  resetForms()
  $('.close').trigger('click')
}

const onSignUpFailure = function (response) {
  // console.log(response)
  $('#modal-message-sign-up').removeClass()
  $('#modal-message-sign-up').addClass('failure-message')
  $('#modal-message-sign-up').text('Failed to sign up')
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
  $('.change-password-button').show()
  $('#sign-out-form').show()
  $('#show-inventory').show()
  $('.update-inventory-button').show()
  $('.create-inventory').show()
  // Hide These Stuff
  $('.sign-up-button').hide()
  $('.sign-in-button').hide()
  store.user = response.user
  $('.close').trigger('click')
}

const onSignInFailure = function (response) {
  $('#modal-message-sign-in').removeClass()
  $('#modal-message-sign-in').addClass('failure-message')
  $('#modal-message-sign-in').text('Signed in failed. 😭')
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
  $('.change-password-button').hide()
  $('#sign-out-form').hide()
  $('#show-inventory').hide()
  $('.update-inventory-button').hide()
  $('.create-inventory').hide()
  // Show these stuff
  $('.sign-in-button').show()
  $('.sign-up-button').show()
  resetForms()
}

const onSignOutFailure = function (response) {
  failureMessage()
  $('#message').text('Sign Out Failed 😭')
  resetForms()
}

const onCreateInventorySuccess = function (response) {
  const inventory = response.inventory
  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('.inventory-content').prepend(showInventoryHTML)
  successMessage()
  resetForms()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Created!')
}

const onCreateInventoryFailure = function (response) {
  console.log(response)
  failureMessage()
  $('#message').text('Create Attempt Failed! 😱')
}

const onUpdateInventorySuccess = function (response) {
  console.log(response)
  const inventory = response.inventory
  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('.inventory-content').prepend(showInventoryHTML)
  window.scrollTo(0, 0)
  successMessage()
  resetForms()
  $('.close').trigger('click')
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Updated!')
}

const onUpdateInventoryFailure = function (response) {
  console.log(response)
  failureMessage()
  $('#message').text('Update Attempt Failed')
}

const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  console.log(inventories)
  successMessage()
  resetForms()
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
  $('#message').text('Here are all your items in your inventory.')
}

const onIndexInventoriesFailure = function (response) {
  console.log(response)
  failureMessage()
  $('#message').text('You broke the database!')
}

const onDeleteInventorySuccess = function (response, id) {
  console.log(response)
  successMessage()

  $(`#${id}`).remove()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Deleted!')
}

const onDeleteInventoryFailure = function (response) {
  console.log(response)
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
  successMessage,
  failureMessage
}
