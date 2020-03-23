'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.img__btn').on('click', function () {
    $('.cont').toggleClass('s--signup')
  })
  const date = new Date()
  const year = date.getFullYear()
  $('.year').text(year)
  $('nav').hide()
  $('.empty-table').hide()
  $('.create-inventory').hide()
  $('.sign-up-form').on('submit', authEvents.onSignUp)
  $('.sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('.inventory-content').on('click', '.delete-inventory', authEvents.onDeleteInventory)
  $('.inventory-content').on('click', '.update-inventory', authEvents.onGetUpdateInventory)
  $('.inventory-content').on('click', '.submit-edit', authEvents.onUpdateInventory)
  $('#create-inventory-form').on('submit', authEvents.onCreateInventory)
  $('.navbar-brand').on('click', authEvents.onIndexInventory)
  $('.inventory-content').on('click', '.quick-change-add-inventory', authEvents.onQuickAddInventory)
  $('.inventory-content').on('click', '.quick-change-minus-inventory', authEvents.onQuickMinusInventory)

  // Development code
  // Set sign in email and password on page load and sign in so that changes to the table can be seen
  $('#sign-in-email').val('j@j')
  $('#sign-in-password').val('1')
  $('#sign-in').trigger('click')
})
