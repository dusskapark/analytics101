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
    callApi( url + window.location.search, response_json );

    // #ID를 달고 브라우저를 직접 접속했을 때, hash를 ?id= 로 리다이렉트 시키는 것이 필요함.
    if( window.location.hash !== "" ) {
      var IDis = window.location.hash;
      var URLis = window.location.search;
      // window.location.search = URLis + '&id=' + IDis;
        console.log(IDis);
      // callApi( url + window.location.search, response_json );
    } else {
      callApi( url, response_json );
    }

    // 카드를 누르면 카드가 확대된다.
    $("body").on("click", ".activator", function ( e ){
      window.location.hash = $(this).parents('div[id]').get(0).id;
      console.log(window.location.hash);
      $(this).parents(".grid-item").removeClass("grid-item l4").addClass(".grid expanded l12");

      // 클릭시 비디오가 플레이 된다.
      // 모바일에서는 지극히 느려져서.. 삭제
        // var $play = $(this).parents('.card').children('div.card-reveal').children('video').get(0);
        // $play.play();

      $('.grid').isotope();
    });

    // 닫기를 누르면 카드가 다시 작아진다.
    $( "body" ).on( "click", "div.card-reveal > span", function( e )  {
      $(this).parents(".expanded").removeClass(".grid expanded l12").addClass("grid-item l4");

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
        var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // 카드를 구성한다
            var card = "<div class='col s12 m12 l4 grid-item " + item.category + "' id='" + item.id +  "''>" +
                "<div class='card'>" +
                    "<div class='card-image waves-effect waves-block waves-light'>" +
                            "<img src=' " + item.picture + " ' class='activator'>" +
                            "<span class='card-title'>" + item.category + "<i class='material-icons'>play_circle_filled</i></span>" +
                    "</div>" +
                    "<div class='card-content'>" +
                        "<span class='card-title activator grey-text text-darken-4 truncate'><img src='" + item.profile_image + "' class='circle smallcircle'> " + item.name + "</span>" +
                            "<p class='activator'>" + item.description + "</p>" +
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

});
