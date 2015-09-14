(function($) {
	$(function() {

		var callApi = function( url, successFn ) {
        $.ajax({
            type : 'GET',
            url : url,
            dataType : "json",
            success : successFn
        });
    };

		// Google spreadsheets api 카드 받아오기
		var GSSurl = "https://spreadsheets.google.com/feeds/list/1xpRKoviu9XiM7jvzN2xD--V6S-FE9Dq16otBvntUImA/1/public/basic?alt=json-in-script&callback=?";

		// 공지사항 받아오기
		callApi(GSSurl + "&sq=class=notice", additionalAPI );

		function additionalAPI (data){
			var entry = data.feed.entry; //구글 스프레드 시트의 모든 내용은 feed.entry에 담겨있습니다.
			entry.forEach(function(v, i) {
				var item = v.content.$t.substr(5);
				var grid = $('.grid').children()[Math.floor((Math.random() * 20) + 1)];
				grid.isotope('insert', $(item));
				$('.grid').isotope();


				});
			}





	}); // end of document ready
})(jQuery); // end of jQuery name space
