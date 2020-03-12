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
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Failed to sign up')
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
  $('.sign-out-button').show()
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
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Signed in failed. 😭')
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
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('You can not change your password muahahaha!')
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
  $('.sign-out-button').hide()
  $('#show-inventory').hide()
  $('.update-inventory-button').hide()
  $('.create-inventory').hide()
  // Show these stuff
  $('#sign-in-form').show()
  $('#sign-up-form').show()
  // Clear Form Fields
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
}

const onSignOutFailure = function (response) {
  $('#message').removeClass()
  $('#message').addClass('failure-message')
  $('#message').text('Sign Out Failed 😭')
  $('#change-password-form').trigger('reset')
}

const onCreateInventorySuccess = function (response) {
  console.log(response)
  refresh()
}

const onCreateInventoryFailure = function (response) {
  console.log(response)
}

const onUpdateInventorySuccess = function (response) {
  console.log(response)
  $('.close').trigger('click')
  refresh()
}

const onUpdateInventoryFailure = function (response) {
  console.log(response)
}

const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  const sortInventories = inventories.sort(function (a, b) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: sortInventories})
  $('.inventory-content').html(indexInventoriesHTML)
}

const onIndexInventoriesFailure = function (response) {
  console.log(response)
}

const onDeleteInventorySuccess = function (response) {
  console.log(response)
  refresh()
}

const onDeleteInventoryFailure = function (response) {
  console.log(response)
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
