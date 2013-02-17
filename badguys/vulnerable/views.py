import base64
import mimetypes
import os
import urllib

from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt


## 01 - Injection Attacks

def norm(s):
    return s.strip().replace(' ', '').lower()


def sql(request):
    expected_sql = ("SELECT id from Users where first_name = ''; "
                    "DROP TABLE Users;--';")
    expected_sql = "'; DROP TABLE Users;--"

    name = request.POST['name'] if request.method == 'POST' else ''
    correct = (norm(name) == norm(expected_sql))

    return render(request, 'vulnerable/injection/sql.html',
            {'name': name, 'correct': correct})


def file_access(request):
    msg = request.GET.get('msg', '')
    return render(request, 'vulnerable/injection/file_access.html',
            {'msg': msg})


def user_profile(request):
    """A view that is vulnerable to malicious file access."""

    base_path = os.path.join(os.path.dirname(__file__), '../../badguys_project/static/images')
    filename = request.GET.get('p')
    if filename.startswith('/'):
        msg = urllib.quote_plus("Did you really think it would be "
                "that easy? Bonus points if you see the XSS flaw.")
        location = '/danger/vulnerable/file-access?msg=' + msg
        return redirect(reverse('injection-file-access') + "?msg=" + msg)

    data = file(os.path.join(base_path, filename)).read()
    return HttpResponse(data, content_type=mimetypes.guess_type(filename)[0])


def code_execution(request):
    msg = ''
    first_name = ''
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '')
        exec(base64.decodestring(first_name))
        try:
            data = open('/tmp/p0wned.txt').read()
            msg = ('Good job! You successfully p0wned yourself. You '
                   'wrote: %s' % data)
        except IOError:
            data = ''
            msg = 'You failed to write a file.'

    return render(request, 'vulnerable/injection/code_execution.html',
            {'first_name': request.POST.get('first_name', ''), 'msg': msg})

    # maybe put this is some sort of hints
    # solution: >>> import base64
    #           >>> base64.encodestring("file('/tmp/p0wned.txt', 'w').write('boom!')")

## 05 - CSRF

@csrf_exempt
def csrf_image(request):
    env = {'qs': request.GET.get('qs', '')}
    return render(request, 'vulnerable/csrf/image.html', env)


## 09 - Insufficient Transport Layer Protection

def transport_login(request):
    return redirect('transport')


## 10 - Unvalidated Redirects & Forwards

def unvalidated_redirect(request):
    url = request.GET.get('url')
    return redirect(url)


def unvalidated_forward(request):
    forward = request.GET.get('fwd')
    function = globals().get(forward)

    if function:
        return function(request)

    env = {'fwd': forward}
    return render(request, 'vulnerable/redirects/forward_failed.html', env)

def admin(request):
    return render(request, 'vulnerable/redirects/admin.html', {})


