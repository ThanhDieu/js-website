$(document).ready(function () {
    filterProducts();
    $('.filter-product-item').each(function () {
        let catId = $(this).data('id');
        if ($('#filter-product-item-' + catId + ' .filter-attribute').is(':checked')) {
            $('#filter-product-item-' + catId + ' .filter-item-text').removeClass('collapsed');
            $('#filter-product-item-' + catId + ' .collapse').addClass('show');
        }
    });
    $('.filter-delete').click(function () {
        var radios = document.getElementsByTagName('input');
        for (var i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
        window.location.href = currentUrl;
    });
});

/**
 * Lắng nghe các thay đổi trên bộ lọc
 * để tiến hành sử lý hành động tương ứng
 */
function filterProducts() {
    // thuoc tinh san pham
    $('.filter-attribute').change(() => generateFilterUrl());
    //gia san pham
    $('.filter-price').change(() => generateFilterUrl());
}

/**
 * Generate filter url
 */
function generateFilterUrl() {
    startLoading();
    let url = currentUrl; // Biến currentUrl được define trong file pc/page/category-product-child.blade.php
    // Dữ liệu lọc theo thuộc tính
    if ($('.filter-attribute:checked')) {
        if ($('.filter-attribute:checked').length > 0) {
            const alias = [];
            $('.filter-attribute:checked').each(function (key) {
                alias.push(this.value);
            });
            url = addQuery(url, 'thuoc-tinh', alias.join(','));
        }
    }

    const fromPrice = $('#input-from-price').val();
    const toPrice = $('#input-to-price').val();
    let aboutPrice = '';

    if (!((!fromPrice && !toPrice) || (fromPrice == 0 && !toPrice) || (toPrice == 0 && !fromPrice)) ) {
        if (fromPrice) {
            aboutPrice += fromPrice;
        } else {
            aboutPrice += 0;
        }
        if (toPrice) {
            if (aboutPrice) {
                aboutPrice += '-';
            }
            aboutPrice += toPrice;
        }
        url = addQuery(url, 'gia', aboutPrice);
    }
    const keyword = $('#myInputSearch').val();
    if (keyword) {
        url = addQuery(url, 'keyword', keyword);
    }
    window.location.href = url;
}

/**
 * Thêm một param vào url
 * @param url - Url hiện tại
 * @param name - tên param
 * @param value - dữ liệu param
 */
function addQuery(url, name, value) {
    if (hasQuery(url)) {
        return url + `&${name}=${value}`;
    }
    return url + `?${name}=${value}`;
}

/**
 * Hàm kiểm tra xem url đã chứa query params hay chưa
 */
function hasQuery(url) {
    return url.indexOf('?') !== -1;
}

/**
 * Kiểm tra xem tên biến trên query có tồn tại chưa
 * @param url
 * @param name
 * @returns {boolean}
 */
function hasQueryName(url, name) {
    return url.indexOf(name) !== -1;
}

