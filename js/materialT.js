
//검색창
function blogSearch(q) {
	$("body,html").animate({
		scrollTop: "0"
	});
	$("#search-resultWrap").addClass("opened appearing");
	$("#search-result").html('');
	$("#search-result").load(location.origin + '/search/' + encodeURI(q) + ' #searchList',
		function() {
			$("#search-result").append('<div class="moreResult flatbutton"><a href="' + location.origin + '/search/' + encodeURI(q) + '">검색결과 전체 보기</a></div>');
			$("#search-resultWrap").css("height", ($("#search-result").height() + 70) + "px");
		}
	);
}

function closeBlogSearch() {
	$("#search-resultWrap").removeClass("opened appearing");
	$("#search-result").html('');
}
function desktopMode() {
	if (isMobile == "mobile" || isMobile == "tablet") {
		if (desktopModeSwitch == "on") {
			sessionStorage.desktopModeSwitch = "off";
			location.reload();
		} else {
			alert("페이지 하단의 버튼을 누르면 원래대로 돌아옵니다.");
			window.scrollTo(0, 0);
			sessionStorage.desktopModeSwitch = "on";
			location.reload();
		}
	} else {
		alert("모바일이 아니군요!");
	}
}

$(document).ready(function() {
		//상단바 검색창 토글하기
		$("header #search-box>input").blur(function() {
			$("header #search-box").removeClass("opened");
		});
		$("header a.search-icon").click(function() {
			$("header #search-box").addClass("opened");
			$("header #search-box>input").focus();
		});

		$("#search-result-close").click(function() {
				closeBlogSearch();
			});
			// 사이드바 정렬
		var sidebarArr = $("aside>.sidebar-temp>div,aside>.sidebar-temp>section");
		var col1 = $("aside>#sidebar-col1");
		var col2 = $("aside>#sidebar-col2");
		var cols = 2; //기본2열
		if ($("html").outerWidth() < 768) {
			cols = 1;
		}

		function orderSidebar() {
			$("aside .appearing").removeClass("appearing");
			for (var i = 0; i <= sidebarArr.length; i++) {
				$("aside .sidebar-temp").append(sidebarArr[i]);
			}
			j = 0;
			var repeat = setInterval(function() {
				if (cols == 2) {
					if (col1.height() <= col2.height()) {
						col1.append(sidebarArr[j]);
					} else {
						col2.append(sidebarArr[j]);
					}
				} else {
					col1.append(sidebarArr[j]);
				}
				j++;
				if (j == sidebarArr.length) {
					clearInterval(repeat);
				}
			}, 150);
		}

		$(window).resize(function() {
			var old_cols = cols;
			if ($("html").outerWidth() < 768) {
				cols = 1;
			} else {
				cols = 2;
			}
			if (old_cols !== cols) {
				orderSidebar();
			}
		});

		function loadSidebar() {
			if (($(window).scrollTop() + $(window).innerHeight() + 100) > $("aside").offset().top) {
				if (sbloaded === 0) {
					orderSidebar();
					sbloaded++;
				}
			}
		}
		var sbloaded = 0;
		loadSidebar();

		//스크롤 이벤트
		$(window).scroll(function() {
				loadSidebar();
				if ($(".homeBG").length !== 0) $(".homeBG").css("background-position-y", ($(window).scrollTop() * 0.5));
					//홈화면 배경 스크롤
				if ($(window).scrollTop() === 0) {
					$("#toTop").hide();
				} else {
					$("#toTop").show();
				}
			});
			//데스크탑모드 전환
		if (navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
			isMobile = "mobile";
		} else if (navigator.userAgent.match(/Android|iPad/)) {
			isMobile = "tablet";
		} else {
			isMobile = "notMobile";
		}

		if (desktopModeSwitch == "on" && (isMobile == "mobile" || isMobile == "tablet")) {
			$("body").append('<button onclick="desktopMode()" style="width:100%;font-size: 3em;color:#999;padding:2em;border: gray solid .3em;">모바일 화면으로 돌아가기</button>');
		}
		//ink 효과
		var ink, ink_id, d, x, y;
		ink_id_arr = [];
		$(".ripplelink").mousedown(function(e) {
			ink_id = "ink" + Math.round(Math.random() * 1000);
			ink_id_arr.push(ink_id);
			$(this).prepend("<span class='ink " + ink_id + "'></span>");
			ink = $(this).find("." + ink_id);
			if (!ink.height() && !ink.width()) {
				d = Math.max($(this).outerWidth(), $(this).outerHeight());
				ink.css({
					height: d,
					width: d
				});
			}
			x = e.pageX - $(this).offset().left - ink.width() / 2;
			y = e.pageY - $(this).offset().top - ink.height() / 2;
			ink.css({
				top: y + 'px',
				left: x + 'px'
			}).addClass("animate");
			window.setTimeout(function(){$("."+ink_id_arr[0]).remove();ink_id_arr.shift();}, 900);
		});
		// 표 감싸기
		$("table,iframe,object").each(function() {
			if ($(this).outerWidth() > $(".container").width()){
					$(this).wrap("<div class=scrollableTable></div>");
				}
			});
			//사이드바 제목 클릭
		$("aside .card-header").click(function() {
			$(this).toggleClass("lessed");
		});
});