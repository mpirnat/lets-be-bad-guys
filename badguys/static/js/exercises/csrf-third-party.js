function die(msg) { alert(msg); return false; }

function checkValue($form, selector, name, expected_value) {
    var input = $form.find(selector)[0];
    if (!input) { return die('You seem to be missing a required input.'); }
    if ($(input).attr('value').toLowerCase() !== expected_value.toLowerCase()) {
        return die('You seem to be using the wrong value for ' + name + '.');
    }
    return true;
}

var allowed_actions = ['http://localhost:8000/csrf/gift-card', 'http://127.0.0.1:8000/csrf/gift-card'];
$(document).on('submit', 'form', function(e) {
    var $form = $(this);
    if (!$form.attr('action') || allowed_actions.indexOf($form.attr('action')) === -1) {
        return die("Check your form action. It appears to be incorrect. You want the full URL to the giftcard form!");
    }
    if (!$form.attr('method') || $form.attr('method').toUpperCase() != 'POST') {
        return die("Check your form method. You should be POSTing.");
    }

    // inputs should be either hidden or submit
    var inputs = $form.find('input').toArray();
    for (var i in inputs) {
        var type = $(inputs[i]).attr('type') || '';
        switch (type.toLowerCase()) {
            case 'hidden':
            case 'submit':
                break; // all good
            default:
                return die("You appear to have inputs that are not hidden.");
        }
    }

    if (!checkValue($form, 'input[type="submit"]', 'submit', 'View Photos')) {
        return false;
    }
    if (!checkValue($form, 'input[name="email"]', 'email', 'evil@evil.com')) {
        return false;
    }
    if (!checkValue($form, 'input[name="amount"]', 'amount', '100')) {
        return false;
    }

    alert("Congrats! You did it!");
    return false;
});

/* TODO: solution panel? */
