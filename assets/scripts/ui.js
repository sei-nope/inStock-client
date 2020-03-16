'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')
const showInventoryTemplate = require('./templates/inventory-show.handlebars')
const QRCode = require('qrcode')
const config = require('./config.js')

const successMessage = function (msg, type) {
  const alertHtml = `<div class="alert alert-success fade show ${type}" role="alert">
    ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  $('#sys-message').append(alertHtml)
  setTimeout(function () {
    $(`.${type}`).fadeOut()
  }, 3000)
}
const failureMessage = function (msg, type) {
  const alertHtml = `<div class="alert alert-danger alert-dismissible fade show ${type}" role="alert">
    ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  $('#sys-message').append(alertHtml)
  setTimeout(function () {
    $(`.${type}`).fadeOut()
  }, 3000)
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
  $('#sign-up-msg').empty()
  $('#sign-in-msg').empty()
  $('#sign-up-msg')
    .removeClass()
    .addClass('success-message')
    .text(response.user.email + ' successfully signed up!')
  // Clear Form Fields
  resetForms()
}

const onSignUpFailure = function (response) {
  console.log(response.responseText)
  $('#sign-up-msg')
    .removeClass()
    .addClass('failure-message')
    .text('Failed to sign up')
}

// Sign In
const onSignInSuccess = function (response) {
  $('#sign-in-msg').empty()
  $('#sign-up-msg').empty()
  const msg = `${response.user.email} successfully signed in`
  successMessage(msg, 'sign-in-success')
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
  $('#sign-in-msg')
    .removeClass()
    .addClass('failure-message')
    .text('Sign in failed')
  // Clear Form Fields
  resetForms()
}

// Change Password
const onChangePasswordSuccess = function (response) {
  const msg = 'Successfully changed password'
  successMessage(msg, 'change-pw')
  // Clear Form Fields
  resetForms()
  $('.close-pw-btn').trigger('click')
}

const onChangePasswordFailure = function (response) {
  $('#change-pw-msg')
    .removeClass()
    .addClass('failure-message')
    .text('Failed to change password')
  // Clear Form Fields
  resetForms()
}

// Sign Out
const onSignOutSuccess = function (response) {
  const msg = 'Successfully signed out'
  successMessage(msg, 'sign-out')
  // Hide these stuff
  $('.create-inventory').hide()
  $('nav').hide()
  // Show these stuff
  $('.cont').show()
  $('.inventory-content').empty()
}

const onSignOutFailure = function (response) {
  const msg = 'Failed to sign out'
  failureMessage(msg, 'sign-out')
  resetForms()
}

const onCreateInventorySuccess = function (response) {
  const inventory = response.inventory
  QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
    if (error) console.error(error)
    inventory.qr = url
    const msg = 'Created inventory'
    successMessage(msg, 'create-success')
  })

  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('#item').prepend(showInventoryHTML)
  $('.empty-table').remove()
  resetForms()
}

const onCreateInventoryFailure = function (response) {
  const msg = 'Failed to create inventory'
  failureMessage(msg, 'create-fail')
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
  resetForms()
  const msg = 'Update successful'
  successMessage(msg, 'update-success')
  $('.close-update-btn').trigger('click')
}

const onQuickChangeInventorySuccess = function (response) {
  const inventory = response.inventory
  QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
    if (error) console.error(error)
    inventory.qr = url
  })
  const showInventoryHTML = showInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).remove()
  $('#item').prepend(showInventoryHTML)
  resetForms()
}

const onQuickChangeInventoryFailure = function (response) {
  const err = JSON.parse(response.responseText)
  const msg = err.message
  failureMessage(msg, 'quick-change-fail')
}

const onUpdateInventoryFailure = function (response) {
  failureMessage()
  $('#modal-message-update-inventory').text('Item was not successfully updated')
  $('#message').text('Update Attempt Failed')
}

const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  inventories.forEach(function (inventory) {
    QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
      if (error) console.error(error)
      inventory.qr = url
    })
  })
  const indexInventoriesHTML = indexInventoriesTemplate({inventories: inventories})
  $('.inventory-content').html(indexInventoriesHTML)
}

const onIndexInventoriesFailure = function (response) {
  const msg = 'Unable to retrieve inventory'
  failureMessage(msg, 'index-fail')
}

const onDeleteInventorySuccess = function (response, id) {
  $(`#${id}`).remove()
  const msg = 'Item deleted!'
  successMessage(msg, 'delete-success')
}

const onDeleteInventoryFailure = function (response) {
  const msg = 'Failed to delete item!'
  failureMessage(msg, 'delete-fail')
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
  failureMessage,
  onQuickChangeInventorySuccess,
  onQuickChangeInventoryFailure
}
