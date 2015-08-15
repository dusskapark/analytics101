$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
  
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

    $("ul.category>li>a").click(function() {
        var category = $(this).attr('class');
        url = 'http://munsangdong.cafe24.com/api/card?category=' + category;
        console.log(url);
        $('.grid').isotope({ filter : '.' + category.toUpperCase() });
    });

    // $("ul.category>li>a").click(function(e) {
    // var category = $(e.target).attr("class");
    // //url = 'http://munsangdong.cafe24.com/api/card?category=' + category;
    // console.log(category);
    //
    // });
    $( "body" ).on( "click", "div.card-image", function( e )  {
        var id = $( e.currentTarget ).attr( "data-id" );
        var url_detail =  url + "?id=" + id;
                console.log(url_detail);

        callApi( url_detail, detailCardFn );
    });
    
    function detailCardFn( data ) {

      var $modal = $( "#modalView" ),
          content = data.content[ 0 ];
      // $modal.find( "h4" ).text( content.name ).end().find( "p" ).text( content.description ).end().
      $modal.find( "h4" ).text( content.name );
      $modal.find( "p" ).text( content.description );
      $modal.find( "video" ).attr( {
          src: content.source
      });
      
      $modal.openModal();
    };

    function response_json(json) {
        console.log(json);
        var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            // 카드를 구성한다
            var card = "<div class='col s12 m12 l4 grid-item " + item.category + "'>" +
                "<div class='card'>" +
                    "<div class='card-image waves-effect waves-block waves-light' data-id=" + item.id + ">" +
                        "<a href='#" + item.id + "'>" +
                            "<img width='800' height='600' src=' " + item.picture + " ' class='responsive-img'/>" +
                        "</a>" +
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
            //카드를 화면에 표시한다.
            $("#FeviCard").append(card);

        });
        
        
        $('.grid').isotope({
            itemSelector : '.grid-item',
            masonry : {
                columnWidth : 50,
                gutter : 10
            }
        });
    };
});


