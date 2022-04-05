/**
 * Add product to shopping cart
 * @param productId: id sản phẩm
 */
function addToShoppingCart(productId = 0) {
    let count = $('.count-mini-cart').text();
    startLoading();
    const param = {
        "product_id": (productId == 0) ? $('#product_id').val() : productId
    };

    axios.post(mainUrl + '/shopping-carts', param)
        .then(response => {
            $('.count-mini-cart').text(parseInt(count) + 1);
            notify(response.data.message, 'success')
            endLoading();
            // if(response.data && (response.data.phone || response.data.tablet)) {
            //     location.href = '';
            // }
        })
        .catch(error => {
            handleResponseError(error);
        });
}


/**
 * Xoá một sản phẩm trong giỏ hàng
 * @param itemId - ID item on cart
 */
function removeToShoppingCart(itemId) {
    startLoading();
    axios.delete('shopping-carts/' + itemId)
        .then(response => {
            notify(response.data.message, 'success')
            location.href = '/shopping-carts';
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}

/**
 * Xoá một sản phẩm trong giỏ hàng
 * @param itemId - ID item on cart
 */
function removeToOrderCheckout(itemId) {
    startLoading();
    axios.delete('shopping-carts/' + itemId)
        .then(response => {
            notify(response.data.message, 'success')
            location.href = '/orders';
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}

/**
 * Cập nhật số lượng sản phẩm
 * @param itemId - ID item in cart
 * @param number - Số lượng thay đổi
 * @param operator - Số lượng thay đổi
 */
function updateQuantity(itemId, number = 0, operator = '+') {
    startLoading();
    var currentQuantity = $(`#${itemId}`).val();
    var quantity = currentQuantity;
    if(operator == '+') {
        quantity = parseInt(currentQuantity) + parseInt(number);
    }
    else {
        quantity = parseInt(currentQuantity) - parseInt(number);
    }

    axios.put('shopping-carts/' + itemId + '/quantity', {quantity})
        .then((response) => {
            // if (response.data.status) {
            //     if (response.data.total_price) {
            //         // Cập nhật tổng tiền trong giỏ hàng
            //         $('#total_price').text('VND ' + response.data.total_price);
            //     }
            //
            //     if (response.data.item) {
            //         $(`#${itemId}`).val(response.data.item.quantity);
            //     }
            // }
            location.href = '/shopping-carts';
            endLoading();
        })
        .catch((error) => {
            $(`#${itemId}`).val(currentQuantity);
            handleResponseError(error);
        })
}

/**
 * Đổi sản phẩm một sản phẩm trong giỏ hàng
 * @param itemId - ID item on cart
 * @param productId - ID item on cart
 */
function changeSizeToShoppingCart(itemId, productId) {
    startLoading();
    const param = {
        "product_id": productId,
        "quantity": $(`#${itemId}`).val()
    }
    axios.post('shopping-carts/' + itemId + '/change', param)
        .then(response => {
            // notify(response.data.message, 'success');
            location.href = '/shopping-carts';
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}

/**
 * Áp dụng mã giảm giá
 */
function applyCouponCode() {
    const code = $('#coupon-code').val();
    if (code) {
        startLoading();
        axios.post('orders/apply-coupon/' + code)
            .then(response => {
                notify(response.data.message, 'success')
                location.href = '/orders';
                endLoading();
            })
            .catch(handleResponseError)
    } else {
        Notify('Bạn chưa nhập mã giảm giá.');
    }
}
