var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>
<p>The correct URL looks like:</p>
<p><a href="/cross-site-scripting/path-matching/&quot;;document.title=&quot;PLZ%20HACK%20MY%20USERS&quot;;&quot;">/cross-site-scripting/path-matching/";document.title="PLZ%20HACK%20MY%20USERS";"</a>
*/});

window.onload = function() {
    var result = '';
    if (document.title == 'PLZ HACK MY USERS') {
        result = '<div class="answer panel"><p><b>Success</b> You have managed to inject your ' +
            'own JavaScript into this page</p></div>';
    } else {
        result = 'This page has not yet been hacked.';
    }
    document.getElementById("result").innerHTML = result;
}
