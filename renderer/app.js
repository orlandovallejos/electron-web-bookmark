// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Show modal:
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
})

//Hide modal:
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active')
})

//Handle add button:
$('#add-button').click(() => {
  //Get text from input:
  let newItemURL = $('#item-input').val();
  console.log(newItemURL);
})

//Simulate add click on pressing enter key:
$('#item-input').keyup((e) => {
  if (e.key === 'Enter') {
    $('#add-button').click();
  }
})