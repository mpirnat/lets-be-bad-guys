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
    solution_sql = ("SELECT id from Users where first_name = ''; "
                    "DROP TABLE Users;--';")
    expected_sql = "'; DROP TABLE Users;--"

    name = request.POST['name'] if request.method == 'POST' else ''
    correct = (norm(name) == norm(expected_sql))

    return render(request, 'vulnerable/injection/sql.html',
            {'name': name, 'correct': correct, 'solution_sql': solution_sql})


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
        return redirect(reverse('injection-file-access') + "?msg=" + msg)

    try:
        data = file(os.path.join(base_path, filename)).read()
    except IOError:
        return render(request, 'vulnerable/injection/user_profile.html')

    return HttpResponse(data, content_type=mimetypes.guess_type(filename)[0])


def code_execution(request):
    msg = ''
    first_name = ''
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '')
        try:
            exec(base64.decodestring(first_name))
        except:
            pass
        try:
            data = open('p0wned.txt').read()
            msg = ('Good job! You successfully p0wned yourself. You '
                   'wrote: %s' % data)
        except IOError:
            data = ''
            msg = 'You failed to write to p0wed.txt.'

    return render(request, 'vulnerable/injection/code_execution.html',
            {'first_name': request.POST.get('first_name', ''), 'msg': msg})

    # maybe put this is some sort of hints
    # solution: >>> import base64
    #           >>> base64.encodestring("file('/tmp/p0wned.txt', 'w').write('boom!')")

## 02 - Broken Authentication & Session Management


## 03 - XSS

def xss_form(request):
    env = {'qs': request.GET.get('qs', 'hello')}
    return render(request, 'vulnerable/xss/form.html', env)


def xss_path(request, path='default'):
    env = {'path': path}
    return render(request, 'vulnerable/xss/path.html', env)


def xss_query(request):
    env = {'qs': request.GET.get('qs', 'hello')}
    return render(request, 'vulnerable/xss/query.html', env)


## 04 - Insecure Direct Object References
users = {
    '1': {
        'name': 'Foo',
        'email': 'foo@example.com',
        'admin': False,
    },
    '2': {
        'name': 'Bar',
        'email': 'bar@example.com',
        'admin': True,
    }
}

def dor_user_profile(request, userid=None):
    env = {}
    user_data = users.get(userid)

    if request.method == 'POST':
        user_data['name'] = request.POST.get('name') or user_data['name']
        user_data['email'] = request.POST.get('email') or user_data['email']
        env['updated'] = True

    env['user_data'] = user_data
    env['user_id'] = userid
    return render(request, 'vulnerable/direct_object_references/profile.html', env)

## 05 - Security Misconfiguration

def boom(request):
    raise Exception('boom')


## 06 - Sensitive Data Exposure

def exposure_login(request):
    return redirect('exposure')


## 07 - Missing Function Level Access Control

def missing_access_control(request):
    env = {}
    if request.GET.get('action') == 'admin':
        return render(request, 'vulnerable/access_control/admin.html', env)
    return render(request, 'vulnerable/access_control/non_admin.html', env)


## 08 - CSRF

@csrf_exempt
def csrf_image(request):
    env = {'qs': request.GET.get('qs', '')}
    return render(request, 'vulnerable/csrf/image.html', env)


## 09 - Using Known Vulnerable Components
# No exercise, just discussion?


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


