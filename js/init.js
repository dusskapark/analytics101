$(document).ready(function() {

    var url = "http://munsangdong.cafe24.com/api/card";
    var callApi = function( url, successFn ) {
        $.ajax({
            type : 'GET',
            url : url,
            dataType : "json",
            success : successFn
        });
    };
    // callApi( url + window.location.search, response_json );

    // #ID를 달고 브라우저를 직접 접속했을 때, hash를 ?id= 로 리다이렉트 시키는 것이 필요함.
    if( window.location.hash !== "" ) {
      var URLis = "?id=" + window.location.hash.substr(1);
    //   // window.location.hash = "";
      callApi( url + URLis, response_id );
    //   console.log(window.location.search);
    //
    } else {
      callApi( url + window.location.search, response_json );
    }

    // 카드를 누르면 카드가 확대된다.
    $("body").on("click", ".activator", function ( e ){
      window.location.hash = $(this).parents('div[id]').attr('id');
      console.log(window.location.hash);
      $(this).parents(".grid-item").removeClass("grid-item s12 m12 l3").addClass(".grid expanded s12 m12 l12");

      // 클릭시 비디오가 플레이 된다.
      // 모바일에서는 지극히 느려져서.. 삭제
        // var $play = $(this).parents('.card').children('div.card-reveal').children('video').get(0);
        // $play.play();

      $('.grid').isotope();
    });

    // 닫기를 누르면 카드가 다시 작아진다.
    $( "body" ).on( "click", "div.card-reveal > span", function( e )  {
      $(this).parents(".expanded").removeClass(".grid expanded s12 m12 l12").addClass("grid-item s12 m12 l3");

      //비디오는 플레이가 중지된다.
        var $pause = $(this).parents('.card-reveal').children('video').get(0);
        $pause.pause();

      $('.grid').isotope();
    });

    // 공유 버튼을 누르면 모달 팝업이 뜬다.
    $("body").on ("click", "i.sharing", function(e){
      var sharing = $(this).attr("data-id");
      console.log(sharing);
      $('#modal1').openModal();

    });


    function response_json(json) {
      console.log(json);
        var video_list = json.content;
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
                    "<div class='card-reveal' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right close'>close</i><i class='material-icons sharing right' data-id=" + item.id + ">share</i></span>" +
                        "<video controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "' width='100%' >" +
                        "</video>" +
                        "<ul class='collection'><li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle responsive-img'>" +
                            "<span class='title'>" + item.name + "</span>" +
                            "<p>updated: " + item.updated_time + "</br>" +
                                "created: " + item.created_time + "</p></li></ul>" +
                    "</div>" +
                  "</div>" ;

            //카드를 화면에 표시한다.
            // $('.grid').isotope().append(card);
            $("#FeviCard").append(card);
        });

        // 더보기 버튼 추가하기
        var addMore = "<div id='addMore' class='col s12 m12 l3 grid-item waves-effect waves-block waves-light'>" +
          "<div class='card small pink lighten-1 valign-wrapper white-text'>" +
            "<h5 class='valign center' style='width: 100%;'><i class='material-icons large'>playlist_add</i></h5>" +
          "</div>"+
        "</div>";
        $("#FeviCard").append(addMore);

        //page 및 각종 앨리먼트 정보를 표시한다.
        $("#video_list > ul >li").eq(0).text(
          "총 동영상수: " + json.totalElements
        );
        $("#video_list > ul >li").eq(2).text(
          "총 페이지 수: " + json.totalPages
        );
        $("#video_list > ul >li").eq(1).text(
          "현재 페이지의 카드 수: " + json.size
        );
        $("#video_list > ul >li").eq(3).text(
          "현재 페이지 번호: " + json.number
        );



        $('.grid').isotope({
                itemSelector : '.grid-item',
                masonry : {
                    columnWidth : 50,
                    gutter : 10
                }
            });

        $('.grid').imagesLoaded().done(function() {
            $('.grid').isotope();
        });

    };

    function response_id (json) {
        var video_list = json.content;
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
                    "<div class='card-reveal' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right close'>close</i><i class='material-icons sharing right' data-id=" + item.id + ">share</i></span>" +
                        "<video controls loop preload='auto' poster='" + item.picture + "' src='" + item.source + "' width='100%' >" +
                        "</video>" +
                        "<ul class='collection'><li class='collection-item avatar'><img src='" + item.profile_image + "' class='circle responsive-img'>" +
                            "<span class='title'>" + item.name + "</span>" +
                            "<p>updated: " + item.updated_time + "</br>" +
                                "created: " + item.created_time + "</p></li></ul>" +
                    "</div>" +
                  "</div>" ;

            //카드를 화면에 표시한다.
            // $('.grid').isotope().append(card);
            $("#FeviCard").append(card);

            // ID 별로 파라메터를 따로 설정을 한다.
            var virtualPvByParam =  "index.html?id=" + item.id;
            ga('send', 'pageview', 'virtualPvByParam');
        });
      }


    // google-analytics 카드 어디를 누를지 체크
    $("body").on("click", ".activator", function ( e ){
      var contentID = $(this).parents('div[id]').attr('id');
      var clickedPath = $(this).attr('alt');
      console.log(contentID, clickedPath);

      ga('send', 'event', "card-reveal", clickedPath, contentID  );
      });

    // 카드를 눌렀을 때는 해당 카드의 PV를 따로 잡는다.
    // hash를 따로 달고 날아오는 경우와 동일하게 통계를 잡는다.
    $("body").on("click", ".activator", function ( e ){
      var contentID = $(this).parents('div[id]').attr('id');
      var virtualPvByID = "/index.html?id=" + contentID;
      ga('send', 'pageview', 'virtualPvByID');
    });



    //google-analytics 비디오 플레이를 눌렀는지 체크
    $('body').on('click', '.card-reveal', function(e){
    //   var videID = $(this).parent().attr('data-id');
      console.log(this);
    });

    // 하단 fix 버튼 클릭시 움직임
    $('#scrollTop').click(function(){
      $('html, body').animate({ scrollTop: 0}, "slow");
      return false;
    });





});
