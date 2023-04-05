


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://opengraphprotocol.org/schema/"
      xmlns:fb="http://www.facebook.com/2008/fbml" lang="en" xml:lang="en">    
      
    <head>
    	<!-- CSS for Common-->
        <link href="css/common.min.css?version=head.361657684639230339" type="text/css" rel="stylesheet"/>        
        <!-- CSS for Layout -->
        <link href="css/fluid_grid.min.css" type="text/css" rel="stylesheet"/>  	
               	
        
        <title>Angry Birds Eagles</title>        
		<meta name="description" content="Angry Birds Philadelphia Eagles" />	        
        <meta name="google" value="notranslate" />               	       
		<meta property="og:title" content="Philadelphia Eagles and Angry Birds" />
		<meta property="og:type" content="game" />
		<meta property="og:url" content="http://www.facebook.com/philadelphiaeagles/app_453904584629858" />
		<meta property="og:image" content="http://philadelphia-eagles.appspot.com/images/ab_eagles_share_icon.png" />
		<meta property="og:site_name" content="Philadelphia Eagles and Angry Birds" />
		<meta property="fb:app_id" content="453904584629858" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Cache-Control" content="Public"/>
        <meta http-equiv="Expires" content="Mon, 31 Dec 2012 12:00:00 GMT"/>
        
        <!-- Include CSS to eliminate any default margins/padding and set the height of the html element and 
             the body element to 100%, because Firefox, or any Gecko based browser, interprets percentage as 
             the percentage of the height of its parent container, which has to be set explicitly.  Fix for
             Firefox 3.6 focus border issues.  Initially, don't display flashContent div so it won't show 
             if JavaScript disabled.
        -->
        <style type="text/css" media="screen"> 
            
            object:focus { outline:none; }
            #flashContent { display:none; }
            
        </style>
               
        <script type="text/javascript" src="js/common.min.js?version=head.361657684639230339"></script>
		<script type="text/javascript" src="js/ga.min.js?version=head.361657684639230339"></script>
					
	    <!-- Box-Shadowing for IE6-9 -->
	    <script type="text/javascript" src="js/pie.min.js"> </script>		               
		<script type="text/javascript" src="js/jquery-1.7.min.js"> </script>    
        <script type="text/javascript" src="flash/swfobject.js"> </script>
        
        
      
        <script type="text/javascript" >
		
        	/*
        	Test App ID:177256662403483 (Allows localhost)
			*/
			window.fbAsyncInit = function() {
				FB.init({
		            appId      : '453904584629858',
		            status     : true, 
		            cookie     : true,
		            xfbml      : true,
		          });
				FB.Canvas.setSize();
			}
			
			
			function sizeChangeCallback() {
			
				FB.Canvas.setSize();
			
			}

			
			/*
				When the document has loaded
			*/
		    $(document).ready(function(e) {			

		    	if (playerVersion.major < 11) {		    		
		        	$('#flashContent').show();        	
		        }
		        if (IsPhone()) {
		        	$('#flashContent').show();
		        	$('#flashContent').html('<div class=\'center error-text\'>Not working on mobile.</div>')
		        	trackEvent('browser', 'mobile-not-supported');
		        }
		        if (!isIEVersionSupported()) {
		        	$('#flashContent').show();
		        	$('#flashContent').html('<div class=\'center error-text\'>The browser you are using is outdated. Please update your browser.</div>')
		        	trackEvent('browser', 'ie-6-7-not-supported');
		        }
		        
     			/* Disable scrolling when mouse over game div */
		    	$('#flashObject').hover(function() {

		    		if (isFF()) {
					    
				    	document.onmousewheel = function(){ stopWheel(); } /* IE7, IE8 */
				    	if(document.addEventListener){ /* Chrome, Safari, Firefox */
				    	    document.addEventListener('DOMMouseScroll', stopWheel, false);
				    	}
				    } else {		    	    
			    	    $(document).bind('mousewheel DOMMouseScroll scroll',function(){ 
		    	        	stopWheel();
			    	        
			    	    });			    	   
		    	    }
		    	    
		    	}, function() {
					if (isFF()) {
					    				    	
				    	if(document.removeEventListener){ /* Chrome, Safari, Firefox */
				    	    document.removeEventListener('DOMMouseScroll', stopWheel, false);
				    	}
				    } else {
 			    		$(document).unbind('mousewheel DOMMouseScroll scroll'); 			    		
 			    	}
		    	    
		    	});
     			
     			
		    	$('#fb-share').click(function(e){
		    		e.preventDefault();
		    		trackEvent('social_media', 'share');
		    		FB.ui({
		    		method: 'feed',
		    		name: 'Play Angry Birds with the Philadelphia Eagles!',
		    		link: 'http://www.facebook.com/philadelphiaeagles/app_453904584629858',
		    		picture: 'http://philadelphia-eagles.appspot.com/images/ab_eagles_share_icon.png',
		    		caption: "Hut! Hut! Hut! Pass the pig!",
		    		description: ""
		    		});
		    	});
			});		
		    
	   
		    
	    </script>  
        <script type="text/javascript">
        var playerVersion = swfobject.getFlashPlayerVersion();
		      
		var rndValue = 0;       
        //If IE, create a random value so flash movie is refreshed when refreshing page. -->
        
        if (isIE()) {        
        	rndValue = Math.random();
        }
		
        if (playerVersion.major > 10 && !IsPhone() && isIEVersionSupported()) {
        	trackEvent('flash', 'embed');
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
            var swfVersionStr = "11.0.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
            var xiSwfUrlStr = "flash/playerProductInstall.swf";            
            var flashvars = {assetsUrl: "/flash/", buildNumber:"head.361657684639230339"};                        
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            params.wmode = "transparent";
            var attributes = {};
            attributes.id = "AngryBirdsPhiladelphiaEagles";
            attributes.name = "AngryBirdsPhiladelphiaEagles";
            attributes.align = "middle";
            swfobject.embedSWF(
                "/flash/AngryBirdsPhiladelphiaEagles.swf?version=head.361657684639230339&refresh=" + rndValue, "flashContent",
                "570", "380", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");

        
        }
        
        </script>
        
        <script type="text/javascript" src="js/swfwheel.js"></script>
        
                   
    </head>
    
    <body>   
    	<!-- FB Sharing -->
    	<div id="fb-root"></div>
		<script>
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		</script> 	    	
    	
    	<!-- Use the fluid grid for cross browser compatibility -->
			
		<!-- Page start -->        
	<div id="page" class="">	
      
		<div id="header">               		               
			<!-- <div id="fb-like" class="fb-like" data-href="http://www.facebook.com/philadelphiaeagles" data-send="false" data-layout="button_count" data-width="450" 
				data-show-faces="false" data-colorscheme="dark" data-font="arial"></div> -->
			<fb:like id="fb-like" href="http://www.facebook.com/philadelphiaeagles" layout="button_count"
			  show_faces="false" width="240" height="40"
			  action="like" colorscheme="light"></fb:like>
			<fb:like id="fb-ab-like" href="http://www.facebook.com/angrybirds" layout="button_count"
			  show_faces="false" width="240" height="40"
			  action="like" colorscheme="light"></fb:like>
			<div id="logo" class="right"> </div>
        </div>
           
		<div class="clear"></div>
						
      	
<!-- Social Sharing -->	

<!-- Flash Wrapper -->
<div id="flashObject">

	<!-- Flash content-->	
	<div id="flashContent">
		<!-- Flash start -->		
		<div id="install-flash-div" class="error-text">
			To view this page ensure that Adobe Flash Player version 10.2.0 or greater is installed. <br /> 
			<a href="http://get.adobe.com/flashplayer/" target="_blank">http://get.adobe.com/flashplayer/</a>
		</div>
		
		<script type="text/javascript">
			trackEvent('flash', 'prompt-install');
		</script>
	</div>

	<div id="frame-eagle-logo" class="left"></div>

	<!-- Flash End -->
	<noscript>
		<div id="install-flash-div" class="error-text">
				To view this page ensure that Javascript in enabled in your browser.
		</div>
	</noscript>
</div>

<div id="frame-lower-border" class="left"></div>
<!-- Wrapper End -->

<div class="clear"></div>				 
                	   		 	
  		 	
  		<div class="clear"> </div>

  		<div id="buttons"> 
	  		<a href="http://apps.facebook.com/angrybirds/" onclick="trackEvent('links', 'Angry Birds');" target="_blank"> <img id="friendsLogo" src="/images/friendsLogo.png"/></a>
	  		<a href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Fwww.facebook.com%2Fphiladelphiaeagles%2Fapp_453904584629858" target="_blank" id="fb-share"><img id="shareGameText" src="/images/shareGameText.png"/></a>
	  		<a href="http://www.philadelphiaeagles.com/" onclick="trackEvent('links', 'Philadelphia Eagles');" target="_blank" ><img id="philLogo" src="/images/philLogo.png"/></a>
  		</div>

	</div>	
	<!-- page end -->
	
	<!-- Footer -->
	 <div id="footer" class="left">    	   		 	   		 	 	   		 	 
     <div id="legaltext" class="left small-text">                 
     © 2012 Rovio Entertainment Ltd. Angry Birds. <a class="" onclick="trackEvent('links','eula');" href="http://www.rovio.com/eula/" target="_blank">EULA</a> <a class="" onclick="trackEvent('links','privacy-policy');" href="http://www.rovio.com/Privacy/" target="_blank">Privacy Policy</a>
	 </div>
	 <a class="link-rovio" href="http://www.rovio.com/" onclick="trackEvent('links','rovio');" target="_blank">
	 	<img src="./images/rovioLogo.png" alt="Rovio"/>
	 </a>
</div>
   	   		   
   </body>
</html>
