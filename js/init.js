$(document).ready(function() {
  // preloader 가동하기
  // $('#modal2').openModal();

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

    var url = "http://munsangdong.cafe24.com/api/card";
    var callApi = function( url, successFn ) {
        $.ajax({
            type : 'GET',
            url : url,
            dataType : "json",
            success : successFn
        });
    };

    // #ID를 달고 브라우저를 직접 접속했을 때, hash를 ?id= 로 리다이렉트 시키는 것이 필요함.
    if( window.location.hash !== "" ) {
      var URLis = "?id=" + window.location.hash.substr(1);
      $("#FeviCard").empty();

      callApi( url + URLis, response_id );
    //   console.log(window.location.search);
    //
    } else {
      callApi( url + window.location.search, response_json );
    }

    // addMore 버튼을 누르면 카드를 10개 더 추가한다.
    var addMoreCard = function( e ){
      var pageNm = $("#currentPage").text();
      var pageNmInt = Number(pageNm) + 1;
      // console.log(pageNmInt);
      var nextPageUrl = "?size=5&page=" + pageNmInt;
      $("#addMore").remove();
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
      window.location.hash = []
      /* refrence 부분 클릭시 이동하는 높이값 수정 */
        var tr;
        setTimeout(function(){
          tr=$('body').scrollTop()-100;
        },100);

        setTimeout(function(){
          $('body').scrollTop(tr);
        },200);

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

    // 공유 버튼을 누르면 모달 팝업이 뜬다.
    $("body").on("click", "i.sharing", function(e){
      var shareId = $(this).attr("data-id");
      console.log(shareId);
      callApi(url + "?id=" + shareId, response_share);
      $('#modal1').openModal();
    });

    function response_json(json) {
        var video_list = json.content;
        var addMore = "<div id='addMore' class='col s12 m12 l3 grid-item waves-effect waves-block waves-light'>" +
          "<div class='card small pink lighten-1 valign-wrapper white-text'>" +
            "<h5 class='valign center' style='width: 100%;'><i class='material-icons large'>playlist_add</i></h5>" +
          "</div>"+
        "</div>";

        video_list.forEach(function(v, i) {
            var item = v;
            // 카드를 구성한다
            var card = "<div class='col s12 m12 l3 grid-item " + item.category + "' id='" + item.id +  "''>" +
                "<div class='card'>" +
                    "<div class='card-image waves-effect waves-block waves-light'>" +
                            "<img src=' " + item.picture + " ' class='activator' alt='posterImage'>" +
                            "<span class='card-title'>" + item.category + "<i class='material-icons'>play_circle_filled</i></span>" +
                    "</div>" +
                    "<div class='card-content'>" +
                        "<span class='card-title activator grey-text text-darken-4 truncate' alt='titleText'><img src='" + item.profile_image + "' class='circle smallcircle'> " + item.name + "</span>" +
                            "<p class='activator' alt='description'>" + item.description + "</p>" +
                    "</div>" +
                    "<div class='card-reveal video-js-box' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right close'>close</i>"+
                    "</span>"+
                      // "<i class='fa fa-comment circle brown-text right sendkakao'></i></span>"+
                      // "<i class='material-icons sharing right' data-id=" + item.id + ">share</i></span>" +
                      // "<img src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small_ov.png' data-id='"+ item.id +"' class='circle right sendkakao'></span>"+
                        "<video width='100%' controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "'>" +
                        "</video>"+
                        "<ul class='collection'><li class='collection-item avatar dismissable sendkakao'><img src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small_ov.png' class='circle'>" +
                            "<span class='title'>[공유하기] " + item.name + "</span>" +
                            "<p>" + item.description + "</p>"+
                            "<a id='kakao-link-btn' href='javascript:;' class='secondary-content brown-text'><i class='material-icons'>send</i></a>"+
                            "</li></ul>" +
                    "</div>" +
                  "</div>" ;

                  Kakao.Link.createTalkLinkButton({
                    container: '.sendkakao',
                    image: {
                      src: item.picture,
                      width: item.width,
                      height: item.height
                    },
                    label: item.description,
                    webButton: {
                      text: item.name,
                      url: window.location.href + "?utm_source=kakaoLink&utm_medium=social" // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
                    },
                    fail: console.log('모바일에서 사용하시기 바랍니다.')
                    // webLink : {
                    //   text: item.name,
                    //   url: 'http://facebook.com/' + item.id
                    // }
                  });

                  Kakao.Link.cleanup();

            //카드를 화면에 표시한다.
            $('.grid').isotope('insert', $(card));
        });


        // $("#FeviCard").append(addMore);
        $('.grid').isotope('insert', $(addMore));


        //page 및 각종 앨리먼트 정보를 표시한다.
        $("#totalElements").text(json.totalElements);
        $("#totalPages").text(json.totalPages);
        $("#cardSize").text(json.size);
        $("#currentPage").text(json.number);
        $("#firstPage").text(json.first);
        $("#lastPage").text(json.last);




        $('.grid').imagesLoaded().done(function() {
          // $('#modal2').closeModal();
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
                    "<div class=' container ' data-id='" + item.id +"'>" +
                        "<video class='video-js vjs-default-skin' controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "' width='100%' >" +
                        "</video>" +
                        "<ul class='collection'>" +
                          "<li class='collection-item'>"+
                          "<span class='title pink-text'><strong>" + item.category + "</strong><i class='secondary-content pink-text material-icons sharing right' data-id=" + item.id + ">share</i></span>"+
                          "</li>"+
                          "<li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle responsive-img'>" +
                              "<span class='title'>" + item.name + "</span>" +
                              "<p>updated: " + item.updated_time + "</br>" +
                                  "created: " + item.created_time + "</p>"+
                              "<a href='http://facebook.com/" + item.id + "' target='_blank' class='secondary-content'><i class='material-icons pink-text'>send</i></a>"+
                          "</li>"+
                          "<li class='collection-item avatar'><i class='material-icons circle pink'>play_arrow</i>"+
                            "<span class='title'>Description</span>" +
                            "<p>"+ item.description +"</p>"+
                          "</li>"+
                          "<li class='collection-item avatar'><a href='./index.html'><i class='material-icons circle pink'>add</i>"+
                            "<span class='title'>더 많은 동영상 보기</span>" +
                            "<p>FEVI에서 더 많은 영상을 볼 수 있습니다. 지금 FEVI를 방문하세요! </p></a>"+
                          "</li>"+
                        "</ul>" +
                    "</div>"+
                  "</div>" ;

            //카드를 화면에 표시한다.
            $('.grid').isotope('insert', $(card));

            //ID로 접속한 경우에는 페이지 정보는 삭제한다.
            $("#video_list").remove();


            // ID 별로 파라메터를 따로 설정을 한다.
            var virtualPvByParam =  "index.html?id=" + item.id;
            console.log(virtualPvByParam);
            ga('send', 'pageview', virtualPvByParam);
        });
      }


    // google-analytics 카드 어디를 누를지 체크
    $("body").on("click", ".activator", function ( e ){
      var contentID = $(this).parents('div[id]').attr('id');
      var clickedPath = $(this).attr('alt');
      ga('send', 'event', "card-reveal", clickedPath, contentID  );
      });

    // 카드를 눌렀을 때는 해당 카드의 PV를 따로 잡는다.
    // hash를 따로 달고 날아오는 경우와 동일하게 통계를 잡는다.
    $("body").on("click", ".activator", function ( e ){
      var contentID = $(this).parents('div[id]').attr('id');
      var virtualPvByID = "index.html?id=" + contentID;
      console.log(virtualPvByID);
      ga('send', 'pageview', virtualPvByID);
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

    //google-analytics 비디오 플레이를 눌렀는지 체크
    $('body').on('click', '.card-reveal', function(e){
    //   var videID = $(this).parent().attr('data-id');
      // console.log(this);
    });

    // 하단 fix 버튼 클릭시 움직임
    $('#scrollTop').click(function(){
      $('html, body').animate({ scrollTop: 0}, "slow");
      return false;
    });

    // 더보기 버튼을 어떤 것을 많이 누를까?





});
