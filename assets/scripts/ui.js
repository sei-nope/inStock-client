'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')

// Sign Up
const onSignUpSuccess = function (response) {
  // console.log(response)
  // $('#message').removeClass()
  // $('#message').addClass('success-message')
  // $('#message').text(response.user.email + ' successfully signed up!')
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('.modal').hide()
}

const onSignUpFailure = function (response) {
  // console.log(response)
  // $('#message').removeClass()
  // $('#message').addClass('failure-message')
  // $('#message').text('Failed to sign up')
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
}

// Sign In
const onSignInSuccess = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('success-message')
  // $('#message').text(response.user.email + ' successfully signed in')
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  store.user = response.user
  $('.modal').hide()
}

const onSignInFailure = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('failure-message')
  // $('#message').text('Signed in failed. 😭')
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
}

// Change Password
const onChangePasswordSuccess = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('success-message')
  // $('#message').text('Changed Password Succeeded!')
  $('#change-password-form').trigger('reset')
  $('.modal').hide()
}

const onChangePasswordFailure = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('failure-message')
  // $('#message').text('You can not change your password muahahaha!')
  $('#change-password-form').trigger('reset')
}

// Sign Out
const onSignOutSuccess = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('success-message')
  // $('#message').text('Sign Out Succeeded!')
  $('#change-password-form').hide()
  $('#change-password-form').trigger('reset')
  $('#sign-out-form').hide()
  $('#sign-in-form').show()
  $('#sign-up-form').show()
}

const onSignOutFailure = function (response) {
  // $('#message').removeClass()
  // $('#message').addClass('failure-message')
  // $('#message').text('Sign Out Failed 😭')
}

const onCreateInventorySuccess = function (response) {
  console.log(response)
}

const onCreateInventoryFailure = function (response) {
  console.log(response)
}

const onUpdateInventorySuccess = function (response) {
  console.log(response)
  $('.modal').hide()
}

const onUpdateInventoryFailure = function (response) {
  console.log(response)
}

const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  console.log(inventories)
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
}

const onIndexInventoriesFailure = function (response) {
  console.log(response)
}

const onDeleteInventorySuccess = function (response) {
  console.log(response)
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
