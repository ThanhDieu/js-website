const newsletterForm = $("#newsletterForm");

/**
 * Chặn form submit
 */
newsletterForm.on('submit', function (e) {
    e.preventDefault();
});

/**
 * Sử lý form đăng ký
 */
newsletterForm.validate({
    rules: {
        newsletter_email: {
            required: true,
            email: true,
            maxlength: 255
        },
    },
    submitHandler: function (form) {
        startLoading();
        const formData = $(form).serializeFormJSON();

        const registerAlert = $('#register-alert');
        axios.post('/newsletters', formData)
            .then(response => {
                registerAlert.text(response.data.message);
                registerAlert.removeClass('alert-danger');
                registerAlert.addClass('alert-success');
                registerAlert.fadeIn();
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
