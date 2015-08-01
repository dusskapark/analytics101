   $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
 
   $( window ).load(function() {

    if(window.location.hash == '#app') {
        $('.navbar-fixed, .page-footer').hide();
    } 
    var $container = $('.isotope').isotope({ layoutMode: 'fitRows' });
  });
  
    // Show Modal when leaving site
    var xValue, yValue;
    var isYIncreasing;
    $(document).mousemove(function( event ) {
            
            var isYIncreasing = yValue > event.pageY;
            xValue = event.pageX;
            yValue = event.pageY;
            
            if (isYIncreasing && event.pageY < 25 ){
                 
            if ($.cookie('modal_shown') == null) {
                $.cookie('modal_shown', 'yes', { expires: 7, path: '/' });
                $('#modal1').openModal();
                analytics.track('Modal Shown', {
                category: 'Newsletter',
                label: 'New Shops',
                value: 1
                });
            }
                     
               
            }
    });
  
     jQuery(document).ready(function() {
         $('.parallax').parallax();
         $(".button-collapse").sideNav();
        
        // var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        // console.log(iOS);
        // if (iOS) {
        //     $( "a" ).click(function(e) {
        //        window.alert = function() {};
        //       var link =  $(this).data('deeplink');
        //       var url = $(this).attr("href");
        //       setTimeout(function () { window.location = url; }, 1);
        //         window.location = link;
        //       // window.location.replace();
        //      console.log(link);
        //      e.stopPropagation();
        //         e.preventDefault();
        //     });
            
        // }
        
        if ($.cookie('email-cta') == null) {
        jQuery(".email-cta").delay(2000).slideDown(500);
        }


        if ($.cookie('search-box') == null) { 
        jQuery(".search-box").hide();
        jQuery(".search-box").slideDown(1000);
        $.cookie('search-box', 'yes', { expires: 365, path: '/' });
        } else {
            jQuery(".search-box").show();
        }

        jQuery('ul.tabs').tabs();

        // When user starts typing the form
        jQuery('#emailField').one("keypress", function () {
            analytics.track('Typing', {
            category: 'Newsletter',
            label: 'New Shops'
            
            });
        });
    });

    jQuery( ".email-form" ).submit(function( event ) {
        event.preventDefault();
        ajaxurl = "/wp-admin/admin-ajax.php";
        jQuery('.progress').slideDown();
      
        var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize());
        
        sendIt.done(function( data ) {
            console.log(data);
            jQuery('.email-form').slideUp();
            jQuery('.success').slideDown();
            $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
            $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
            // When the form is submitted
            analytics.track('Subscribed', {
            category: 'Newsletter',
            label: 'New Shops',
            value: 1
            });
        });
    });

     jQuery( "#betaForm" ).submit(function( event ) {
        event.preventDefault();
        jQuery('.progress').slideDown();
        ajaxurl = "/wp-admin/admin-ajax.php";
        var checked = []
        $("input[name='platform[]']:checked").each(function ()
        {
            checked.push($(this).val());
        });
        checked = checked.join(", ");
        
        var sendIt = jQuery.post( ajaxurl, jQuery( this ).serialize() + "&platforms=" + checked);
        
        sendIt.done(function( data ) {

            $("html, body").animate({ scrollTop: 0 }, "slow");
            jQuery('#joinBeta').slideUp();
            jQuery('#joinedBeta').slideDown();

            $.cookie('modal_shown', 'yes', { expires: 365, path: '/' });
            $.cookie('email-cta', 'yes', { expires: 365, path: '/' });
            analytics.track('Subscribed', {
            category: 'Newsletter',
            label: 'Beta',
            value: 1
            });
    
        });
    });

    $('.btn-floating').click(function(){
        $('.search').slideDown(500).focus();
    });
  