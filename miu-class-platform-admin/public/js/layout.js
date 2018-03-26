(function () {
    function getMenuList() {
        var menuList = sessionStorage.getItem("menuList");
        if (menuList) {
            menuList = JSON.parse(menuList);
            var html = '';
            for (var i = 0; i < menuList.length; i++) {
                html += '<li class="menu-item">' +
                    '<a class="menu-href" href="' + menuList[i].menu_href + '">' +
                    '<div class="menu-icon">' +
                    '<span class="' + menuList[i].menu_icon + '"></span>' +
                    '</div>' +
                    '<span class="menu-info">' + menuList[i].menu_name + '</span>' +
                    '</a>' +
                    '</li>'
            }
            $('.menu-list').html(html);
        }
    }
    getMenuList()
})();