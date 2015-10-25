
$(document).ready(function() {
var vidID = $(window.location.hash)[0];


	$("body").on("click", "#playPause", function() {
	var vidID = document.getElementById(window.location.hash.substr(1));
		
		var consoleText = $(this).find('i').text();

		if (consoleText == 'play_arrow') {
			vidID.play();
			$(this).find('i').text('pause');

		} else {
			vidID.pause();
			$(this).find('i').text('play_arrow');

		} 

	});

	$('body').on('ready', '#adContainer', 	function(){

		var adDisplayContainer = new google.ima.AdDisplayContainer(
		document.getElementById('adContainer'),
	    vidID);

		// Must be done as the result of a user action on mobile
		adDisplayContainer.initialize();

			// Re-use this AdsLoader instance for the entire lifecycle of your page.
		var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

		// Add event listeners
		adsLoader.addEventListener(
		    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
		    onAdsManagerLoaded,
		    false);
		adsLoader.addEventListener(
		    google.ima.AdErrorEvent.Type.AD_ERROR,
		    onAdError,
		    false);

		function onAdError(adErrorEvent) {
		  // Handle the error logging and destroy the AdsManager
		  console.log(adErrorEvent.getError());
		  adsManager.destroy();
		}


		// An event listener to tell the SDK that our content video
		// is completed so the SDK can play any post-roll ads.
		var contentEndedListener = function() {adsLoader.contentComplete();};
		videoContent.onended = contentEndedListener;

		// Request video ads.
		var adsRequest = new google.ima.AdsRequest();
		adsRequest.adTagUrl = "http://ima3vpaid.appspot.com/" +
		"?adTagUrl=http%3A%2F%2Fgoogleads.g.doubleclick.net%2F"+
		"pagead%2Fads%3Fad_type%3Dvideo_image_text_flash%26"+
		"client%3Dca-video-pub-4968145218643279%26"+
		"videoad_start_delay%3D0%26"+
		"description_url%3Dhttp%253A%252F%252Fwww.youtube.com%26hl%3Den%26"+
		"max_ad_duration%3D40000%26adtest%3Don";


		// Specify the linear and nonlinear slot sizes. This helps the SDK to
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = 640;
		adsRequest.linearAdSlotHeight = 400;
		adsRequest.nonLinearAdSlotWidth = 640;
		adsRequest.nonLinearAdSlotHeight = 150;

		var playPause = document.getElementById('playPause');
		playPause.addEventListener('click', requestAds);

		function requestAds() {
		  adsLoader.requestAds(adsRequest);
		}


	});







});


