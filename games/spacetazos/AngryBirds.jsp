
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">    
    <head>    			    
        


<!--  .o.                                                        oooooooooo.   o8o                 .o8                ooooooooooooo                                         
     .888.                                                       `888'   `Y8b  `"'                "888                8'   888   `8                                         
    .8"888.     ooo. .oo.    .oooooooo oooo d8b oooo    ooo       888     888 oooo  oooo d8b  .oooo888   .oooo.o           888       .oooo.     oooooooo  .ooooo.   .oooo.o 
   .8' `888.    `888P"Y88b  888' `88b  `888""8P  `88.  .8'        888oooo888' `888  `888""8P d88' `888  d88(  "8           888      `P  )88b   d'""7d8P  d88' `88b d88(  "8 
  .88ooo8888.    888   888  888   888   888       `88..8'         888    `88b  888   888     888   888  `"Y88b.            888       .oP"888     .d8P'   888   888 `"Y88b.  
 .8'     `888.   888   888  `88bod8P'   888        `888'          888    .88P  888   888     888   888  o.  )88b           888      d8(  888   .d8P'  .P 888   888 o.  )88b 
o88o     o8888o o888o o888o `8oooooo.  d888b        .8'          o888bood8P'  o888o d888b    `Y8bod88P" 8""888P'          o888o     `Y888""8o d8888888P  `Y8bod8P' 8""888P' 
                            d"     YD           .o..P'                                                                                                                      
                            "Y88888P'           `Y8P' -->

        <title>Angry Birds Tazos</title>
		<meta property="og:title" content="Angry Birds Tazos" />
		<meta property="og:description" content="Los Angry Birds están jugando con Tazos en el Espacio, ¡Ven y participa!" />
		<meta property="og:image" content="images/fb_sharing.png"/>
		<meta property="og:url" content="http://tazos.angrybirds.com/" />
        
        <meta name="google" value="notranslate" />
        
        <meta http-equiv="X-Frame-Options" content="deny">
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Cache-Control" content="Public"/>
       	<meta http-equiv="Expires" content="Mon, 31 Dec 2013 12:00:00 GMT"/>
           
        <!-- CSS for Common-->
        <link href="css/common.css?version=head.364976215521201893" type="text/css" rel="stylesheet"/>
        <!--[if lte IE 8]>
			<link rel="stylesheet" type="text/css" href="css/IE.css">
		<![endif]-->
        <!-- CSS for Layout -->
        <link href="css/fluid_grid.css" type="text/css" rel="stylesheet"/>
		
		<!-- javaScripts -->
        <script type="text/javascript" src="js/jquery-1.7.min.js"> </script>                 
		<script type="text/javascript" src="js/ga.tracking.min.js"></script>
		<script type="text/javascript" src="js/modernizr.custom.js"></script>
		<script type="text/javascript" src="js/yepnope.1.5.4-min.js"></script>
					
	    <!-- Box-Shadowing for IE6-9 -->
	    <script type="text/javascript" src="js/pie.js"> </script>		               
	    		 
        <script type="text/javascript" src="flash/swfobject.min.js"> </script>
        <script type="text/javascript" src="js/jsSharedObject.min.js"> </script>
        
		<script type="text/javascript" src="js/common.min.js?version=head.364976215521201893"></script>
        <script type="text/javascript" >
        	/*
				Block the page from being loaded in an iFrame
			*/
		    if (self != top) {
		    	top.location = self.location;
		    }
        
			/*
				When the document has loaded
			*/
		    $(document).ready(function(e) {		    	
		    	if (playerVersion.major < 11) {		    		
		        	$('#flashContent').show();        	
		        }
		        if (IsPhone()) {
					$("#overlay").show('fast');
		        	$('#flashContent').show('slow');
		        	$('#flashContent').html('<div class=\'center error-text\'>Not working on mobile.</div>')
		        	trackEvent('browser', 'mobile-not-supported');
		        }
		        if (!isIEVersionSupported()) {
					$("#overlay").show('slow');
		        	$('#flashContent').show();
		        	$('#flashContent').html("<div class=\'center error-text\'>You are using an unsafe and outdated browser! Upgrade to <a href='http://www.apple.com/safari/' target='_blank'>Safari</a>, <a href='http://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a>, <a href='https://www.google.com/intl/en/chrome/browser/' target='_blank'>Chrome</a>, <a href='http://www.opera.com/' target='_blank'>Opera</a> or <a href='http://windows.microsoft.com/en-US/internet-explorer/download-ie' target='_blank'>Internet Explorer</a>. These new browsers are free and run much faster!</div>")
		        	trackEvent('browser', 'ie-6-7-not-supported');
					$("#flashContent").click(function(){
						$("#overlay").hide();
					});
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
			});	
			
			// Retreives the lang attribute.
			function getLanguage()
			{
				return 'null';
			}
		    
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
            var flashvars = {assetsUrl: "/flash/", buildNumber:"head.364976215521201893"};           	  
            var params = {};
            params.quality = "high";
            params.bgcolor = "#000000";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            params.wmode = "direct";
            var attributes = {};
            attributes.id = "AngryBirdsFP11";
            attributes.name = "AngryBirdsFP11";
            attributes.align = "middle";
            swfobject.embedSWF(
                "flash/AngryBirdsSpaceTazos.swf?serverVersion=head.364976215521201893&refresh=" + rndValue, "flashContent",
                "980", "570", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");

        }
        </script>
        <script type="text/javascript" src="js/swfwheel.js"></script>                  
    </head>
    <body id="angryBirdsTazos">
    	<!-- Use the fluid grid for cross browser compatibility -->    	
        <div id="page" class="container container_12">	<!-- Page start -->
				<div id="header" class=".cf:after .cf">
               		<!-- Logo -->
                    <div id="logo" class="left">
						<img src="images/logo.png" alt="Angry Bird Tazos"/>
					</div>
                   	<!--<div id="faqButton" onclick="displayFAQ();" class="left"></div>-->
	            </div>
	            
				<div class="clear"> </div>
				
        		
<!-- Flash Wrapper -->
<div id="flashObject">
	<!-- Flash content-->	
	<div id="flashContent">
		<!-- Flash start -->		
		<div id="install-flash-div" class="error-text">
			To view this page ensure that Adobe Flash Player version 11.0.0 or greater is installed. <br /> 
			<a href="http://get.adobe.com/flashplayer/" target="_blank">http://get.adobe.com/flashplayer/</a>
		</div>
		
		<script type="text/javascript">
			trackEvent('flash', 'prompt-install');
		</script>
	</div>
	<!-- Flash End -->
	<noscript>
	<div id="install-flash-div" class="error-text">
			To view this page ensure that Javascript in enabled in your browser.
	</div>
	</noscript>
	<script>
	function are_cookies_enabled()
	{
		var cookieEnabled = (navigator.cookieEnabled) ? true : false;

		if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
		{ 
			document.cookie="testcookie";
			cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
			$('#flashContent').append('<div id="install-flash-div" class="error-text">To view this page ensure that Javascript in enabled in your browser.</div>');
		}
		return (cookieEnabled);
	}
	</script>
</div>
<!-- Wrapper End -->
<div class="clear"></div>


        		
				<!-- Footer -->
				<div class="clear"> </div>
				
				<div id="footer-game">
					<!-- Share Buttons -->
					<div id="shareButtons" class="cf:after .cf">
						<ul class="navigation">
							<li id='facebook' onClick='facebook()'><img src="images/website_button_fb.png"/></li>
							<li id='twitter' onClick='twitter()'><img src="images/website_button_tw.png"/></li>
							<li><a id="faqButton" href="javascript:;" style="" onclick="displayFAQ();"><img src="images/website_button_faq.png"/></a></li>
						</ul>
					</div>
					<!-- Branding -->
					<div id="branding" class="cf:after .cf">
						<ul class="navigation">
							<li><a id="tazos_brand" href="http://www.tazos.com/"  target="_blank"></a></li>
							<li><a id="gamesa_brand" href="http://www.gamesa.com.mx/"  target="_blank"></a></li>
							<li><a id="sabritas_brand" href="http://www.sabritas.com.mx" target="_blank"></a></li>
							<li><a id="sonrics_brand" href="http://www.sonrics.com.mx" target="_blank"></a></li>
						</ul>
					</div>
					<!-- Legal info -->
					<div id="legaltext" class="left ">
					    <span class="small-text"> 		
							© 2013 Rovio Entertainment Ltd. All rights reserved. <br/>
							Angry Birds is TM Rovio Entertainment Ltd. <a class="eula" href="http://www.rovio.com/eula/" target="_blank">EULA</a> <a class="privacy_policy" href="http://www.rovio.com/Privacy/" target="_blank">Privacy Policy</a> 		
						</span>	
					</div>
				</div>
				
                <!-- <div class="clear"> </div>	-->	
				<div id="overlay" style="display:none;"></div>  		    		
			</div>	<!-- page end -->
			

<div id="page-footer" class="container"></div>
   </body>
</html>
