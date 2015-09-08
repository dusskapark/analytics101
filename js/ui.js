jQuery(document).ready(function() {

  //Tistory RSS를 받아서 카드를 구성하기.
  // 홈/카테고리 별 화면 인식
  // if (location.pathname == "/") {
  //   // /로 구분을 한다고 상상하고..
  //   $("article,#comments-box,#paging").remove();
  //   $("body").css("padding-top", "75vh");
  //   $("#blog-home").show();
  //   $(".loadingSpinner").remove();
  // } else {
  //   $("article,#comments-box,#paging").show();
  //   $(".loadingSpinner").remove();
  // }
  // API 불러오기
  var recent_items = [];
  var blogUrl : "http://fordism.net/rss/xml";
  function loadViaRSS(n, l) {
    $.ajax({
          url : blogUrl,
          dataType : "xml",
          success : successFn
        });
      }
  //         success : function(t) {
  //           $(t)
  //               .find("content")
  //               .each(
  //                   function() {
  //                     var content = {};
  //                     var link, thumb, title, desc, date;
  //                     link = $(this).children("link")
  //                         .text();
  //                     // link = link.replace("http://",
  //                     //     "");
  //                     // if (link.split("/")[2] !== undefined)
  //                     //   link = "/"
  //                     //       + link.split("/")[1]
  //                     //       + "/"
  //                     //       + link.split("/")[2];
  //                     // else
  //                     //   link = "/"
  //                     //       + link.split("/")[1];
  //                     title = $(this).children(
  //                         "title").text();
  //                     date = $(this).children(
  //                         'pubDate').text();
  //                     desc = $(this).children(
  //                         "description").text();
  //                     if (desc
  //                         .match("http://cfile(.*?)\"") !== null) {
  //                       thumb = desc
  //                           .match("http://cfile(.*?)\"")[0];
  //                       thumb = thumb.substring(0,
  //                           thumb.length - 1);
  //                     } else {
  //                       thumb = "";
  //                     }
  //                     //텍스트만 남기기
  //                     desc = desc.replace(
  //                         /(<([^>]+)>)/ig, "");
  //
  //                     // 변수 만들기
  //                     item.link = link;
  //                     item.thumb = thumb;
  //                     item.title = title;
  //                     item.desc = desc;
  //                     item.date = date;
  //                     // recent_items.push(item);
  //                   });
  //           $("#recentPost li").each(addThumb("C40x40"));
  //           initHomeCards(n, l);
  //         },
  //         error : function() {
  //           console.log("RSS loading fail.");
  //         }
  //       });
  // }
  // function thumbSizing(blogUrl, size) {
  //   var s = blogUrl.replace("image", size);
  //   s = s.replace("original", size);
  //   return s;
  // }
  // // 최근 글 썸네일 생성
  // function addThumb(size) {
  //   return function() {
  //     var addr = $(this).children("a").attr("href");
  //     var r = $(this).find(".thumbnail");
  //     for (var i = 0; i < recent_items.length; ++i) {
  //       if (addr == decodeURIComponent(recent_items[i].link)) {
  //         s = thumbSizing(recent_items[i].thumb, size);
  //         r.attr("src", s);
  //         r.addClass("byRSS");
  //       }
  //     }
  //   };
  // }
  // // 메인화면 로딩
  // function initHomeCards(n, l) {
  //   if (location.pathname == "/") {
  //     m = Math.min(n, recent_items.length);
  //     var col;
  //     for (var i = 0; i < m; i++) {
  //       var tmpCard = "";
  //       tmpCard += '<div class="homeCardWrap col-md-6">';
  //       tmpCard += '	<div class="homeCard card ripplelink" onclick="window.open(\''
  //           + recent_items[i].link + '\',\'_self\')">';
  //       tmpCard += '		<img src="'
  //           + thumbSizing(recent_items[i].thumb, "C220x220")
  //           + '"/>';
  //       tmpCard += '		<div class="headAndDesc">';
  //       tmpCard += '			<h3>' + recent_items[i].title + '</h3>';
  //       tmpCard += '			<p>' + recent_items[i].desc.substring(0, l)
  //           + '...</p>';
  //       tmpCard += '		</div>';
  //       tmpCard += '	</div>';
  //       tmpCard += '</div>';
  //       $("#homeCards").append(tmpCard);
  //     }
  //     $("#homeCards").show();
  //   }
  // }
  // loadViaRSS(10, 40)// 홈화면&최근글 썸네일 로딩(RSS갯수,불러올 글자 수)
  //
  //
  //
  // // Show Modal when leaving site
  // var xValue, yValue;
  // var isYIncreasing;
  // $(document).mousemove(function(event) {
  //
  // 	var isYIncreasing = yValue > event.pageY;
  // 	xValue = event.pageX;
  // 	yValue = event.pageY;
  //
  // 	if (isYIncreasing && event.pageY < 25) {
  //
  // 		if ($.cookie('modal_shown') == null) {
  // 			$.cookie('modal_shown', 'yes', {
  // 				expires : 7,
  // 				path : '/'
  // 			});
  // 			$('#modal1').openModal();
  // 			analytics.track('Modal Shown', {
  // 				category : 'Newsletter',
  // 				label : 'New Shops',
  // 				value : 1
  // 			});
  // 		}
  //
  // 	}
  // });
  //
  // var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
  // console.log(iOS);
  // if (iOS) {
  // 	$("a").click(function(e) {
  // 		window.alert = function() {
  // 		};
  // 		var link = $(this).data('deeplink');
  // 		var blogUrl = $(this).attr("href");
  // 		setTimeout(function() {
  // 			window.location = blogUrl;
  // 		}, 1);
  // 		window.location = link;
  // 		// window.location.replace();
  // 		console.log(link);
  // 		e.stopPropagation();
  // 		e.preventDefault();
  // 	});
  // }
  //
  // if ($.cookie('search-box') == null) {
  // 	jQuery(".search-box").hide();
  // 	jQuery(".search-box").slideDown(1000);
  // 	$.cookie('search-box', 'yes', {
  // 		expires : 365,
  // 		path : '/'
  // 	});
  // } else {
  // 	jQuery(".search-box").show();
  // }
  //
  // // When user starts typing the form
  // jQuery('#emailField').one("keypress", function() {
  // 	analytics.track('Typing', {
  // 		category : 'Newsletter',
  // 		label : 'New Shops'
  //
  // 	});
  // });
  //
  // // 이메일 보내는 기능
  // jQuery( ".email-form" ).submit(function( event ) {
  //     event.preventDefault();
  //     ajaxurl = "/wp-admin/admin-ajax.php";
  //     jQuery('.progress').slideDown();
  //
  //     var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize());
  //
  //     sendIt.done(function( data ) {
  //         console.log(data);
  //         jQuery('.email-form').slideUp();
  //         jQuery('.success').slideDown();
  //         $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
  //         $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
  //         // When the form is submitted
  //         analytics.track('Subscribed', {
  //         category: 'Newsletter',
  //         label: 'New Shops',
  //         value: 1
  //         });
  //     });
  // });
  //
  //  jQuery( "#betaForm" ).submit(function( event ) {
  //     event.preventDefault();
  //     jQuery('.progress').slideDown();
  //     ajaxurl = "/wp-admin/admin-ajax.php";
  //     var checked = []
  //     $("input[name='platform[]']:checked").each(function ()
  //     {
  //         checked.push($(this).val());
  //     });
  //     checked = checked.join(", ");
  //
  //     var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize() + "&platforms=" + checked);
  //
  //     sendIt.done(function( data ) {
  //
  //         $("html, body").animate({ scrollTop: 0 }, "slow");
  //         jQuery('#joinBeta').slideUp();
  //         jQuery('#joinedBeta').slideDown();
  //
  //         $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
  //         $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
  //         analytics.track('Subscribed', {
  //         category: 'Newsletter',
  //         label: 'Beta',
  //         value: 1
  //         });
  //
  //     });
  // });

    $('.button-collapse').sideNav({
        menuWidth : 240,
        activationWidth : 70
    });

    $('.btn-floating').click(function() {
        $('.search').slideDown(500).focus();
    });

});
