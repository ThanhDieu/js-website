$(document).ready(function (){
    $('.comment-pro-slider .comment-pro-item').each(function (event){
        let star = $('#cmt-' + event + ' .review-star').val();
        for (let i = 1; i <= star; i++){
            $('#cmt-' + event + ' .fa-star-' + i).addClass( "checked" );
        }
    })

    $('.rate input[name="rate"]').click(function (){
        if($('#moreReviewsModal input[name="rate"]').is(':checked')){
            let star = $(this).val();
            $('#star').val(star);
        }
    })
});

$("#review-accept").on('click', function () {
    if ($('#agree').is(':checked')) {
        $('#registerBtn').removeAttr("disabled");
    }
});

/**
 * Chặn form submit
 */
$('#formReview').on('submit', function (e) {
    e.preventDefault();
});

/**
 * Xử lý form nhan xet
 */
$('#formReview').validate({
    rules: {
        star: {
            required: true
        },
        name: {
            required: true,
            maxlength: 255
        },
        email: {
            required: true,
            email: true,
            maxlength: 255
        },
        title: {
            required: true,
            maxlength: 255
        },
        content: {
            required: true
        },
    },
    submitHandler: function (form) {
        startLoading();
        const formData = $(form).serializeFormJSON();
        axios.post('/products/review', formData)
            .then(response => {
                $('#moreReviewsModal .success').addClass('d-block').removeClass('d-none');
                $('#moreReviewsModal #modalForm').addClass('d-none');
                setTimeout(function () {
                    location.reload();
                }, 2000)
                endLoading();
            })
            .catch(error => {
                handleResponseError(error);
                endLoading();
            });
    }
});
