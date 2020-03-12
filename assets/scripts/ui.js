'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')

const refresh = function () {
  $('.inventory-content').empty()
  $('#show-inventory').trigger('click')
}
// Sign Up
const onSignUpSuccess = function (response) {
  // console.log(response)
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text(response.user.email + ' successfully signed up!')
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('.close').trigger('click')
  $('#change-password-form').trigger('reset')
}

const onSignUpFailure = function (response) {
  // console.log(response)
  $('#modal-message-sign-up').removeClass()
  $('#modal-message-sign-up').addClass('failure-message')
  $('#modal-message-sign-up').text('Failed to sign up')
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

// Sign In
const onSignInSuccess = function (response) {
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text(response.user.email + ' successfully signed in')
  // Clear Form Fields
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#change-password-form').trigger('reset')
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
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

// Change Password
const onChangePasswordSuccess = function (response) {
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Changed Password Succeeded!')
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
  $('.close').trigger('click')
}

const onChangePasswordFailure = function (response) {
  $('#modal-message-change-password').removeClass()
  $('#modal-message-change-password').addClass('failure-message')
  $('#modal-message-change-password').text('You can not change your password muahahaha!')
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

// Sign Out
const onSignOutSuccess = function (response) {
  $('#message').removeClass()
  $('#message').addClass('success-message')
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
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

const onSignOutFailure = function (response) {
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Sign Out Failed 😭')
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

const onCreateInventorySuccess = function (response) {
  console.log(response)
  refresh()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Created!')
}

const onCreateInventoryFailure = function (response) {
  console.log(response)
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Create Attempt Failed! 😱')
}

const onUpdateInventorySuccess = function (response) {
  console.log(response)
  $('.close').trigger('click')
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Updated!')
}

const onUpdateInventoryFailure = function (response) {
  console.log(response)
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Update Attempt Failed. Are you filling out all the required fields?')
}

const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  console.log(inventories)
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Here are all your items in your inventory.')
}

const onIndexInventoriesFailure = function (response) {
  console.log(response)
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('You broke the database!')
}

const onDeleteInventorySuccess = function (response) {
  console.log(response)
  refresh()
  $('#message').removeClass()
  $('#message').addClass('success-message')
  $('#message').text('Item Deleted!')
}

const onDeleteInventoryFailure = function (response) {
  console.log(response)
  $('#message').removeClass()
  $('#message').addClass('failure-message')
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
  onDeleteInventoryFailure
}
