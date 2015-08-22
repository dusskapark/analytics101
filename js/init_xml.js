// 사용할 예정인.. js 코드모음

//Tistory RSS를 받아서 카드를 구성하기.

(function($) {
	$(function() {
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
		function loadViaRSS(n, l) {
			$
					.ajax({
						url : "./rss",
						dataType : "xml",
						success : function(t) {
							$(t)
									.find("content")
									.each(
											function() {
												var content = {};
												var link, thumb, title, desc, date;
												link = $(this).children("link")
														.text();
												link = link.replace("http://",
														"");
												if (link.split("/")[2] !== undefined)
													link = "/"
															+ link.split("/")[1]
															+ "/"
															+ link.split("/")[2];
												else
													link = "/"
															+ link.split("/")[1];
												title = $(this).children(
														"title").text();
												date = $(this).children(
														'pubDate').text();
												desc = $(this).children(
														"description").text();
												if (desc
														.match("http://cfile(.*?)\"") !== null) {
													thumb = desc
															.match("http://cfile(.*?)\"")[0];
													thumb = thumb.substring(0,
															thumb.length - 1);
												} else {
													thumb = "";
												}
												desc = desc.replace(
														/(<([^>]+)>)/ig, "");
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
						error : function() {
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
					tmpCard += '	<div class="homeCard card ripplelink" onclick="window.open(\''
							+ recent_items[i].link + '\',\'_self\')">';
					tmpCard += '		<img src="'
							+ thumbSizing(recent_items[i].thumb, "C220x220")
							+ '"/>';
					tmpCard += '		<div class="headAndDesc">';
					tmpCard += '			<h3>' + recent_items[i].title + '</h3>';
					tmpCard += '			<p>' + recent_items[i].desc.substring(0, l)
							+ '...</p>';
					tmpCard += '		</div>';
					tmpCard += '	</div>';
					tmpCard += '</div>';
					$("#homeCards").append(tmpCard);
				}
				$("#homeCards").show();
			}
		}
		loadViaRSS(10, 40)// 홈화면&최근글 썸네일 로딩(RSS갯수,불러올 글자 수)

	}); // end of document ready
})(jQuery); // end of jQuery name space


// Show Modal when leaving site
var xValue, yValue;
var isYIncreasing;
$(document).mousemove(function(event) {

	var isYIncreasing = yValue > event.pageY;
	xValue = event.pageX;
	yValue = event.pageY;

	if (isYIncreasing && event.pageY < 25) {

		if ($.cookie('modal_shown') == null) {
			$.cookie('modal_shown', 'yes', {
				expires : 7,
				path : '/'
			});
			$('#modal1').openModal();
			analytics.track('Modal Shown', {
				category : 'Newsletter',
				label : 'New Shops',
				value : 1
			});
		}

	}
});

var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
console.log(iOS);
if (iOS) {
	$("a").click(function(e) {
		window.alert = function() {
		};
		var link = $(this).data('deeplink');
		var url = $(this).attr("href");
		setTimeout(function() {
			window.location = url;
		}, 1);
		window.location = link;
		// window.location.replace();
		console.log(link);
		e.stopPropagation();
		e.preventDefault();
	});
}

if ($.cookie('search-box') == null) {
	jQuery(".search-box").hide();
	jQuery(".search-box").slideDown(1000);
	$.cookie('search-box', 'yes', {
		expires : 365,
		path : '/'
	});
} else {
	jQuery(".search-box").show();
}

// When user starts typing the form
jQuery('#emailField').one("keypress", function() {
	analytics.track('Typing', {
		category : 'Newsletter',
		label : 'New Shops'

	});
});

// 이메일 보내는 기능
jQuery( ".email-form" ).submit(function( event ) {
    event.preventDefault();
    ajaxurl = "/wp-admin/admin-ajax.php";
    jQuery('.progress').slideDown();

    var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize());

    sendIt.done(function( data ) {
        console.log(data);
        jQuery('.email-form').slideUp();
        jQuery('.success').slideDown();
        $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
        $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
        // When the form is submitted
        analytics.track('Subscribed', {
        category: 'Newsletter',
        label: 'New Shops',
        value: 1
        });
    });
});

 jQuery( "#betaForm" ).submit(function( event ) {
    event.preventDefault();
    jQuery('.progress').slideDown();
    ajaxurl = "/wp-admin/admin-ajax.php";
    var checked = []
    $("input[name='platform[]']:checked").each(function ()
    {
        checked.push($(this).val());
    });
    checked = checked.join(", ");

    var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize() + "&platforms=" + checked);

    sendIt.done(function( data ) {

        $("html, body").animate({ scrollTop: 0 }, "slow");
        jQuery('#joinBeta').slideUp();
        jQuery('#joinedBeta').slideDown();

        $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
        $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
        analytics.track('Subscribed', {
        category: 'Newsletter',
        label: 'Beta',
        value: 1
        });

    });
});

                        var card = "<div class='col s12 m12 l4 grid-item " + item.category + "'>" +
                            "<div class='card'>" +
                                "<div class='card-image waves-effect waves-block waves-light'>" +
                                    "<a href='#" + item.id + "' class='modal-trigger' ><img width='800' height='600' src=' " + item.picture + " ' class='responsive-img'/></a>" +
                                        "<span class='card-title'>" + item.category + "<i class='material-icons'>play_circle_filled</i></span>" +
                                "</div>" +
                                "<div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>" + item.name + "</span>" +
                                    "<p>" + item.description + "</p>" +
                                "</div>" +
                                "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right'>close</i></span>" +
                                "<ul class='collection'><li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle'>" +
                                    "<span class='title'>" + item.name + "</span>" +
                                    "<p>updated: " + item.updated_time + "</br>" +
                                        "created: " + item.created_time + "</p></li></ul>" +
                                "</div>" +
                              "</div>";

//클릭하면 해당 data-id 가져오기
															// var category = $(e.target).attr("class");
													    //url = 'http://munsangdong.cafe24.com/api/card?category=' + category;
													    // console.log(category);

													  });
													    // $( "body" ).on( "click", "i.fullscreen", function( e )  {
													    //     console.log(data-id);
													        // var id = $( e.currentTarget ).attr( "data-id" );
													        // var url_detail =  url + "?id=" + id;
													                // console.log(url_detail);
													//
													        // callApi( url_detail, detailCardFn );
													    // });

															// function detailCardFn( data ) {
															//
													    //   var $modal = $( "#modalfevi" ),
													    //       content = data.content[ 0 ];
													    //   // $modal.find( "h4" ).text( content.name ).end().find( "p" ).text( content.description ).end().
													    //   $modal.find( "h4" ).text( content.name );
													    //   $modal.find( "p" ).text( content.description );
													    //   $modal.find( "video" ).attr( {
													    //       src: content.source,
													    //       poster: content.picture
													    //   });
															//
													    //   $modal.show();
													    // };


// 클릭하면 추가
// $("body").on("click", "div.card-reveal", function(e) {
//   var dataid = $(this).attr("data-id");
//   var url_detail = url + "?id=" + dataid;
//   console.log(url_detail);
//   callApi(url_detail, datailCardFn);
// });
//
//
//     function datailCardFn( data ) {
//       data.content.forEach(function(v, i) {
//           var item = v;
//           // 카드를 구성한다
//           var detailCard = "<div class='col s12 m12 l4 >" +
//             "<div class='card blue-grey darken-1'>" +
//               "<div class='video-container'>" +
//                 "<span class='card-title'>" + item.name  + "</span>" +
//                   "<video controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "' style= 'width:" + item.width + "; max-width: 500px;' >" +
//                   "</video>" +
//                 "</div>"
//                 "<div class='card-content white-text'><p>" + item.description + "</p></div>" +
//                 "<div class='card-action'>"+
//                   "<a href='http://facebook.com/" + item.id + "' target='_blank' > 링크 </a>" +
//                 "</div>" +
//             "</div>" +
//           "</div>";
//           var divid = "#" + item.id;
//           $(divid).parent().append(detailCard);
//           $('.grid').isotope();
//       });
// }
//
//클릭하면 isotope으로 소팅하기
// $(".fullscreen").click(function() {
//   console.log(this);
		// var category = $(this).attr('class');
		// url = 'http://munsangdong.cafe24.com/api/card';
		// console.log(url);
		// $('.grid').isotope({ filter : '.' + category.toUpperCase() });
// });
