var response_kakao = function (json) {
  var video_list = json.content;
    video_list.forEach(function(v, i) {
        var item = v;
        var shareLink = "http://vikicast.com/index.html?utm_source=kakaoLink&utm_medium=social#" + item.id;
        console.log(shareLink);
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

    // 페이스북
    // var windowHeight = 360;
    // var windowWidth = 640;

    var response_facebook = function (json){
      var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            var REDIRECT_URL = "http://vikicast.com/index.html#" + item.id;
            //  페이스북 로그인 시도
            ga('send', 'event', "sendFBshareRequest", item.id );
            console.log(REDIRECT_URL);

              FB.ui(
                 {
                   method: 'feed',
                   display: 'iframe',
                   name: 'VIKICAST x' + item.name,
                   picture: item.picture,
                   caption: 'Reference Documentation',
                   description: item.description,
                   message: '당신만 못 봤던 그 영상, 여기 다 있다!',
                  //  redirect_uri: "http://vikicast.com",
                   link: REDIRECT_URL
                 },
                 function(response) {
                   if (response && response.post_id) {
                     console.log('Post was published.');
                     ga('send', 'event', "sendFBshareSuccess", item.id );

                   } else {
                     console.log('Post was not published.');
                     ga('send', 'event', "sendFBshareFail", item.id );

                   }
                 }
               );

            // var facebookUrl = "https://www.facebook.com/dialog/share?"+
            // "app_id=1463571523951964" +
            // "&display=touch" +
            // "&utm_source=facebookLink&utm_medium=social" +
            // "&action_type=og.like"+
            // "&redirect_uri=http://vikicast.com/responseSuccess.html" +
            // "&action_properties={'object':'"+ REDIRECT_URL +"'}"

            // "&href=" + REDIRECT_URL;
            // var $fbiFrame = "<iframe src='" + facebookUrl +
            // "' name='facebook' frameborder='0' scrolling='yes'></iframe>";

            // $('.modal-content').append($fbiFrame);
            // $('#modal1').openModal();

            // ga('send', 'event', "sendFBshareRequest", item.id );
            // window.open(facebookUrl, "_blank", "height=" + windowHeight + ",width=" + windowWidth);
          });
        }

var shareTwitter = function() {
  var twitterUrl = "https://twitter.com/intent/tweet?url=" + location.href;
  window.open(twitterUrl, "_blank", "height=" + windowHeight + ",width=" + windowWidth);
};