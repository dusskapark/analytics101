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

      $('#modal2').openModal({dismissible: false});
      callApi( url + URLis, response_id );
    //   console.log(window.location.search);
    //
    } else {
      $('#modal2').openModal({dismissible: false});
      callApi( url + window.location.search, response_json );
    }

    // addMore 버튼을 누르면 카드를 10개 더 추가한다.
    var addMoreCard = function( e ){
      var pageNm = $("#currentPage").text();
      var pageNmInt = Number(pageNm) + 1;
      var nextPageUrl = "";
      if ($search.page == undefined) {
        var nextPageUrl = "?page=" + pageNmInt;
      }else if ($search.category !== undefined) {
        var nextPageUrl = "?category=" + $search.category + "&page=" + pageNmInt;
        console.log(nextPageUrl);

      } else {
        var nextPageUrl = "?page=" + pageNmInt;
      }
      $("#addMore").remove();
      $('#modal2').openModal({dismissible: false});
      callApi(url + nextPageUrl, response_json);
    };

    // 카드를 누르면 카드가 확대된다.
    $("body").on("click", ".activator", function ( e ){
      window.location.hash = $(this).parents('div[id]').attr('id');
      $(this).parents(".grid-item").removeClass("grid-item s12 m12 l3").addClass("expanded s12 m12 l12");

      // 클릭시 비디오가 플레이 된다.
      // 모바일에서는 지극히 느려져서.. 삭제
        // var $play = $(this).parents('.card').children('div.card-reveal').children('video').get(0);
        // $play.play();

      $('.grid').isotope();
    });

    // 닫기를 누르면 카드가 다시 작아진다.
    var contractCard = function() {
      //비디오는 플레이가 중지된다.
      var $pause = $(document).find('.expanded').find('video').get(0);
      $pause.pause();

      $(document).find(".expanded").removeClass("expanded s12 m12 l12").addClass("grid-item s12 m12 l3");
      // 카드의 해쉬 값을 삭제한다.
      // window.location.hash = ""
      // /* refrence 부분 클릭시 이동하는 높이값 수정 */
      //   var tr;
      //   setTimeout(function(){
      //     tr=$('body').scrollTop()-100;
      //   },100);
      //
      //   setTimeout(function(){
      //     $('body').scrollTop(tr);
      //   },200);

      // 카드를 재 정렬한다.
      $('.grid').isotope();
      };
    // 카드를 닫기를 누르면 닫힌다.
    $( "body" ).on( "click", "div.card-reveal > span", function( e ) {
      contractCard();
    });

    //esc를 누르면 닫힌다.
    document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        contractCard();
    }
  };

    function response_json(json) {
        var video_list = json.content;
        var addMore = "<div id='addMore' class='col s12 m12 l3 grid-item waves-effect waves-block waves-light'>" +
          "<div class='card small pink lighten-1 valign-wrapper white-text'>" +
            "<h5 class='valign center' style='width: 100%;'><i class='material-icons large'>playlist_add</i></h5>" +
          "</div>"+
        "</div>";

        $( "#FeviCard" ).css( "visibility", "hidden" );

        video_list.forEach(function(v, i) {
            var item = v;

            var facebookUrl = "https://www.facebook.com/dialog/feed?"+
            "app_id=1463571523951964" +
            "&display=touch" +
            "&utm_source=facebookLink&utm_medium=social" +
            "&name=VIKICAST x " + item.name +
            "&caption=category: " + item.category +
            "&pictire=http://vikicast.com/res/facebook/Untitled05.png" +
            "&redirect_uri=http://vikicast.com/responseSuccess.html" +
            "&link=" + "http://vikicast.com/index.html#" + item.id;

            // 카드를 구성한다
            var card = "<div class='col s12 m12 l3 grid-item " + item.category + "' id='" + item.id +  "''>" +
                "<div class='card'>" +
                    "<div class='card-image waves-effect waves-block waves-light'>" +
                            "<img src=' " + item.picture + " ' class='activator' alt='posterImage'>" +
                            "<span class='card-title'>" + item.category +
                            // "<i class='fa fa-comment circle yellow darken-1 '></i><i class='fa fa-facebook-square circle indigo darken-4'></i>" +
                    "</div>" +
                    "<div class='card-content'>" +
                        "<span class='card-title activator grey-text text-darken-4 truncate' alt='titleText'><img src='" + item.profile_image + "' class='circle smallcircle'> " + item.name + "</span>" +
                            "<p class='activator' alt='description'>" + item.description + "</p>" +
                    "</div>" +
                    "<div class='card-reveal' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right close'>close</i>"+
                    "</span>"+
                        "<video width='100%' controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "'>" +
                        "</video>"+
                        "<a class='waves-effect waves-light btn pink ' onclick='callApi(url+\"?id=\"+"+ item.id +", response_kakao);'><i class='fa fa-comment circle white-text'></i> 카톡 공유</a>  " +
                        "<a class='waves-effect waves-light btn pink ' onclick='callApi(url+\"?id=\"+"+ item.id +", response_facebook);'><i class='fa fa-facebook-square circle white-text'></i> 페북 공유</a>" +

                        "<div class='adsense card'>" +
                          "<script async src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>" +
                          "<ins class='adsbygoogle' " +
                               "style='display:block' " +
                               "data-ad-client='ca-pub-0416537700421851' " +
                               "data-ad-slot='3599428156' " +
                               "data-ad-format='auto'></ins> " +
                          "<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>" +
                        "</div>" +

                        // "<ul class='collection'><li class='collection-item avatar' data-id='"+ item.id + "'><i class='fa fa-comment circle yellow darken-1 '></i>" +
                        //     "<span class='title truncate'>Vikicast x " + item.name + "</span>" +
                        //     "<p class='truncate'>출처: <a href='http://facebook.com/"+ item.id +"' target='_blank'>" + item.name + "</a></br>최종 수정일: "+ item.created_time +"</p>"+
                        //     "<a id='kakao-link-btn' href='javascript:;' class='secondary-content brown-text' data-id='"+ item.id + "'><i class='material-icons'>share</i></a>"+
                        //     "</li>"+
                        //     "<li class='collection-item avatar sendfacebook' data-id='"+ item.id + "'><i class='fa fa-facebook-square circle indigo darken-4'></i>" +
                        //     "<span class='title truncate'>Vikicast x " + item.name + "</span>" +
                        //     "<p class='truncate'>출처: <a href='http://facebook.com/"+ item.id +"' target='_blank'>" + item.name + "</a></br>최종 수정일: "+ item.created_time +"</p>"+
                        //     "<a id='fb-link-btn' href='javascript:;' class='secondary-content brown-text' data-id='"+ item.id + "'><i class='material-icons'>share</i></a>"+
                        //     "</li>"+
                        //     "</ul>" +
                    "</div>" +
                    "<div class='card-action share right-align'>" +
                      "<a onclick='callApi(url+\"?id=\"+"+ item.id +", response_kakao);'> <i class='fa fa-comment circle brown-text'></i> 카톡 공유</a>" +
                      "<a href='" + facebookUrl + "' target='_blank' width='360', height='640'> <i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유</a>" +
                    "</div>" +

                  "</div>" ;


            //카드를 화면에 표시한다.
            $('.grid').isotope('insert', $(card) );
            $('.grid').isotope();

        });


        // $("#FeviCard").append(addMore);
        // $('.grid').isotope('insert', $(addMore));


        //page 및 각종 앨리먼트 정보를 표시한다.
        $("#totalElements").text(json.totalElements);
        $("#totalPages").text(json.totalPages);
        $("#cardSize").text(json.size);
        $("#currentPage").text(json.number);
        $("#firstPage").text(json.first);
        $("#lastPage").text(json.last);


        var adCard = "<div class='adsense card medium'>" +
        "<div class='card-content'>" +
        "<!-- FeviResponsive-02 -->"
          "<ins class='adsbygoogle' " +
               "style='display:block' " +
               "data-ad-client='ca-pub-0416537700421851' " +
               "data-ad-slot='5076161358' " +
               "data-ad-format='auto'></ins> " +
          "<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>" +
        "</div>" +
        "</div>";

        $('.grid').isotope('insert', $(adCard) );
        $('.grid').isotope();



        $('.grid').imagesLoaded().done(function() {
          $('#modal2').closeModal();
          $( "#FeviCard" ).css( "visibility", "visible" );
          $('.grid').isotope();
        });
    };

    function response_id (json) {
      $("#addMoreCircle").remove();
        var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // 카드를 구성한다
            var card = "<div class='grid-item " + item.category + "'>" +
                    "<div class='container'>" +
                        "<video id='" + item.id + "' controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "' width='100%' >" +
                        "</video>" +
                        "<ul class='collection'>" +
                          "<li class='collection-item'>"+
                          "<span class='title pink-text'><strong>" + item.category + "</strong></span>"+
                          "</li>"+
                          "<li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle responsive-img'>" +
                              "<span class='title'>" + item.name + "</span>" +
                              "<p>"+ item.description +"</p>"+
                          "</li>"+
                          // "<li class='collection-item share'>"+
                          // "<i class='material-icons circle pink'>share</i>" +
                          // "<span class='title pink-text'><strong>공유하기</strong></span>:  "+
                          // "<a data-class='kakao' data-id='" + item.id + "'>카톡 공유 <i class='fa fa-comment circle brown-text'></i> </a>  " +
                          // "<a data-class='facebook' data-id='" + item.id + "'>페북 공유 <i class='fa fa-facebook-square circle indigo-text'></i> </a>" +
                          // "</span>" +
                          // "</li>"+
                          // "<li class='collection-item avatar ' data-id='"+ item.id + "'><img src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small_ov.png' class='circle'>" +
                          //     "<span class='title truncate'>Vikicast x " + item.name + "</span>" +
                          //     "<p class='truncate'>출처: <a href='http://facebook.com/"+ item.id +"' target='_blank'>" + item.name + "</a></br>최종 수정일: "+ item.created_time +"</p>"+
                          //     "<a id='kakao-link-btn' href='javascript:;' class='secondary-content brown-text' data-id='"+ item.id + "'><i class='material-icons pink-text'>share</i></a>"+
                          //     "</li>" +
                          //     "<li class='collection-item avatar' data-id='"+ item.id + "'><i class='fa fa-facebook-square circle indigo darken-4'></i>" +
                          //     "<span class='title truncate'>Vikicast x " + item.name + "</span>" +
                          //     "<p class='truncate'>출처: <a href='http://facebook.com/"+ item.id +"' target='_blank'>" + item.name + "</a></br>최종 수정일: "+ item.created_time +"</p>"+
                          //     "<a id='fb-link-btn' href='javascript:;' class='secondary-content brown-text' data-id='"+ item.id + "'><i class='material-icons'>share</i></a>"+
                          //     "</li>"+
                          "<li class='collection-item avatar'><a href='./index.html'><i class='material-icons circle pink'>add</i>"+
                            "<span class='title'>더 많은 동영상 보기</span>" +
                            "<p>Vikicast에서 더 많은 영상을 볼 수 있습니다. 지금 방문하세요! </p></a>"+
                          "</li>"+
                        "</ul>" +
                        "<div class='card-action share right-align'>" +
                          "<a class='waves-effect waves-light btn pink' href='javascript:callApi(url+\"?id=\"+"+ item.id +", response_kakao);'><i class='fa fa-comment circle white-text'></i> 카톡 공유</a>  " +
                          "<a class='waves-effect waves-light btn pink' href='javascript:callApi(url+\"?id=\"+"+ item.id +", response_facebook);'><i class='fa fa-facebook-square circle white-text'></i> 페북 공유</a>" +
                        "</div>" +

                    "</div>"+
                  "</div>" ;

            // 페이스북 메타 데이터 변경
            $("meta[property=og\\:url]").attr("content", location.href);
            // $("meta[property=og\\:type]").attr("content", item.category);
            $("meta[property=og\\:title]").attr("content", "[vikicast x" + item.name + "]");
            $("meta[property=og\\:description]").attr("content", item.description);
            $("meta[property=og\\:image]").attr("content", item.picture);

            //카드를 화면에 표시한다.
            $('.grid').isotope('insert', $(card) );
            $('.grid').isotope();
            $('#modal2').closeModal();


            //ID로 접속한 경우에는 페이지 정보는 삭제한다.
            $("#video_list").remove();


            // ID 별로 파라메터를 따로 설정을 한다.
            var virtualPvByParam =  "index.html?id=" + item.id;
            console.log(virtualPvByParam);
            ga('send', 'pageview', virtualPvByParam);

            // 비디오 플레이했는지 여부를 체크한다.
            var vid = document.getElementById(item.id);
            var vidID = $(vid).get(0);
            vidID.onplaying = function(){
              ga('send', 'event', "video played", item.id);
            }
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
      console.log(virtualPvByID);
      ga('send', 'pageview', virtualPvByID);

      //google-analytics 비디오 플레이를 눌렀는지 체크
      var vid = document.getElementById(contentID);
      var vidID = $(vid).find('video').get(0);
      // console.log(vidID);
      vidID.onplaying = function(){
        ga('send', 'event', "video played", contentID);
      }

      });

    // addmore 버튼 큰 것을 누르면 여기로 통계를 잡는다.
    $("body").on("click", "#addMore", function(){
      addMoreCard();
      ga('send', 'event', "Add More", "click-cardbtn" );

    });

    // addmore 버튼 작은 것은 여기서 통계를 잡는다.
    $("#addMoreCircle").click(function(){
      addMoreCard();
      ga('send', 'event', "Add More", "click-Floating" );
    });


    // 하단 fix 버튼 클릭시 움직임
    $('#scrollTop').click(function(){
      $('html, body').animate({ scrollTop: 0}, "slow");
      return false;
    });


});
