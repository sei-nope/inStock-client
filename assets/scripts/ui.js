'use strict'

const store = require('./store')
const indexInventoriesTemplate = require('./templates/inventory-listing.handlebars')
const showInventoryTemplate = require('./templates/inventory-show.handlebars')
const editInventoryTemplate = require('./templates/inventory-edit.handlebars')
const QRCode = require('qrcode')
const config = require('./config.js')

const successMessage = function (msg, type) {
  const alertHtml = `<div class="alert row alert-success alert-dismissible fade show ${type}" role="alert">
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
  $('.sign-up-form').trigger('reset')
  $('.sign-in-form').trigger('reset')
  $('#change-password-form').trigger('reset')
  $('#create-inventory-form').trigger('reset')
  $('#update-inventory-form').trigger('reset')
}

// Sign Up Success
const onSignUpSuccess = function (response) {
  $('.sign-up-msg').text('')
  $('.sign-in-msg').text('')
  $('.sign-up-msg')
    .removeClass('failure-message')
    .addClass('success-message')
    .text(response.user.email + ' successfully signed up!')
  // Clear Form Fields
  resetForms()
}
// Sign Up Fail
const onSignUpFailure = function (response) {
  $('.sign-up-msg')
    .removeClass('success-message')
    .addClass('failure-message')
    .text('Failed to sign up')
}
// Sign In Success
const onSignInSuccess = function (response) {
  $('.sign-in-msg').text('')
  $('.sign-up-msg').text('')
  const msg = `${response.user.email} successfully signed in`
  successMessage(msg, 'sign-in-success')
  // Clear Form Fields
  resetForms()
  // Show These Stuff
  $('.create-inventory').show()
  $('nav').show()
  // Hide These Stuff
  $('.homepage').hide()
  store.user = response.user
}
// Sign In Fail
const onSignInFailure = function (response) {
  $('.sign-in-msg')
    // Add class to make message red
    .addClass('failure-message')
    .text('Sign in failed')
  // Clear Form Fields
  resetForms()
}
// Change Password Success
const onChangePasswordSuccess = function (response) {
  const msg = 'Successfully changed password'
  successMessage(msg, 'change-pw')
  // Clear Form Fields
  resetForms()
  $('.close-pw-btn').trigger('click')
}
// Change Password Fail
const onChangePasswordFailure = function (response) {
  $('#change-pw-msg')
    .removeClass()
    .addClass('failure-message')
    .text('Failed to change password')
  // Clear Form Fields
  resetForms()
}
// Sign Out Success
const onSignOutSuccess = function (response) {
  const msg = 'Successfully signed out'
  successMessage(msg, 'sign-out')
  // Hide these stuff
  $('.create-inventory').hide()
  $('nav').hide()
  // Show these stuff
  $('.homepage').show()
  $('.inventory-content').empty()
}
// Sign Out Fail
const onSignOutFailure = function (response) {
  const msg = 'Failed to sign out'
  failureMessage(msg, 'sign-out')
  resetForms()
}
// Index Inventories
const onIndexInventoriesSuccess = function (response) {
  const inventories = response.inventories
  // hide empty table message if inventories found
  if (inventories.length > 0) {
    $('.empty-table').hide()
  } else {
    $('.empty-table').show()
  }
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

const onGetUpdateInventorySuccess = function (response) {
  const inventory = response.inventory
  const editInventoryHTML = editInventoryTemplate({inventory: inventory})
  $(`#${inventory._id}`).html(editInventoryHTML)
}

const onGetUpdateInventoryFailure = function (response) {
  const msg = 'Unable to edit inventory'
  failureMessage(msg, 'index-fail')
}

const onCreateInventorySuccess = function (response) {
  const inventory = response.inventory
  QRCode.toDataURL(`${config.apiUrl}/inventories/${inventory._id}`, function (error, url) {
    if (error) console.error(error)
    inventory.qr = url
  })

  $('.empty-table').hide()
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
  const err = JSON.parse(response.responseText)
  const msg = err.message
  failureMessage(msg, 'update-change-fail')
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
  onGetUpdateInventorySuccess,
  onGetUpdateInventoryFailure,
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
