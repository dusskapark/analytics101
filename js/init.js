$(document).ready(function() {
    $('.materialboxed').materialbox();

    $.ajax({
        type : 'GET',
        url : "http://munsangdong.cafe24.com/api/card",
        dataType : "json",
        success : response_json
    });

    function response_json(json) {

        var video_list = json.content;

        //비디오 숫자
        var video_count = video_list.length;

        //비디오 숫자만큼 루프를 돈다.
        $.each(video_list, function(key) {
            // 비디오 1개의 정보를 가진 변수
            // video_list의 배열에서 각 개체를 가져온다.
            var info = video_list[key];

            var id = info.id;
            var source = info.source;
            var thumbnail = info.picture;
            var description = info.description;
            var width = info.width;
            var height = info.height;
            var status = info.status;

            // FB 페이지 이름을 카테고리 등 공통 정보를 구한다.
            var FBpage_name = info.name;
            var FBcategory = info.category;
            var FBprofile_image = info.profile_image;

            var updated_time = info.updated_time;
            var created_time = info.created_time;

            // 카드를 구성한다
            var card = "<div class='col s12 m12 l4'>";
            card += "<div class='card small'>"
            card += "<div class='card-image waves-effect waves-block waves-light'>";
            card += "<a href='#" + id + "'/>";
            card += "<img width='800' height='600' src=' " + thumbnail + " ' class='materialboxed responsive-img'/> </a>";
            card += "<span class='card-title'>" + FBpage_name + "</span></div>";
            card += "<div class='card-content'><p><a href='#" + FBcategory + "'>" + FBcategory + "</a><i class='material-icons right'>more_vert</i></p>";
            card += "<span class='activator grey-text text-darken-4'>" + description + "</span></div>";
            card += "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + FBcategory + "<i class='material-icons right'>close</i></span>";
            card += "<ul class='collection'><li class='collection-item avatar'><img src='" + FBprofile_image + "' class='circle'>";
            card += "<span class='title'>" + FBpage_name + "</span>";
            card += "<p>updated: " + updated_time + "</br>";
            card += "created: " + created_time + "</p></li></ul>";
            card += "</div></div>"

            //카드를 화면에 표시한다.
            $("#FeviCard").append(card);

        });
    };
});

// end of document ready

