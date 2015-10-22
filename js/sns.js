var shareKakao = function (json) {
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
        ga('send', 'social', 'KakaoTalk', 'kakaoLink', item.id );
      });
    }

    var shareStory = function() {
      Kakao.Story.share({
        url: location.href
      });
    };


    // 페이스북
    var windowHeight = 360;
    var windowWidth = 640;

    var shareFacebook = function (json){
      var video_list = json.content;
        video_list.forEach(function(v, i) {
            var item = v;
            //  페이스북 로그인 시도
        //  FB.ui(
        //         {
                      // method: 'feed',
                      // name: 'VIKICAST x ' + item.name,
                      // redirect_uri: "http://vikicast.com/responseSuccess.html",
                      // picture: "http://vikicast.com/res/facebook/Untitled05.png",
                      // caption: 'category: ' + item.category ,
                      // description: item.description ,
                      // message: '당신만 못 봤던 그 영상, 여기 다 있다!',
                      // user_message_prompt: '못봤던 영상! 여기서 다 찾으세요'
                      // link: 'http://vikicast.com/index.html?utm_source=facebookLink&utm_medium=social#'+item.id
        //          },
              //    function(response) {
              //      if (response && response.post_id) {
              //        console.log('Post was published.');
              //        ga('send', 'event', "sendFBshareSuccess", item.id );
               //
              //        if(window.location.search.indexOf('post_id')==1) window.close();
               //
              //      } else {
              //        console.log('Post was not published.');
              //        ga('send', 'event', "sendFBshareFail", item.id );
               //
              //      }
              //    }
              //  );

            var facebookUrl = "https://www.facebook.com/dialog/feed?"+
            "app_id=1463571523951964" +
            "&display=popup" +
            "$description='" + item.description + "'" +
            "&name=VIKICAST x " + item.name +
            "&caption=category: " + item.category +
            "&pictire=http://vikicast.com/res/facebook/Untitled05.png" +
            "&redirect_uri=http://vikicast.com/responseSuccess.html" +
            "&user_message_prompt='너만 못본 그 영상! 여기 다 있다~'" +
            "&link=http://vikicast.com/index.html?utm_source=facebookLink&utm_medium=social" + item.id;

            ga('send', 'social', 'facebook', 'shareRequest', item.id );
            window.open(facebookUrl, "_blank", "height=" + windowHeight + ",width=" + windowWidth);
          });
        }

var shareTwitter = function (json){
  var video_list = json.content;
    video_list.forEach(function(v, i) {
        var item = v;
        var twitterUrl = "https://twitter.com/intent/tweet?url=http://vikicast.com/index.html?id=" + item.id;
        ga('send', 'social', 'facebook', 'sendTweetshareRequest', item.id );
        window.open(twitterUrl, "_blank", "height=" + windowHeight + ",width=" + windowWidth);
      });
    }
