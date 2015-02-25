var solutionHTML = FSTR(function(){/*
<h4>Solution</h4>
<p>Enter the following into the textbox:</p>
<p><code>'; drop table users;--</code></p>
<a class="tiny button" id="do_solution">do it</a>
*/});

var solutionSetup = function() {
    $('#do_solution').click(function() {
        $('input[name="name"]').val("'; drop table users;--");
        return false;
    });
}
