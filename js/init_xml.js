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

// 클릭하면 아래에 카테고리 정보 추가
// $( ".category li a" ).on( "click", function( e ) {
//   console.log( "clicked", e.target );
//   var categoryUrl = url + "?category=" + e.target.className;
//   $( "#FeviCard" ).empty();
//   callApi( categoryUrl, response_json );
//
// });


    // #ID를 달고 브라우저를 직접 접속했을 때, hash를 ?id= 로 리다이렉트 시키는 것이 필요함.
    // if( window.location.hash !== "" ) {
    //   var IDis = window.location.hash;
    //   var URLis = window.location.search;
    //   // window.location.search = URLis + '&id=' + IDis;
    //   // callApi( url + window.location.search, response_json );
    // } else {
    //   callApi( url, response_json );
    // }

    // $("#addMore").click(function(e){
    //   console.log(window.location.search[page=]);
    // });



		//한글 페이지 파싱 라이브러리
		// $('#paging').paging({
		// 	item: "li",
		// 	itemClass: "waves-effect",
		// 	itemCurrent: "active",
		// 	format: "{0}",
		// 	next: "<i class='material-icons'>chevron_right</i>" ,
		// 	prev: "<i class='material-icons'>chevron_left</i>",
		// 	first: "<i class='material-icons'>arrow_back</i>",
		// 	last: "<i class='material-icons'>arrow_forward</i>",
		// 	current:json.number,
		// 	max:json.totalPages,
		// 	event: true,
		// 	// onclick: function(e,page){
			//   //page= 가 있나 없나?
			//   if ($search.category == "") {
			//     window.location.search = "?page=" + page;
			//   } else {
			//     window.location.search = "?category=" + $search.category + "&page=" + page;
			//     }
			//   }
		// });

		function response_share(json) {

      var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // 모달 카드를 구성한다
            var shareLink = "http://fevi.metadata.co.kr#" + item.id;
            $('.sendkakao').parents().find('h4').text(shareLink);
            $('.sendkakao').children('p').text('#fevi ' + item.description);
            $('.sendkakao').click(function() {
              // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
              Kakao.Link.sendTalkLink({
                image: {
                  src: item.picture,
                  width: item.width,
                  height: item.height
                },
                label: item.description,
                webButton: {
                  text: $('FEVI +' + item.name),
                  url: $(shareLink + "?utm_source=kakaoLink&utm_medium=social") // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
                },
                webLink : {
                  text: $('출처: '+ item.name),
                  url: $('http://facebook.com/' + item.id)
                }
              });
            });
          });
        };

				// Google spreadsheets api 카드 받아오기
	      var GSSurl = "https://spreadsheets.google.com/feeds/list/1xpRKoviu9XiM7jvzN2xD--V6S-FE9Dq16otBvntUImA/1/public/basic?alt=json-in-script&callback=?";

	      // 공지사항 받아오기
	      // callApi(GSSurl + "&sq=class=notice", additionalAPI );
	      callApi(GSSurl, additionalAPI );

	      function additionalAPI (data){
	        var data = data.feed.entry;
	        var splitArr = [ "data", "class" ];
	        var result = "";
	        data.forEach( function( v, j ) {

	          splitArr.forEach( function( val, i ) {
	           //  if( ( i + 1 ) < v.length ) {
	           //     result = data.substring( data.indexOf( v + ": " ), data.indexOf( ", " + splitArr[ i + 1 ] ) ).substr( v.length );
	           //  } else {
	           //    result =data.substring( data.indexOf( v + ": " ), data.length ).substr( v.length );
	           //  }

	            result = v.content.$t.substring( v.content.$t.indexOf( val + ": " ), ( ( i + 1 ) < val.length ) ? v.content.$t.indexOf( ", " + splitArr[ i + 1 ] ) : v.content.$t.length ).substr( val.length );

	         } );
	       });
	      }
				$.ajax({
          type : "GET",
          url : url+"?id="+data,
          dataType : "json",
          async: false,
          success: function(json) {
            var video_list = json.content;
            video_list.forEach(function(v, i) {
              var item = v;
              var shareLink = "http://vikicast.com/index.html?utm_source=kakaoLink&utm_medium=social#" + item.id;
                // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
                Kakao.Link.sendTalkLink({
                  label: item.description,
                  image: {
                    src: item.picture,
                    width: item.width,
                    height: item.height
                  },
                  webButton: {
                    text: "vikicast x " + item.name,
                    url: shareLink // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
                  },
                  fail: Materialize.toast('카카오톡 링크는 모바일 기기에서만 전송 가능합니다.', 4000, 'rounded')
                  // webLink : {
                  //   text: item.name,
                  //   url: 'http://facebook.com/' + item.id
                  // }
                });
                // Kakao.Link.cleanup();
                // 카카오 공유를 GA로 추적
                ga('send', 'event', "shareLink", "sendkakao", item.id );
              });
            }
        })


				// parse.com/
			  // Parse.initialize("TBRz2H449VzYCmZoL5sRuDyTjtmQ9zZnZaNz1elq", "5EjKZB05EG5St24i9FINXbrPImtuNSgskCBkI7zp");
			  //
			  // var TestObject = Parse.Object.extend("TestObject");
			  // var testObject = new TestObject();
			  //   testObject.save({foo: "bar"}, {
			  //   success: function(object) {
			  //     $(".success").show();
			  //   },
			  //   error: function(model, error) {
			  //     $(".error").show();
			  //   }
			  // });

				<div class="col s12 m4 l3 grid-item adsense">
					<div id='widthCheck' class="card">
						<div class="card-image">
							<img src="res/facebook/Untitled07.png">
						</div>
						<div class="card-content">
							<!-- FeviResponsive-01 -->
								<ins class="adsbygoogle RWD001"
								     style="display:block"
								     data-ad-client="ca-pub-0416537700421851"
								     data-ad-slot="5114260156"
								     data-ad-format="auto"></ins>
								<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
						</div>
					</div>
				</div>

				// // 광고 반복 횟수를 구한다.
        // var adNum = (json.number + 1) * 20 / 10;
        // for (var i = 0; i <= adNum; i++) {
        //   var v = i * 5 - 1;
        //   $('#FeviCard').children().eq(v).append(googleAdCard);
        // }


				// var addMore = "<div id='addMore' class='col s12 m4 l3 grid-item waves-effect waves-block waves-light'>" +
        //   "<div class='card small pink lighten-1 valign-wrapper white-text'>" +
        //     "<h5 class='valign center' style='width: 100%;'><i class='material-icons large'>playlist_add</i></h5>" +
        //   "</div>"+
        // "</div>";
        //
        // $("#FeviCard").children().last().append(addMore);



      // 연동규격
      var openAt = new Date,
          uagentLow = navigator.userAgent.toLocaleLowerCase(),
          chrome25,
          kitkatWebview;
      
      $("body").append("<iframe id='____sorilink____'></iframe>");
      $("#____sorilink____").hide();
      
      setTimeout( function() {
          if (new Date - openAt < 4000) {
              if (uagentLow.search("android") > -1) {
                  $("#____sorilink____").attr("src","market://details?id=com.app.fevir&hl=ko");
                } elss {
                  location.replace("http://vikicast.com/")
                }
              // } else if (uagentLow.search("iphone") > -1) {
                  // location.replace("https://itunes.apple.com/kr/app/solibada-myujig-mujehan-eum/id346528006?mt=8");
              // }
          }
      }, 1000);
      
      if(uagentLow.search("android") > -1){
          chrome25 = uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25;
          kitkatWebview = uagentLow.indexOf("naver") != -1 || uagentLow.indexOf("daum") != -1;
      
          if (chrome25 && !kitkatWebview){
              document.location.href = "intent://applink?param=value#Intent;scheme=soribada30;package=com.soribada.android;end";
          } else{
              $("#____sorilink____").attr("src", 'soribada30://applink?param=value');
          }
      }
      else if(uagentLow.search("iphone") > -1){
          $("#____sorilink____").attr("src", 'soribada30://applink?param=value');
      }
