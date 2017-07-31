# Shiny, Let's Be Bad Guys: Exploiting and Mitigating the Top 10 Web App Vulnerabilities

The Internet is a dangerous place, filled with evildoers out to attack your code
for fun or profit, so it's not enough to just ship your awesome new web app--you
have to take the security of your application, your users, and your data
seriously.  You'll get into the mindset of the bad guys as we discuss, exploit,
and mitigate the most common web app security flaws in a controlled environment.

We'll discuss each kind of the most prevalent security flaws at the theoretical
level, then using a specially-crafted, deliberately vulnerable Django app,
individuals or pairs will carry out exploits against these flaws, and we'll
illustrate solutions to mitigate each kind of attack.

This repository contains a deliberately-vulnerable website and exercises for
learning about different kinds of attacks.

We'll be using the [OWASP Top 10][top10] as our topic roadmap, addressing
subjects such as:

 * Injection attacks
 * Cross-Site Scripting (XSS)
 * Cross-Site Request Forgery (CSRF)
 * Insecure Direct Object References
 * Insecure Cryptographic Storage
 * Failure to Restrict URL Access
 * Unvalidated Redirects and Forwards
 * Security Misconfiguration
 * Broken Authentication and Session Management
 * Insufficient Transport Layer Protection

**Disclaimer:** Topics and techniques discussed in this tutorial should be used
only for “white hat” purposes of securing your own applications and systems from
attackers.  Use of this information against other organizations without their
consent may be a criminal act.  Attendees agree that the presenters and
conference staff are not responsible for what attendees choose to do with this
information.


## Getting Set Up

You should work through this section to **install and set up the demo
application prior to the start of the tutorial**.  Getting ready in advance
will help ensure a smoother and more efficient tutorial experience.

These instructions assume a UNIX-like environment (Mac OS X, Linux, etc.).
We'll call out differences for Windows folks as needed.


### Things to Install

First, make sure you have all of the following items installed.

#### Git

You’ll need Git to check out the code repository that we’ll be working with. You
can download it from [http://git-scm.com](http://git-scm.com "Git").


#### Python

All of our examples were developed and tested against Python 2.7 and 3.4.
If you don’t have Python, you can download it from
[http://www.python.org/download/](http://www.python.org/download/ "Python").

We recommend either Python 3.4 (or later) or Python 2.7.


#### Pip

It’s nicer than easy_install, especially for installing project requirements.

You get pip for free with Python 3.4! (And also with newer versions too.)

If you're using Python 2.7 and don't already have Pip, [follow the instructions
here](https://pip.pypa.io/en/stable/installing/), or take a shortcut and run:

    $ curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
    $ sudo python get-pip.py


#### Virtualenv

Virtualenv will keep our code and its dependencies isolated from the rest of
your system.

You get virtualenv for free with Python 3.4!

If you're using Python 2.7 and don’t already have virtualenv
installed, you can get it by running:

    $ sudo pip install virtualenv

### Setting Your Path (Windows)

**If you're on Windows**,
you may need to update your PATH
so that Windows can find your python.exe.
This varies a bit between
[different versions of Windows][windows-path]
so use the method that's right for your OS.

If you installed Python 3.4, add:

    C:\Python34\;C:\Python34\Scripts\;C:\Python34\Tools\Scripts

For Python 3.5, add:

    C:\Python35\;C:\Python35\Scripts\;C:\Python35\Tools\Scripts

If you installed Python 2.7, add:

    C:\Python27\;C:\Python27\Scripts\


### Getting the Demo Application

#### Installation: Mac & Linux

If you're using Python 3.4 (or later), create the virtual environment with:

    $ pyvenv badguys

If you're using Python 2.7, create the virtual environment with:

    $ virtualenv badguys

Activate the virtual environment; this puts you into the “sandbox” where you
won’t interfere with other Python apps or your main system Python:

    $ cd badguys
    $ source ./bin/activate

Clone a copy of the application repository:

    $ git clone https://github.com/mpirnat/lets-be-bad-guys.git src

Install the application’s dependencies:

    $ cd src
    $ pip install -r requirements.txt


#### Installation: Windows

If you're using Python 3.4, create the virtual environment with:

    > pyvenv.py badguys

If you're using Python 2.7, create the virtual environment with:

    > virtualenv badguys

Activate the virtual environment; this puts you into the “sandbox” where you
won’t interfere with other Python apps or your main system Python:

    > cd badguys
    > Scripts/activate.bat

Clone a copy of the application repository:

    $ git clone https://github.com/mpirnat/lets-be-bad-guys.git src

Install the application’s dependencies:

    > cd src
    > pip.exe install -r requirements.txt


#### Start the Application

Since this application contains some real, live vulnerabilities, you may want to
turn off your wi-fi or network connection at this point to protect yourself from
potential malicious activity.  (This isn't a problem if you're only listening on
127.0.0.1--our default--but is for real if you tend to listen on 0.0.0.0!)

Start up the vulnerable application:

    $ python manage.py runserver

**For advanced users who are setting this up inside a Docker container
--and *only* if you are doing something like that (see security warning above)**
--you *will* have to make it listen on 0.0.0.0:

    # Totally DON'T do this unless you are using Docker...
    $ python manage.py runserver 0.0.0.0:8000

You should now be able to open up a web browser and visit:

[http://localhost:8000/](http://localhost:8000/ "the demo app")


## Resources

You may find these resources to be valuable during and after the tutorial.

#### Tutorial Website

Code, setup instructions, and links to the slides and documentation are
available from:

[https://github.com/mpirnat/lets-be-bad-guys](https://github.com/mpirnat/lets-be-bad-guys
"")

#### The OWASP Top 10 List

We’ve included the latest Top 10 list at the time of the tutorial in the
handout; however it may change or be revised.  There’s also a lot of additional
information, as well as previous versions of the Top 10 list available.

[https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project
"OWASP Top 10")

#### URL Encoder/Decoder

A number of the exercises may require escaping values for inclusion in the query
string of a URL.  A convenient shortcut is available:

[http://meyerweb.com/eric/tools/dencoder/](http://meyerweb.com/eric/tools/dencoder/
"URL Encoder/Decoder")

Or as an alternative, you can always:

    $ python
    >>> import urllib
    >>> urllib.quote("...")

#### Slides

Slides for various presentations of this material are available online for your
future reference:


* [The CodeMash 2017 slides][slides7] (once more in glorious widescreen)
* [The PyCon 2016 slides][slides6] (in retro 4x3)
* [The OSCON 2016 slides][slides5] (now in glorious widescreen)
* [The PyCon 2015 slides][slides4]
* [The PyCon 2014 slides][slides3]
* [The PyOhio 2013 slides][slides2]
* [The PyCon 2013 slides][slides1]


[top10]: https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project
[slides1]: http://www.slideshare.net/mpirnat/lets-be-bad-guys
[slides2]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities
[slides3]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities-2014-edition
[slides4]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities-2015-edition
[slides5]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities-oscon-2016-edition
[slides6]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities-pycon-2016-edition
[slides7]: https://speakerdeck.com/mpirnat/shiny-lets-be-bad-guys-exploiting-and-mitigating-the-top-10-web-app-vulnerabilities-codemash-2017-edition
[windows-path]: http://www.java.com/en/download/help/path.xml
