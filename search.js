/**
 * Sự kiện keyup tìm kiếm.
 */
function searchOnMenu() {
    let input, filter, length = 7;
    input = document.getElementById("myInputSearch");
    const keyword = input.value;
    const param = {
        keyword: keyword
    };
    axios.post(mainUrl + '/products/search?keyword=' + keyword, param)
        .then(response => {
            const products = response.data.data;
            filter = input.value.toUpperCase();
            let myUL = $('#search-suggestion');
            myUL.empty();
            if (products && products.length > 0) {
                if (products.length < 7) {
                    length = products.length;
                }
                for (var i = 0; i < length; i++) {
                    myUL.append(`<li><a href="${mainUrl}/${products[i].alias}.html" class="w-100 overflow-hidden text-muli-light">${products[i].name}</a></li>`);
                }
                $('.list-product').addClass('onText');
            } else {
                $('.list-product').removeClass('onText');
            }
        })
        .catch(error => {
            handleResponseError(error);
        });
}

document.addEventListener("click", (event) => {
    if (event.target.closest(".list-suggestions")) return;
    $('.list-suggestions').removeClass('onText');
});

function closePromotion() {
    $('#top-header').addClass('d-none')
}

/**
 * Sự kiện tìm kiếm câu hỏi.
 */
function searchOnSupport() {
    let input, filter;
    input = document.getElementById("searchQuestion");
    const menuIdValue = $('#menuId').val();
    const keyword = input.value;
    const param = {
        keyword: keyword,
        menuId : menuIdValue
    };
    axios.post(mainUrl + '/pages/questions/search', param)
        .then(response => {
            const questions = response.data.data;
            filter = input.value.toUpperCase();
            const questionId = $('#questionID');
            questionId.empty();
            if (questions && questions.length > 0) {
                for (var i = 0; i < questions.length; i++) {
                    questionId.append(`<div class="content-faq">
                <a class="item-faq iflex collapsed w-100" data-toggle="collapse"
                   href="#item-faq${questions[i].id}"
                   role="button" aria-expanded="false" aria-controls="item-faq${questions[i].id}">
                    <span class="text-bold text-color-gray">${questions[i].ask}</span>
                </a>
                <div class="collapse" id="item-faq${questions[i].id}">
                    <div class="sub-list">
                        ${questions[i].answer}
                    </div>
                </div>
            </div>`);
                }
            } else {
                questionId.append(`<p class="text-center mt-3">Câu hỏi không tồn tại</p>`)
            }

        })
        .catch(error => {
            handleResponseError(error);
        });
}

function searchPosts() {
    let input, filter, length;
    input = document.getElementById("searchPost");
    const keyword = input.value;
    const param = {
        keywordPost: keyword
    };
    axios.post(mainUrl + '/posts/search?keyword=' + keyword, param)
        .then(response => {
            const posts = response.data.data;
            filter = input.value.toUpperCase();
            let list = $('#search-posts');
            list.empty();
            if (posts && posts.length > 0) {
                if (posts.length < 7) {
                    length = posts.length;
                }
                for (let i = 0; i < length; i++) {
                    list.append(`<li><a href="${mainUrl}/posts/${posts[i].alias}.html" class="w-100 overflow-hidden text-muli-light">${posts[i].title}</a></li>`);
                }
                $('#listPost').addClass('onText');
            } else {
                $('#listPost').removeClass('onText');
            }
        })
        .catch(error => {
            handleResponseError(error);
        });
}
