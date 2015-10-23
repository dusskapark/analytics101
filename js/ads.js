$(document).ready(function(){
  vidID = window.location.hash;

    $("body").on("click", vidID, function(e){   
      var adsManager;
      var clickTrackingOverlay = document.getElementById('clickTrackingOverlay');
      var videoElement = document.getElementById(vidID.substr(1));
      var adsLoader = new google.ima.AdsLoader();

  // Add event listeners
  adsLoader.addEventListener(
      google.ima.AdsLoadedEvent.Type.ADS_LOADED,
      onAdsLoaded,
      false);
  adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false);

   // Create request object
   var adsRequest = {
    adTagUrl: "http://ima3vpaid.appspot.com/?adTagUrl=http%3A%2F%2Fgoogleads.g.doubleclick.net%2Fpagead%2Fads%3Fad_type%3Dvideo_image_text_flash%26client%3Dca-video-pub-4968145218643279%26videoad_start_delay%3D0%26description_url%3Dhttp%253A%252F%252Fwww.youtube.com%26hl%3Den%26max_ad_duration%3D40000%26adtest%3Don",
    adType: "video"
    };

  // Make request

  adsLoader.requestAds(adsRequest);


  function onAdsLoaded(adsLoadedEvent) {
    // Get the ads manager
    adsManager = adsLoadedEvent.getAdsManager();
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);

    // Listen and respond to events which require you to pause/resume content
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onResumeRequested);

    // Set a visual element on which clicks should be tracked for video ads
    adsManager.setClickTrackingElement(clickTrackingOverlay);
    try {
      // Call play to start showing the ad.
      adsManager.play(videoElement);
    } catch (adError) {
      // An error may be thrown if there was a problem with the VAST response.
    }
  }

  function onAdError(adErrorEvent) {
    // Handle the error logging.
    console.log(adErrorEvent.getError());
  }

  function onPauseRequested() {
    videoElement.pause();
    // Setup UI for showing ads (e.g. display ad timer countdown,
    // disable seeking, etc.)
    // setupUIForAd();
  }

  function onResumeRequested() {
    // Setup UI back for showing content.
    // setupUIForContent();
    videoElement.play();
  }


  });
});

