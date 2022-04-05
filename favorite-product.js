/**
 * Add product to favorite_products
 */
function addToFavoriteProduct(dataID) {
    let count = $('.count-favorite').text();
    startLoading();
    const param = {
        "product_id": $('.btn-wishlist-' + dataID ).data('id')
    };
    axios.post('favorite-products', param)
        .then(response => {
            notify(response.data.message, 'success')
            $('.btn-wishlist-' + dataID).attr("disabled", true);
            $('.btn-wishlist-' + dataID + ' >span').addClass('disabled');
            $('.count-favorite').text(parseInt(count) + 1);
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        });
}

/**
 * Xoá một sản phẩm trong wish-list
 * @param wishListId
 */
function removeFavoriteProduct(wishListId) {
    startLoading();
    axios.delete('favorite/' + wishListId)
        .then(response => {
            notify(response.data.message, 'success')
            location.href = 'favorite';
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}
