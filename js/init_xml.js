(function($){
  $(function(){
		// 홈/카테고리 별 화면 인식
		if (location.pathname == "/") {
			// /로 구분을 한다고 상상하고..
			$("article,#comments-box,#paging").remove();
			$("body").css("padding-top", "75vh");
			$("#blog-home").show();
			$(".loadingSpinner").remove();
		} else {
			$("article,#comments-box,#paging").show();
			$(".loadingSpinner").remove();
		}
		// API 불러오기
		var recent_items = [];
		function loadViaFeviApi (n,l){
			$.ajax({
				url: "./sample.json",
				dataType: "json",
				success: function(t) {
					$(t).find("content").each(function() {
						var content = {};
						var link, thumb, title, desc, date;
						link = $(this).children("link").text();
						link = link.replace("http://", "");
						if (link.split("/")[2] !== undefined) link = "/" + link.split("/")[1] + "/" + link.split("/")[2];
						else link = "/" + link.split("/")[1];
						title = $(this).children("title").text();
						date = $(this).children('pubDate').text();
						desc = $(this).children("description").text();
						if (desc.match("http://cfile(.*?)\"") !== null) {
							thumb = desc.match("http://cfile(.*?)\"")[0];
							thumb = thumb.substring(0, thumb.length - 1);
						} else {
							thumb = "";
						}
						desc = desc.replace(/(<([^>]+)>)/ig, "");
						item.link = link;
						item.thumb = thumb;
						item.title = title;
						item.desc = desc;
						item.date = date;
						recent_items.push(item);
					});
					$("#recentPost li").each(addThumb("C40x40"));
					initHomeCards(n, l); 
				},
				error: function() {
					console.log("RSS loading fail.");
				}
			});
		}
		function thumbSizing(url, size) {
				var s = url.replace("image", size);
				s = s.replace("original", size);
				return s;
			}
			// 최근 글 썸네일 생성
		function addThumb(size) {
				return function() {
					var addr = $(this).children("a").attr("href");
					var r = $(this).find(".thumbnail");
					for (var i = 0; i < recent_items.length; ++i) {
						if (addr == decodeURIComponent(recent_items[i].link)) {
							s = thumbSizing(recent_items[i].thumb, size);
							r.attr("src", s);
							r.addClass("byRSS");
						}
					}
				};
			}
			// 메인화면 로딩
		function initHomeCards(n, l) {
			if (location.pathname == "/") {
				m = Math.min(n, recent_items.length);
				var col;
				for (var i = 0; i < m; i++) {
					var tmpCard = "";
					tmpCard += '<div class="homeCardWrap col-md-6">';
					tmpCard += '	<div class="homeCard card ripplelink" onclick="window.open(\'' + recent_items[i].link + '\',\'_self\')">';
					tmpCard += '		<img src="' + thumbSizing(recent_items[i].thumb, "C220x220") + '"/>';
					tmpCard += '		<div class="headAndDesc">';
					tmpCard += '			<h3>' + recent_items[i].title + '</h3>';
					tmpCard += '			<p>' + recent_items[i].desc.substring(0, l) + '...</p>';
					tmpCard += '		</div>';
					tmpCard += '	</div>';
					tmpCard += '</div>';
					$("#homeCards").append(tmpCard);
				}
				$("#homeCards").show();
			}
		}
		loadViaRSS (10,40)// 홈화면&최근글 썸네일 로딩(RSS갯수,불러올 글자 수)

	  

  }); // end of document ready
})(jQuery); // end of jQuery name space

