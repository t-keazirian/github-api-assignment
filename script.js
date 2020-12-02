'use strict';


function getUserHandle(userHandle, maxResults) {

  fetch(`https://api.github.com/users/${userHandle}/repos`)

    .then(response => { 
        // if comes back 404, show error message
      if (response.status === 404) { 
        throw Error('User Not Found')
        } 
        // hide error message when working properly
        $('#js-error-message').hide();
        return response.json()})

    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        // when error is present, hide the results and show the error message
      $('#results').addClass('hidden');
      $('#js-error-message').show();
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {

  console.log(responseJson);

  // assignment: The user must be able to make multiple searches and see only the results for the current search - this empties previous results
  $('#results-list').empty();

  // iterate through repos array and stop at max results
  for (let i = 0; i < responseJson.length & i < maxResults; i++) {
    $('#results-list').append(
      `<li>
      <h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
      </li>`
    );
  };
  $('#results').removeClass('hidden');
}


function handleForm() {
  $('form').submit(event => {
    event.preventDefault();
    // get userHandle from the value of the input
    const userHandle = $('#js-user-handle').val();
    console.log(userHandle);

    // get maxResults from value of the input
    const maxResults = $('#js-max-results').val();
    console.log(maxResults);

    getUserHandle(userHandle, maxResults);
  });
}

$(function() {
  console.log('App has loaded. Waiting for click!');
  handleForm();
})