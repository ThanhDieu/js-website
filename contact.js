const formContact = $("#formContact");

/**
 * Chặn form submit
 */
formContact.on('submit', function (e) {
    e.preventDefault();
});

/**
 * Xử lý form liên hệ
 */
formContact.validate({
    rules: {
        name: {
            required: true,
            maxlength: 255
        },
        contact_email: {
            required: true,
            email: true,
            maxlength: 255
        },
        content: {
            required: true,
        },
    },
    submitHandler: function (form) {
        startLoading();
        const formData = $(form).serializeFormJSON();
        const registerAlert = $('#contact-alert');
        axios.post('/pages/contact', formData)
            .then(response => {
                registerAlert.text(response.data.message);
                registerAlert.removeClass('alert-danger');
                registerAlert.addClass('alert-success');
                registerAlert.fadeIn();
                setTimeout(function (){
                    window.location.href = '/pages/contact';
                }, 1000)
                endLoading();
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    registerAlert.text(error.response.data.message);
                    registerAlert.addClass('alert-danger');
                    registerAlert.removeClass('alert-success');
                    registerAlert.fadeIn();
                } else {
                    handleResponseError(error);
                }
                endLoading();
            });
    }
});
