$(function main() {
    var $input = $('#textInput'),
        $results = $('#results');

    // Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Rx.Observable.fromEvent($input, 'keyup')
      .map(function (e) {
        return e.target.value;
         // transfrom the text from the user input
      })
      .filter(function (text) {
        return text.length > 2; // Only if the text is longer than 2 characters
      })
      .debounce(750) // make sure user's can't spam us
      .distinctUntilChanged(); // Only if the value has changed

    keyup.subscribe(
      function (data) {
        $input.val('')
        $results
          .append ( data + ' ... ');
      },
      function (error) {
        $results
          .empty()
          .append($('<li>'))
          .text('Error:' + error);
      });
  }(window, jQuery, Rx));


