/**
 * Notify plugin
 * @param text
 * @param callback
 * @param close_callback
 * @param style
 * @constructor
 */
Notify = function(text, callback, close_callback, style) {
    var time = '10000';
    var $container = $('#notifications');
    var icon = '<i class="fa fa-info-circle "></i>';

    if (typeof style == 'undefined' ) style = 'warning';

    var html = $('<div class="alert alert-' + style + '  hide">' + icon +  " " + text + '</div>');

    $('<a>',{
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function(e){
            e.preventDefault();
            close_callback && close_callback();
            remove_notice()
        }
    }).prependTo(html);

    $container.prepend(html);
    html.removeClass('hide').hide().fadeIn('slow');

    function remove_notice() {
        html.stop().fadeOut('slow').remove()
    }

    var timer =  setInterval(remove_notice, time);

    $(html).hover(function(){
        clearInterval(timer);
    }, function(){
        timer = setInterval(remove_notice, time);
    });

    html.on('click', function () {
        clearInterval(timer);
        callback && callback();
        remove_notice()
    });

};

/**
 * Push thông báo
 * @param message - Tin nhắn hiển thị
 * @param style - Loại thông báo
 */
function notify(message, style = 'success') {
    if (!message) {
        message = 'Đã xảy ra lỗi không xác định.';
        style = 'error';
    }

    Notify(message, null, null, style)
}

/**
 * Modal yes or no
 * @param id
 */
function getValueId(id) {
    $('#value_id').val(id);
    $('#modalYesNo').modal('show');
}
