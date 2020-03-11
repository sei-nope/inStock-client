'use strict'

const store = require('./store')

// Sign Up
const onSignUpSuccess = function (response) {
  // console.log(response)
  // $('#message').removeClass()
  // $('#message').addClass('success-message')
  // $('#message').text(response.user.email + ' successfully signed up!')
  $('#sign-up-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
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

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
