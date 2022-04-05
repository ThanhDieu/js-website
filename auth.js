/**
 * Xử lý form đăng ký
 */
$('#registerForm').validate({
    rules: {
        first_name: {
            required: true
        },
        email: {
            required: true,
            email: true,
            maxlength: 255
        },
        email_confirm: {
            equalTo: "#email"
        },
        password: {
            required: true,
            minlength: 8
        },
        password_confirm: {
            equalTo: "#password"
        },
        agree: {
            required: true
        }
    }
});
$("#register-accept").on('click', function(){
    if($('#agree').is(':checked')) {
        $('#registerBtn').removeAttr("disabled");
    }
});

/**
 * Xử lý form đăng nhập
 */
$('#loginForm').validate({
    rules: {
        email: {
            required: true,
            maxlength: 255
        },
        password: {
            required: true,
            minlength: 8
        }
    }
});

/**
 * Xử lý form quên mật
 */
$('#forgotForm').validate({
    rules: {
        email: {
            required: true,
            email: true,
            maxlength: 255
        }
    }
});

/**
 * Xử lý form reset password
 */

$("#formResetPass").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        token: {
            required: true
        },
        password: {
            required: true,
            minlength: 8
        },
        password_confirmation: {
            equalTo: "#password"
        }
    }
});
