(function () {
    //获取卡种列表
    function getCardList() {
        $.ajax({
            method: 'get',
            url: '/card_type/get_card_list',
            success: function (data) {
                if (data.code === 0) {
                    var cardList = data.data;
                    var html = '';
                    var cardType = {
                        '1': '次卡或年卡',
                        '2': '孕妇卡',
                        '3': '产后卡'
                    };
                    for (var i = 0; i < cardList.length; i++) {
                        var item = cardList[i];
                        html += '<tr>' +
                            '<td><input type="radio" name="select-card" class="select-card" data-limit="' + item.card_limit + '" data-validity="' + item.cardValidity + '" data-count="' + item.cardCount + '" data-name="' + item.cardName + '" value="' + item.cardTypeId + '"></td>' +
                            '<td>' + (item.cardName || '') + '</td>' +
                            '<td>' + (item.cardCount || '') + '</td>' +
                            '<td>' + (item.cardValidity || '') + '</td>' +
                            '<td>' + (cardType[item.card_limit] || '') + '</td>' +
                            '</tr>'
                    }
                    $('#cardListTable').html(html);

                } else {
                    showNotice('获取卡中列表失败');
                }
            },
            error: function (err) {
                showNotice('网络连接失败');
            }
        })
    }

    getCardList();

    $('.form-inline').on('click', 'button', function () {
        var btnId = $(this).attr('id');
        switch (btnId) {
            case 'addCard':
                addCard()
                break;
            case 'changeCard':
                changeCard();
                break;
        }
    });

    function addCard() {
        $('#cardModal').modal('show');
        $('#cardTitle').text('添加卡种');
        $('.card-info').val('');

        $('#createBtn').text('确认添加').off().on('click', function () {
            var postData = {
                cardName: $('#cardName').val(),
                cardCount: $('#cardCount').val(),
                cardValidity: $('#cardValidity').val(),
                cardType: $('#cardType').val()
            };
            if (postData.cardName && postData.cardCount && postData.cardValidity) {
                $.ajax({
                    method: 'post',
                    url: '/card_type/create_card_type',
                    data: postData,
                    success: function (data) {
                        if (data.code === 0) {
                            $('#cardModal').modal('hide');
                            $('.card-info').val('');
                            showNotice('添加成功');
                            getCardList();
                        } else {
                            showNotice('添加失败');
                        }
                    },
                    error: function (err) {
                        showNotice('网络连接失败');
                    }
                })
            } else {
                showNotice('请完善卡种信息');
            }
        })
    };

    function changeCard() {
        var selected = $('.select-card:radio[name="select-card"]:checked');
        var cardid = selected.val();
        if (cardid) {
            $('#cardModal').modal('show');
            $('#cardTitle').text('修改卡种信息');
            var cardType = selected.attr('data-limit');
            var cardValidity = selected.attr('data-validity');
            var cardCount = selected.attr('data-count');
            var cardName = selected.attr('data-name');

            $('#cardName').val(cardName);
            $('#cardCount').val(cardCount);
            $('#cardValidity').val(cardValidity);
            $('#cardType').val(cardType);

            $('#createBtn').text('确认修改').off().on('click', function () {
                var postData = {
                    cardName: $('#cardName').val(),
                    cardCount: $('#cardCount').val(),
                    cardValidity: $('#cardValidity').val(),
                    cardType: $('#cardType').val(),
                    cardTypeId: cardid
                };
                if (postData.cardName && postData.cardCount && postData.cardValidity) {
                    $.ajax({
                        method: 'post',
                        url: '/card_type/update_card_type',
                        data: postData,
                        success: function (data) {
                            if (data.code === 0) {
                                $('#cardModal').modal('hide');
                                $('.card-info').val('');
                                selected.val('').attr('data-limit', '').attr('data-validity', '').attr('data-count', '').attr('data-name', '');
                                showNotice('添加成功');
                                getCardList();
                            } else {
                                showNotice('添加失败');
                            }
                        },
                        error: function (err) {
                            showNotice('网络连接失败');
                        }
                    })
                } else {
                    showNotice('请完善卡种信息');
                }
            });

        }
    }
})();