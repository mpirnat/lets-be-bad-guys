$(function() {
    var result = '';
    var cookie = document.getElementById('cookie').firstChild.nodeValue;
    if (cookie.search('csrftoken') > -1) {
        result = '<strong>Success!</strong> You have managed to ' +
            'steal cookies from our user.';
    } else {
        result = 'This page has not yet been hacked.';
    }
    $('#result').html(result);
});
