// (function () {
function getMenuList() {
    var menuList = sessionStorage.getItem("menuList");
    if (menuList) {
        menuList = JSON.parse(menuList);
        var htmlStr = '';
        for (var i = 0; i < menuList.length; i++) {
            htmlStr += '<li class="menu-item">' +
                '<a class="menu-href" href="' + menuList[i].menu_href + '">' +
                '<div class="menu-icon">' +
                '<span class="' + menuList[i].menu_icon + '"></span>' +
                '</div>' +
                '<span class="menu-info">' + menuList[i].menu_name + '</span>' +
                '</a>' +
                '</li>'
        }
        // $('.menu-list').html(htmlStr);
        $('#menuList').html(htmlStr);
    }
}

getMenuList();

$('.menu-href').each(function () {
    //parent
    var href = $(this).attr('href').toLocaleLowerCase();
    //url
    var pathname = location.pathname.toLocaleLowerCase();

    if (href === pathname) {
        $(this).css({
            'color': '#b2b2b2',
            'background': '#424242',
            'text-decoration': 'none'
        })
    }
});

function showNotice(str) {
    $('#noticeModal').modal('show');
    $('#message').text(str);
}
// })();