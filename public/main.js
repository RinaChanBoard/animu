var form = document.querySelector('#my-form'),
    text_field = document.querySelector('#search');

function submitHandler() {
    var url = form.action + text_field.value;
    window.open(url);
    return false
}
form.onsubmit = submitHandler;