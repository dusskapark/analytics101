$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
  
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
        var category = $(this).attr('class');
        url = 'http://munsangdong.cafe24.com/api/card?category=' + category;
        console.log(url);
        //카드 목록 초기
        // $("#FeviCard").empty();
        // callApi(url);
        $('.grid').isotope({ filter : '.' + category.toUpperCase() });
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
        video_list.forEach(function(v, i) {
            var item = v;
                        // 카드를 구성한다
                        var card = "<div class='col s12 m12 l4 grid-item " + item.category + "'>" +
                            "<div class='card'>" +
                                "<div class='card-image waves-effect waves-block waves-light'>" +
                                    "<a href='javascript:$(\"#" + item.id +"\").openModal();'><img width='800' height='600' src=' " + item.picture + " ' class='responsive-img'/></a>" +
                                        "<span class='card-title'>" + item.category + "<i class='material-icons'>play_circle_filled</i></span>" +
                                "</div>" +
                                "<div class='card-content'><span class='card-title activator grey-text text-darken-4 truncate'>" + item.name + "</span>" +
                                    "<a href='#" + item.id + "' class='modal-trigger'><p>" + item.description + "</p></a>" +
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
            
                // 모달 화면을 만든다.
                var modal = "<div id='" + item.id + "' class='modal modal-fixed-footer'>" +
                    "<div class='modal-content'>" +
                        "<h4>" + item.name + "</h4>" +
                            "<p>" + item.description + "</p>" +
                                "<div class='video-container'>" +
                                    "<video src ='" + item.source + "' controls preload='auto' poster='" + item.picture + "'>" +
                                    "</video>"+
                                "</div>"+
                    "</div>" +
                    "<div class='modal-footer'>" +
                        "<a href='#!' class=' modal-action modal-close waves-effect waves-green btn-flat'>Okay</a>" +
                    "</div>" +
                  "</div>";
                $("#modalView").append(modal);
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

// var openModal = function(div) {
    // var id = $(div).data('id');
    // url_id = 'http://munsangdong.cafe24.com/api/card?id=' + id;
    // console.log(url_id);
    // var callApi = function(url_id) {
        // $.ajax({
            // type : 'GET',
            // url : url,
            // dataType : "json",
            // success : function() {
//                 
            // }
        // });
    // }
//     
//     
//     
    // $("#modal1").openModal();
// };

// $(#FeviCard).append(function (){
     // var addmore = "<div class='col s12 m12 l4 grid-item'>" +
        // "<div class='card small valign-wrapper '>" +
            // "<h5 class='valign center-align'>" +
            // "<i class='large material-icons'>add</i>" +
            // "</h5>" +
        // "</div>"+
       // "</div>";
       // console.log(addmore);
       // $("#FeviCard").last().append(addmore);
 // });
