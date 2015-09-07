jQuery(document).ready(function() {
    $(".button-collapse").sideNav();

    // var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true :
    // false );
    // console.log(iOS);
    // if (iOS) {
    // $( "a" ).click(function(e) {
    // window.alert = function() {};
    // var link = $(this).data('deeplink');
    // var url = $(this).attr("href");
    // setTimeout(function () { window.location = url; }, 1);
    // window.location = link;
    // // window.location.replace();
    // console.log(link);
    // e.stopPropagation();
    // e.preventDefault();
    // });

    // }

    // 검색 기능에 활용예정

    $('.button-collapse').sideNav({
        menuWidth : 240,
        activationWidth : 70
    });

    $('.btn-floating').click(function() {
        $('.search').slideDown(500).focus();
    });

});
