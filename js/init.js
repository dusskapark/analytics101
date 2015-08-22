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
    callApi( url, response_json );


    $( "body" ).on( "click", "i.fullscreen", function( e )  {
      var dataid = $(this).attr("data-id");
      var dataid = "#" + dataid;
      $(dataid).parent().removeClass("grid-item l4").delay(1000).addClass(".grid l12");
      // $(dataid).children('.card-reveal').removeAttr('style').attr(" style='display: block; transform: translateY(-100%);' ");
      $('.grid').isotope();
      });

    function response_json(json) {
        var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // 카드를 구성한다
            var card = "<div class='col s12 m12 l4 grid-item " + item.category + "'>" +
                "<div class='card' id='" + item.id + "'>" +
                    "<div class='card-image waves-effect waves-block waves-light'>" +
                            "<img src=' " + item.picture + " ' class='activator'>" +
                            "<span class='card-title'>" + item.category + "<i class='material-icons'>play_circle_filled</i></span>" +
                    "</div>" +
                    "<div class='card-content'>" +
                        "<span class='card-title activator grey-text text-darken-4 truncate'><img src='" + item.profile_image + "' class='circle smallcircle'> " + item.name + "</span>" +
                            "<p class='activator'>" + item.description + "</p>" +
                    "</div>" +
                    "<div class='card-reveal' data-id='" + item.id +"'><span class='card-title grey-text text-darken-4'>" + item.category + "<i class='material-icons right'>close</i><i class='material-icons right fullscreen' data-id=" + item.id + "> aspect_ratio</i></span>" +
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
