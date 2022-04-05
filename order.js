/**
 * Xoá đơn hàng
 * @param orderId
 */
function cancelOrder(orderId) {
    startLoading();
    axios.delete(mainUrl + '/my-account/order/' + orderId)
        .then(response => {
            notify(response.data.message, 'success')
            //location.href = '/my-account/order';
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}
