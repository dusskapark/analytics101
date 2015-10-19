$(document).ready(function() {

  $('.button-collapse').sideNav({
      menuWidth : 240,
      activationWidth : 70
  });

  $('.grid').isotope({
          itemSelector : '.grid-item',
          masonry : {
              columnWidth : 50,
              gutter : 10
          }
      });


  // 사용할 앱의 JavaScript 키를 설정해 주세요.
  Kakao.init('d0dd75755ece80295a757c6042496f9b');

  // facebook 공유하기
  $.ajaxSetup({ cache: true });
  $.getScript('http://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1463571523951964',
      version: 'v2.4' // or v2.0, v2.1, v2.2, v2.3
    });
  });



  //URL 파싱하기
  var $search = function() {
    var s = window.location.search.substr(1),p = s.split(/\&/),l = p.length,kv,r = {};
    if (l === 0) {return false;}
    while (l--) {
      kv = p[l].split(/\=/);
      r[kv[0]] = decodeURIComponent(kv[1] || '') || true;
    }
    return r;
  }();

    url = "http://munsangdong.cafe24.com/api/card";
    callApi = function( url, successFn ) {
        $.ajax({
            type : 'GET',
            url : url,
            dataType : "json",
            success : successFn,
        });
    };

    // #ID를 달고 브라우저를 직접 접속했을 때, hash를 ?id= 로 리다이렉트 시키는 것이 필요함.
    if( window.location.hash !== "" ) {
      var URLis = "?id=" + window.location.hash.substr(1);  
      $("#FeviCard").empty();

      // $('#modal2').openModal({dismissible: false});
      callApi( url + URLis, response_id );
    } else {
      // $('#modal2').openModal({dismissible: false});
      callApi( url + window.location.search, response_json );
    }


    // 카드를 누르면 카드가 확대된다.
    $("body").on("click", ".activator", function ( e ){
      window.location.hash = $(this).parents('div[id]').attr('id');
      // var heightExpanded = $(this).parents('.card').attr('data-height');
      // $(this).parents('.card').removeClass('small').attr('min-height', heightExpanded);
       $(this).parents('.card').removeClass('small').addClass('large')
      $(this).parents(".grid-item").removeClass("s12 m4 l3 grid-item").addClass("expanded s12 m12 l12");
      $('.grid').isotope();


      // 카드를 눌렀을 때는 해당 카드의 PV를 따로 잡는다.
      var virtualPvByID = "index.html?id=" + window.location.hash.substr(1);
      ga('send', 'pageview', virtualPvByID);
    });

    // 닫기를 누르면 카드가 다시 작아진다.
    var contractCard = function() {
      //비디오는 플레이가 중지된다.
      $(document).find('.expanded').find('video').get(0).pause();
      // $(this).parents('.card').attr('height', '').addClass('small');
      $(document).find('.expanded').removeClass('expanded s12 m12 l12').addClass('s12 m4 l3 grid-item');


      // 카드를 재 정렬한다.
      $('.grid').isotope();
      };

    // 카드를 닫기를 누르면 닫힌다.
    $( "body" ).on( "click", "div.card-reveal > span", function( e ) {
      $(this).parents('.card').removeClass('large').addClass('small')

      contractCard();

      // 카드를 재 정렬한다.
      $('.grid').isotope();

    });

    //esc를 누르면 닫힌다.
    document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      // 카드가 다시 작아진다.
      $(document).find(".expanded").find('div.card-reveal > span').trigger('click');

    }
  };

  // 구글 광고
  var googleAdCard = "<div class='col s12 m12 l12 grid-item adsense'>" +
  "<div class='card pink lighten-5 white-text'>" +
  "<div class='card-image'>" +
    "<ins class='adsbygoogle' " +
         "style='display:block' " +
         "data-ad-client='ca-pub-0416537700421851' " +
         "data-ad-slot='8427653357' " +
         "data-ad-format='auto'></ins> " +
    "<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>" +
    // "<span class='card-title'>Adsense</span>"+
    "</div>" +
    // "<div class='card-content'>" +
    // "<ins class='adsbygoogle' " +
    //      "style='display:block' " +
    //      "data-ad-client='ca-pub-0416537700421851' " +
    //      "data-ad-slot='4078178953' " +
    //      "data-ad-format='auto'></ins> " +
    // "<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>" +
    // "</div>" +
  "</div>" +
  "</div>";

    function response_json(json) {

      // 현재 로드된 스크린에서 카드의 가로 사이즈 찾기
      var widthCheck =  $('#widthCheck').width();
      $('#widthCheck').css('display', 'none')

      var video_list = json.content;

      // $( "#FeviCard" ).css( "visibility", "hidden" );
      video_list.forEach(function(v, i) {
        var item = v;

        // 현재 로드된 스크린에서 카드의 높이를 계산함
        var heightCheck = item.height * widthCheck / item.width + 173;

        // facebook 공유 기능
        var facebookUrl = "https://www.facebook.com/dialog/feed?"+
        "app_id=1463571523951964" +
        "&display=touch" +
        "&name=VIKICAST x " + item.name +
        "&caption=category:" + item.category +
        "&description=너만 못본 그 영상! 여기 다 있다~" +
        "&pictire=http://vikicast.com/res/facebook/Untitled05.png" +
        "&redirect_uri=http://vikicast.com/responseSuccess.html" +
        "&link=http://vikicast.com/index.html?utm_source=facebookLink&utm_medium=social#" + item.id;

        // 카드를 구성한다
        var card = "<div class='col s12 m4 l3 grid-item " + item.category + "' id='" + item.id +  "'>" +
            "<div class='card small' data-height='"+ heightCheck +"'>" +
            // "<div class='card' height='"+ heightCheck +"px'>" +
                "<div class='card-image waves-effect waves-block waves-light'>" +
                        "<img src=' " + item.picture + " ' class='activator' alt='VIKICAST' >" +
                        "<span class='card-title'>" + item.category + "</span>" +
                "</div>" +
                "<div class='card-content'>" +
                    "<span class='card-title activator grey-text text-darken-4 truncate' alt='titleText'><img src='" + item.profile_image + "' class='circle smallcircle'> " + item.name + "</span>" +
                        "<p class='activator truncate' alt='description'>" + item.description + "</p>" +
                "</div>" +
                "<div class='card-reveal' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right close'>close</i></span>"+
                  "<div class='container center-align'>" +
                    "<video width='90%' height='300px' controls preload='auto' poster='" + item.picture + "' src='" + item.source + "' >" +
                    "</video>"+
                    "<p class='activator left-align' alt='description'>" + item.description + "</p>" +
                  "</div>" +
                  "<div class='right-align'>"+
                      "<a class='waves-effect waves-pink btn-flat' href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareKakao);' ><i class='fa fa-comment circle brown-text'></i> 카톡 공유  </a>" +
                      "<a class='waves-effect waves-pink btn-flat' href='" + facebookUrl + "', target='_blank', width='360', height='640'> <i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유  </a>" +
                      // "<a class='waves-effect waves-pink btn-flat' href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareTwitter);'> <i class='fa fa-twitter circle blue-text'></i> 트윗 공유  </a>" +
                  "</div>"+
                  // "<div class='adsense center-align'>"+
                  //   "<ins class='adsbygoogle' " +
                  //      "style='display:inline-block;width:468px;height:60px'" +
                  //      "data-ad-client='ca-pub-0416537700421851' " +
                  //      "data-ad-slot='6703607615'></ins>" +
                  // "<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"+
                  // "</div>"+
                "</div>" +
                "<div class='card-action truncate'>" +
                  "<a href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareKakao);' > <i class='fa fa-comment circle brown-text'></i> 카톡 공유</a>" +
                  "<a href='" + facebookUrl + "', target='_blank', width='360', height='640'> <i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유</a>" +
                  // "<a href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareTwitter);'> <i class='fa fa-twitter circle blue-text'></i> 트윗 공유</a>" +
                  // "<a href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareStory);'><img src='https://dev.kakao.com/assets/img/about/buttons/kakaostory/brand_assets/digital/story_symbol.png' class='circle'></a>"
                "</div>" +
              "</div>" ;


            //카드를 화면에 표시한다.
            $('.grid').isotope('insert', $(card) );


            // 카드를 정렬한다.
            $('.grid').isotope();

        });

        //page 및 각종 앨리먼트 정보를 표시한다.
        $("#totalElements").text(json.totalElements);
        $("#totalPages").text(json.totalPages);
        $("#cardSize").text(json.size * json.number);
        $("#currentPage").text(json.number + 1);
        $("#firstPage").text(json.first);
        $("#lastPage").text(json.last);

        $('.grid').imagesLoaded().done(function() {
          // $('#modal2').closeModal();
          // $( "#FeviCard" ).css( "visibility", "visible" );
          $('#FeviCard').children().last().append(googleAdCard);
          $('.grid').isotope();
        });

    };

            player = videojs('content_video');
            options = {
              id: 'content_video',
              adTagUrl: 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
            };

            player.ima(options);
            player.ima.requestAds();
            // On mobile devices, you must call initializeAdDisplayContainer as the result
            // of a user action (e.g. button click). If you do not make this call, the SDK
            // will make it for you, but not as the result of a user action. For more info
            // see our examples, all of which are set up to work on mobile devices.
            // player.ima.initializeAdDisplayContainer();
            player.play();

    function response_id (json) {
      $("#addMoreCircle").remove();
        var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // facebook 공유 기능
            var facebookUrl = "https://www.facebook.com/dialog/feed?"+
            "app_id=1463571523951964" +
            "&display=touch" +
            "&name=VIKICAST x " + item.name +
            "&caption=category:" + item.category +
            "&description=너만 못본 그 영상! 여기 다 있다~" +
            "&pictire=http://vikicast.com/res/facebook/Untitled05.png" +
            "&redirect_uri=http://vikicast.com/responseSuccess.html" +
            "&link=http://vikicast.com/index.html?utm_source=facebookLink&utm_medium=social#" + item.id;

            // 카드를 구성한다
            var card = "<div class='col s12 m12 l12 grid-item " + item.category + "'>" +
                    "<div class='container '>" +
                        "<video class='center-align video-js vjs-default-skin ' id='content_video' poster='" + item.picture + 
                        "' controls preload='auto' width='100%' >"+
                          "<source src='" + item.source + "' />" +
                        "</video>" +
                        "<ul class='collection'>" +
                          "<li class='collection-item'>"+
                          "<span class='title pink-text'><strong>" + item.category + "</strong></span>"+
                          "</li>"+
                          "<li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle responsive-img'>" +
                              "<span class='title'>" + item.name + "</span>" +
                              "<p>"+ item.description +"</p>"+
                          "</li>"+
                          "<li class='collection-item avatar'><a href='./index.html'><i class='material-icons circle pink'>add</i>"+
                            "<span class='title'>더 많은 동영상 보기</span>" +
                            "<p>Vikicast에서 더 많은 영상을 볼 수 있습니다. 지금 방문하세요! </p></a>"+
                          "</li>"+
                          "<li class='collection-item'>" +
                            "<div class='right-align'>"+
                                "<a class='waves-effect waves-pink btn-flat' href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareKakao);' ><i class='fa fa-comment circle brown-text'></i> 카톡 공유  </a>" +
                                "<a class='waves-effect waves-pink btn-flat' href='" + facebookUrl + "', target='_blank', width='360', height='640'> <i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유  </a>" +
                                // "<a class='waves-effect waves-pink btn-flat' href='javascript:callApi(url+\"?id=\"+"+ item.id +", shareTwitter);'> <i class='fa fa-twitter circle blue-text'></i> 트윗 공유  </a>" +
                            "</div>"+
                          "</li>" +
                        "</ul>" +
                      "</div>" +
                    "</div>"+

                  "</div>" ;

            //카드를 화면에 표시한다.

            $('.grid').isotope('insert', $(card) );
            $('.grid').isotope();
            // $('#modal2').closeModal();



            //ID로 접속한 경우에는 페이지 정보는 삭제한다.
            $("footer > div.container").remove();


            // ID 별로 파라메터를 따로 설정을 한다.
            var virtualPvByParam =  "index.html?id=" + item.id;
            ga('send', 'pageview', virtualPvByParam);

            // 비디오 플레이했는지 여부를 체크한다.
            var vid = document.getElementById(item.id);
            var vidID = $(vid).get(0);
            vidID.onplaying = function(){
              ga('send', 'event', "video played", item.id);
            }
        });

        $('.grid').imagesLoaded().done(function() {
          $('.grid').isotope();
        });

      }

    // google-analytics 카드 어디를 누를지 체크
    $("body").on("click", ".activator", function ( e ){
      var contentID = $(this).parents('div[id]').attr('id');
      var clickedPath = $(this).attr('alt');
      ga('send', 'event', "card-reveal", clickedPath, contentID  );

      // 카드를 눌렀을 때는 해당 카드의 PV를 따로 잡는다.
      // hash를 따로 달고 날아오는 경우와 동일하게 통계를 잡는다.
      var virtualPvByID = "index.html?id=" + contentID;
      ga('send', 'pageview', virtualPvByID);

      //google-analytics 비디오 플레이를 눌렀는지 체크
      var vid = document.getElementById(contentID);
      var vidID = $(vid).find('video').get(0);
        vidID.onplaying = function(){
          ga('send', 'event', "video played", contentID);
        }

      });
  

    // addMore 버튼을 누르면 카드를 10개 더 추가한다.
    addMoreCard = function( e ){
      var pageNm = $("#currentPage").text();
      var pageNmInt = Number(pageNm);
      var nextPageUrl = "";
      if ($search.category !== undefined) {
        var nextPageUrl = "?category=" + $search.category + "&page=" + pageNmInt;
        // console.log(nextPageUrl);

      } else {
        var nextPageUrl = "?page=" + pageNmInt;
        // console.log(nextPageUrl);

      }
      $("#addMore").remove();
      // $('#modal2').openModal({dismissible: false});
      callApi(url + nextPageUrl, response_json);
    };

    // addmore 버튼 작은 것은 여기서 통계를 잡는다.
    $("#addMoreCircle").click(function(){
      addMoreCard();
      ga('send', 'event', 'Add More', 'click-Floating' );
    });


    // 하단 fix 버튼 클릭시 움직임
    $('#scrollTop').click(function(){
      $('html, body').animate({ scrollTop: 0}, "slow");
      return false;
    });


});
