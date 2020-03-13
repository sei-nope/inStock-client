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
  // $('.change-password-button').hide()
  $('nav').hide()
  // $('#show-inventory').hide()
  // $('.update-inventory-button').hide()
  $('.create-inventory').hide()
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('.inventory-content').on('click', '.delete-inventory', authEvents.onDeleteInventory)
  $('.inventory-content').on('click', '.update-inventory', authEvents.onGetUpdateInventory)
  $('#update-inventory-form').on('submit', authEvents.onUpdateInventory)
  $('#create-inventory-form').on('submit', authEvents.onCreateInventory)
  $('#show-inventory').on('click', authEvents.onIndexInventory)
})
