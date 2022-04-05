$(document).ready(function (){
    requiredChangePassword();
})

function requiredChangePassword(){
    if($('#customChangePassword').is(':checked')){
        $('#changePass input').attr('required', true);
        $('#changePass').slideDown();
    }else {
        $('#changePass input').attr('required', false);
        $('#changePass').slideUp();
    }
}


/**
 * Form account
 */
$('#formProfile').validate({
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true,
            maxlength: 255
        },
        phone: {
            required: true,
            number: true,
            minlength: 8,
            maxlength: 14
        },
        password_confirmation: {
            equalTo: "#password"
        }
    }
});

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
