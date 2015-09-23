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


  // 카카오 공유 공유 버튼을 누르면 모달 팝업이 뜬다.
  var sharebtn = function(){
    console.log('sharebtn');
  } ;

  $('body').on('click', '.share > a', function(){
    var data = $(this).attr('data-id');
    var type = $(this).attr('data-class');
    if (type == "kakao") {
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
    } else if (type == "facebook") {
      // return callApi(url + "?id=" + data, response_facebook);
      console.log('facebook');
    }
  });

  // function response_kakao(json) {
  //   var video_list = json.content;
  //     video_list.forEach(function(v, i) {
  //         var item = v;
  //         var shareLink = "http://vikicast.com/index.html?utm_source=kakaoLink&utm_medium=social#" + item.id;
  //         console.log(shareLink);
  //         // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
  //         Kakao.Link.sendTalkLink({
  //           label: item.description,
  //           image: {
  //             src: item.picture,
  //             width: item.width,
  //             height: item.height
  //           },
  //           webButton: {
  //             text: "vikicast x " + item.name,
  //             url: shareLink // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
  //           },
  //           fail: Materialize.toast('카카오톡 링크는 모바일 기기에서만 전송 가능합니다.', 4000, 'rounded')
  //           // webLink : {
  //           //   text: item.name,
  //           //   url: 'http://facebook.com/' + item.id
  //           // }
  //         });
  //         // Kakao.Link.cleanup();
  //         // 카카오 공유를 GA로 추적
      //     ga('send', 'event', "shareLink", "sendkakao", item.id );
      //   });
      // }

      // 페이스북

      function response_facebook (json){
        var video_list = json.content;
          video_list.forEach(function(v, i) {
              var item = v;
              var shareLink = "http://vikicast.com/index.html?utm_source=kakaoLink&utm_medium=social#" + item.id;
              console.log(shareLink);

              FB.ui(
                {
                  method: 'share',
                  href: shareLink,
                },
                // callback
                function(response) {
                  if (response && !response.error_message) {
                    alert('Posting completed.');
                    ga('send', 'event', "shareLink", "sendfacebook", item.id );

                  } else {
                    alert('Error while posting.');
                  }
                }
              );
            });
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
                        "<div class='share center-align'>" +
                          "<a data-class='kakao' data-id='" + item.id + "'><i class='fa fa-comment circle brown-text'></i> 카톡 공유</a>  " +
                          "<a data-class='facebook' data-id='" + item.id + "'><i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유</a>" +
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
                      "<a data-class='kakao' data-id='" + item.id + "'><i class='fa fa-comment circle brown-text'></i> 카톡 공유</a>" +
                      "<a href='javascript:console.log($(this));' data-class='facebook' data-id='" + item.id + "'><i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유</a>" +
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
                          "<a class='waves-effect waves-light btn' data-class='kakao' data-id='" + item.id + "'><i class='fa fa-comment circle brown-text'></i> 카톡 공유</a>  " +
                          "<a class='waves-effect waves-light btn' data-class='facebook' data-id='" + item.id + "'><i class='fa fa-facebook-square circle indigo-text'></i> 페북 공유</a>" +
                        "</div>" +

                    "</div>"+
                  "</div>" ;

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
