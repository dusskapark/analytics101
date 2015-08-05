(function($){
  $(function(){

    
    // $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function() {
    var url = "http://munsangdong.cafe24.com/api/card";  
    var callApi = function(url) {
        $.ajax({
            type : 'GET',
            url : url,
            dataType : "json",
            success : response_json
        });
    };

    callApi(url);

    $("ul.category>li>a").click(function() {
        var hash = window.location.hash;
        hash = hash.slice(1);
        url = 'http://munsangdong.cafe24.com/api/card?category=' + hash;
        console.log(url);
        //카드 목록 초기
        $("#FeviCard").empty();
        callApi(url);
    });
    

    // $("ul.category>li>a").click(function(e) {
    // var category = $(e.target).attr("class");
    // //url = 'http://munsangdong.cafe24.com/api/card?category=' + category;
    // console.log(category);
    //
    // });

    function response_json(json) {
        console.log(json);

        var video_list = json.content;

<<<<<<< HEAD
        video_list.forEach(function(v, i) {
            var item = v;
                        // 카드를 구성한다
                        var card = "<div class='col s12 m12 l4 grid-item'>" +
                            "<div class='card'>" +
                                "<div class='card-image waves-effect waves-block waves-light'>" +
                                    "<a href='#" + item.id + "' class='modal-trigger' /><img width='800' height='600' src=' " + item.picture + " ' class='responsive-img'/></a>" +
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
=======
            // 카드를 구성한다
            var card = "<div class='col s12 m12 l4'>";
            card += "<div class='card small hoverable'>";
            card += "<div class='card-image waves-effect waves-block waves-light'>";
            card += "<img width='800' height='600' src=' " + thumbnail + " ' class='responsive-img'/>";
            card += "<a href='#" + id + "' class='modal-trigger' >";            
            card += "<span class='card-title'>" + FBcategory + " <i class='large material-icons'>play_circle_filled</i></span> </a></div>";
            card += "<div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>" + FBpage_name + "</span>";
            card += "<p>" + description + "</p></div>";
            card += "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + FBcategory + "<i class='material-icons right'>close</i></span>";
            card += "<ul class='collection'><li class='collection-item avatar'><img src='" + FBprofile_image + "' class='circle'>";
            card += "<span class='title'>" + FBpage_name + "</span>";
            card += "<p>updated: " + updated_time + "</br>";
            card += "created: " + created_time + "</p></li></ul>";
            card += "</div></div>";
>>>>>>> FETCH_HEAD


            //카드를 화면에 표시한다.
            $("#FeviCard").append(card);
        });
    };

});
// jquery

// function response_json(json) {
//
// var video_list = json.content;
//
// //비디오 숫자
// var video_count = video_list.length;
//
// //비디오 숫자만큼 루프를 돈다.
// $.each(video_list, function(key) {
// // 비디오 1개의 정보를 가진 변수
// // video_list의 배열에서 각 개체를 가져온다.
// var info = video_list[key];
//
// var id = info.id;
// var source = info.source;
// var thumbnail = info.picture;
// var description = info.description;
// var width = info.width;
// var height = info.height;
// var status = info.status;
//
// // FB 페이지 이름을 카테고리 등 공통 정보를 구한다.
// var FBpage_name = info.name;
// var FBcategory = info.category;
// var FBprofile_image = info.profile_image;
//
// var updated_time = info.updated_time;
// var created_time = info.created_time;
//
// // 카드를 구성한다
// var card = "<div class='col s12 m12 l4'>";
// card += "<div class='card small hoverable'>";
// card += "<div class='card-image waves-effect waves-block waves-light'>";
// card += "<img width='800' height='600' src=' " + thumbnail + " ' class='responsive-img'/>";
// card += "<a href='#" + id + "' class='modal-trigger' >";
// card += "<span class='card-title'>" + FBcategory + " <i class='large material-icons'>play_circle_filled</i></span> </a></div>";
// card += "<div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>" + FBpage_name + "</span>";
// card += "<p>" + description + "</p></div>";
// card += "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + FBcategory + "<i class='material-icons right'>close</i></span>";
// card += "<ul class='collection'><li class='collection-item avatar'><img src='" + FBprofile_image + "' class='circle'>";
// card += "<span class='title'>" + FBpage_name + "</span>";
// card += "<p>updated: " + updated_time + "</br>";
// card += "created: " + created_time + "</p></li></ul>";
// card += "</div></div>";
//
// //카드를 화면에 표시한다.
// $("#FeviCard").append(card);
//
//
// //비디오 플레이 modal
// var playCard = "<div id='" + id +"' class='modal'>";
// playCard += "<div class='modal-content'>";
// playCard += "<h4>" + FBpage_name + "</h4>";
// playCard += "<video class='videoPlay' controls muted autoplay poster='" + thumbnail + "'>";
// playCard += "<source src='" + source  + "' width='" + width + "' height='" + height + "' /></video>";
// playCard += "<p>" + description + "</p>";
// playCard += "</div>";
// playCard += "<div class='modal-footer'><a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Close</a></div></div>";
//
// //카드를 화면에 표시한다.
// $("#modalView").append(playCard);
//
//
// });
// };
// });

// end of document ready

