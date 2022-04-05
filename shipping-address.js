/**
 * Danh sách tỉnh/thành theo quốc gia
 * @param countryId: id quốc gia
 */
function getProvinces() {
    startLoading();
    let e = document.getElementById("profile_country_id");
    let countryId = e.options[e.selectedIndex].value;
    axios.get(mainUrl + '/provinces/' + countryId)
        .then(response => {
            /**
             * Xoá dữ liệu đã chọn trước đó
             * @type {*|jQuery.fn.init|jQuery|HTMLElement}
             */
            const provinceSelect = $('#profile_province_id');
            provinceSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');
            const districtSelect = $('#profile_district_id');
            districtSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');
            const wardSelect = $('#profile_ward_id');
            wardSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');
            const provinces = response.data;
            if (provinces && provinces.length) {
                provinces.forEach(province => {
                    provinceSelect.append(`<option value="${province.id}">${province.name}</option>`);
                });
            }
            endLoading();
        })
        .catch(handleResponseError)
}

/**
 * Chọn tỉnh/thành
 */
function getProvince() {
    let e = document.getElementById("profile_province_id");
    let provinceId;
    if (!e) {
        e = document.getElementById("shipping_province_id");
    }
    provinceId = e.options[e.selectedIndex].value;
    getDistricts(provinceId);
}

/**
 * Lay ve danh sach quan huyen cua mot tinh thanh
 * @param provinceId
 */
function getDistricts(provinceId) {
    startLoading();
    axios.get(mainUrl + '/provinces/' + provinceId + '/districts')
        .then(response => {
            /**
             * Xoá dữ liệu đã chọn trước đó
             * @type {*|jQuery.fn.init|jQuery|HTMLElement}
             */
            let districtSelect = $('#profile_district_id'),
                wardSelect = $('#profile_ward_id');
            if (districtSelect && !districtSelect.length && wardSelect && !wardSelect.length) {
                districtSelect = $('#shipping_district_id');
                wardSelect = $('#shipping_ward_id');
            }
            districtSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');
            wardSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');

            const districts = response.data;
            if (districts && districts.length) {
                districts.forEach(district => {
                    districtSelect.append(`<option value="${district.id}">${district.name}</option>`);
                });
            }
            endLoading();
        })
        .catch(handleResponseError)
}

/**
 * Lay ve danh sach phường xã của quận huyện
 */
function getWards() {
    startLoading();
    let province = document.getElementById("profile_province_id");
    let provinceId, districtId;
    let district = document.getElementById("profile_district_id");
    if (!province || !district) {
        province = document.getElementById("shipping_province_id");
        district = document.getElementById("shipping_district_id");
    }
    provinceId = province.options[province.selectedIndex].value;
    districtId = district.options[district.selectedIndex].value
    axios.get(mainUrl + '/provinces/' + provinceId + '/districts/' + districtId + '/wards')
        .then(response => {
            /**
             * Xoá dữ liệu đã chọn trước đó
             * @type {*|jQuery.fn.init|jQuery|HTMLElement}
             */
            let wardSelect = $('#profile_ward_id');
            if (wardSelect && wardSelect.length == 0) {
                wardSelect = $('#shipping_ward_id');
            }
            wardSelect.empty().append('<option selected="selected" value="" disabled>Vui lòng chọn</option>');
            const wards = response.data;
            if (wards && wards.length) {
                wards.forEach(ward => {
                    wardSelect.append(`<option value="${ward.id}">${ward.name}</option>`);
                });
            }
            endLoading();
        })
        .catch(handleResponseError)
}

function addShippingAddress() {
    startLoading();
    const param = {
        'receive_name': $('#receive_name').val(),
        'receive_phone': $('#receive_phone').val(),
        'shipping_address': $('#shipping_address').val(),
        'shipping_district_id': $('#shipping_district_id').val(),
        'shipping_ward_id': $('#shipping_ward_id').val(),
        'shipping_province_id': $('#shipping_province_id').val(),
        'default': $('#default').val()
    }

    axios.post('/shipping-address', param)
        .then(response => {
            notify('Thêm thành công!', 'success')
            location.href = '/shipping-address';
            endLoading();
        })
        .catch(error => {
            $('.css-my-account-form').addClass('was-validated');
            checkValidate(error.response.data.message.receive_name, '.receive-name');
            checkValidate(error.response.data.message.receive_phone, '.receive-phone');
            checkValidate(error.response.data.message.shipping_address, '.shipping-address');
            checkValidate(error.response.data.message.shipping_district_id, '.shipping-district');
            checkValidate(error.response.data.message.shipping_ward_id, '.shipping-ward');
            checkValidate(error.response.data.message.shipping_province_id, '.shipping-province');
            //handleResponseError(error);
        })
}

function checkValue(is_check = false) {
    if ($('#receive_name').val() &&
        $('#receive_phone').val() &&
        $('#shipping_address').val()
        && $('#shipping_district_id').val()
        && $('#shipping_ward_id').val() &&
        $('#shipping_province_id').val()) {
        $('.btn-addShippingAdress').attr('disabled', false)
    } else {
        $('.btn-addShippingAdress').attr('disabled', true);
        $('.css-my-account-form').addClass('was-validated');
    }
}

function checkValidate(message, className) {
    if (message) {
        $(className).text(message);
    } else {
        $(className).text('Required');
    }
}

function checkSubmitForm() {
    if ($('input[name="shipping_address_id"]').is(":checked")) {
        let idAddress = $('input[name="shipping_address_id"]:checked').val();
        $('#btn-shipping-address').attr('disabled', false);
        $('#shipping_address_id').val(idAddress);
    } else {
        $('#btn-shipping-address').attr('disabled', true);
    }
}

function requiredCompany() {
    if ($('#customCheckExport').is(':checked')) {
        $('#company-holder input').attr('required', true);
    } else {
        $('#company-holder input').attr('required', false);
    }
}

/**
 * Xoá địa chỉ giao hàng
 * @param itemId - ID item on cart
 */
function removeToShippingAddress(itemId) {
    startLoading();
    axios.delete('address/' + itemId)
        .then(response => {
            notify(response.data.message, 'success')
            location.href = 'address'
            endLoading();
        })
        .catch(error => {
            handleResponseError(error);
        })
}
