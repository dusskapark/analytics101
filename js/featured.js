(function($) {
	$(function() {
		//Tistory API 불러오기
		// 01. Authorization 요청 단계 (client -> Tistory)
			// 1) 티스토리에게 최초로 클라이언트(=컨슈머)가 인증을 요청합니다.
			// 2) server-side flow와 비교하면 response_type 의 값만 다릅니다.
		// 인증요청 URL : https://www.tistory.com/oauth/authorize
		// Parameter : client_id : 등록시 발급받은 client_id
		// redirect_uri : 등록시 등록한 redirect_uri
		// response_type : "token" 이라고 입력
		var tistory = {
				client_id : "3fbe3f176c1d16966d06eec77477e4c8",
				redirect_uri : "http://fevi.metadata.co.kr/index.html",
				response_type : "token"
		};


		jQuery.ajax({
			type:'get',
			dataType: 'jsonp',
	    url:"https://www.tistory.com/oauth/authorize?client_id=3fbe3f176c1d16966d06eec77477e4c8&redirect_uri=http://fevi.metadata.co.kr/index.html&response_type=token",
	    success:function(args){
				alert(args);
				alert("submit 성공");
    },
	});



	}); // end of document ready
})(jQuery); // end of jQuery name space
