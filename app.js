/**
 * Hiển thị loading overlay
 */
function startLoading() {
    $('#overlay').fadeIn();
}

/**
 * Tắt loading overlay
 */
function endLoading() {
    $('#overlay').fadeOut();
}

/**
 * Sử lý lỗi axios trả về
 * @param error
 */
function handleResponseError(error) {
    if (!error || !error.response) {
        return notify('Đã xảy ra lỗi không xác định');
    }
    if (error.response.exception && error.response.exception === `Illuminate\Http\Exceptions\ThrottleRequestsException`) {
        notify('Đã vượt quá giới hạn truy cập. Xin thử lại sau một phút.', 'danger');
    } else {
        notify(error.response.data.message, 'danger');
    }
    if (error.response.data.redirect) {
        setInterval(() => {
            window.location.href = error.response.data.redirect;
        }, 1500)
    }

    endLoading();
}


$(document).ready(function () {
    $('.lazy').lazy();
});
