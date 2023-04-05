


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">    
    <head>
        <title>Angry Birds Cheetos</title>        
		<meta name="description" content="Angry Birds Cheetos" />	        
        <meta name="google" value="notranslate" />         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Cache-Control" content="Public"/>
        <meta http-equiv="Expires" content="Mon, 31 Dec 2012 12:00:00 GMT"/>
        
        
        
        <!-- <meta http-equiv="Expires" content="Mon, 31 Dec 2012 12:00:00 GMT"/> -->
        
        <!-- Include CSS to eliminate any default margins/padding and set the height of the html element and 
             the body element to 100%, because Firefox, or any Gecko based browser, interprets percentage as 
             the percentage of the height of its parent container, which has to be set explicitly.  Fix for
             Firefox 3.6 focus border issues.  Initially, don't display flashContent div so it won't show 
             if JavaScript disabled.
        -->
        <style type="text/css" media="screen">             
            object:focus { outline:none; }
            #flashContent { display:none; }
            #bwowserSupport { display:none; }
            #cookieEnabled { display:none; }
            body {margin: 0px}            
        	.flashError{
        		text-align: center;
        		font-size: 16px;
        		font-family: Verdana;
        		margin: 40px 80px;
        	}
        	.errorContainer{
        		margin:150px auto;
        	}
        </style>
		
		<!-- Communication with parent -->	
		<script src="/rovioapi.js"></script>	
        <script type="text/javascript" >        
        	function getMovieName(movieName) {
       			if (navigator.appName.indexOf("Microsoft") != -1) {
        			return window[movieName];
       			}
       			else {
        			return document[movieName];
       			}
     		}       	
            
            try{ 
            	rovio.initFrame(window.parent.location.href);
            }
          	catch(e){
        	  	rovio.initFrame("");        	  
          	}
            
          	var loginId = null;
          	
            rovio.addEventListener("login", function(data) { 
           		loginId = data.id;          		
            }); 
            
            rovio.addEventListener("logout", function(data) { 
            	getMovieName("AngryBirdsFP11").logout();           	
            }); 
            
            function updateCredits(creditsLeft){
            	rovio.sendMessageParent({type: "updateCredits", credits: creditsLeft});
	     	}
            
            function levelStart(levelID){
	     		rovio.sendMessageParent({type: "levelStart", levelID: levelID});
	     	}
            
            function reauthenticate(userID){
	     		rovio.sendMessageParent({type: "reauthenticate", userID: userID});
	     	}
            function addCredits(){
            	rovio.sendMessageParent({type: "addCredits"});
            } 
            
            function claimPrize(userPrizeID){
            	rovio.sendMessageParent({type: "claimPrize", userPrizeID: userPrizeID});
            } 

			//in case login was called before flash was ready
            function flashIsReady(){
            	if(loginId !=null){
            		getMovieName("AngryBirdsFP11").loginPlayer(loginId);
            		loginId=null;
            	}
            }
			
            function levelComplete(levelID, succeed){
            	rovio.sendMessageParent({type: "levelComplete", levelID: levelID, succeed: succeed});
            } 
            
            function navigationConfirmed(url){
            	rovio.sendMessageParent({type: "navigationConfirmed", url: url});
            } 
            
            rovio.addEventListener("navigationAttempt", function(data) { 
            	getMovieName("AngryBirdsFP11").navigationAttempt(data.url);          	
            });  
            
            rovio.addEventListener("refreshGameSession", function(data) { 
            	getMovieName("AngryBirdsFP11").refreshSession();          	
            }); 
            
            function spotPrizeWin(){
            	rovio.sendMessageParent({type: "spotPrizeWin"});	
            }
            
      	</script>
      	
		<!-- Holds common functionality for page -->				        
        <script type="text/javascript" src="js/common.js"> </script>
        <!-- Fix for Mac Scrolling -->            
 		<script type="text/javascript" src="js/swfwheel.js"> </script>
                  
        <!-- Google Analytics tracking -->
        <script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-23082676-16']);	
		  //_gaq.push(['_setSampleRate', '10']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
              
		<script type="text/javascript" src="js/jquery-1.7.min.js"> </script>    
        <script type="text/javascript" src="flash/swfobject.js"> </script>
        
        
        <script type="text/javascript" >
		
			function hideScrollbars() {
			    $('body').css('overflow', 'hidden');
			}
			
			function showScrollbars() {
			    $('body').css('overflow', 'auto');
			}
			/*
				Prevents the scroll bar from scrolling.
			*/
			function stopWheel(e){
			    if(!e){ /* IE7, IE8, Chrome, Safari */ 
			        e = window.event; 
			    }
			    if(e.preventDefault) { /* Chrome, Safari, Firefox */ 
			        e.preventDefault();			       
			    } 
			    if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
			    e.returnValue = false; /* IE7, IE8 */
			}
		
			/*
				Tracks the event in Google Analytics. 
				
				@eventCategory The category of the event as string. e.g. 'Links'. Cannot be empty.
				@eventAction The action of the event as string. e.g. 'Button'. Optional.
				@eventLabel The label of the event as string. e.g. 'MyButton'. Optional.
				@eventValue An integer value. Optional.
			*/
			function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {				
				if (eventCategory == null) {
					return;
				} 
				if (eventAction == null) {
					eventAction = '';
				}
				if (eventLabel == null) {
					eventLabel = '';
				}
								
				if (eventValue == null) {
					_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel]);
				} else {
					_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue]);
				}
			}
			
			/*
				When the document has loaded
			*/
		    $(document).ready(function(e) {
	    	
		    	if (playerVersion.major < 11) {		            
		        	$('#flashContent').show();        	
		        }
		        if (isMobile()) {
		        	$('#flashContent').show();
		        	$('#flashContent').html('<div class=\'center\'>No available on mobile devices</div>')
		        }
		        if ( $.browser.msie && parseInt($.browser.version, 10) < 8) {
		        	$('#divContent_1').hide();
		        	$('#bwowserSupport').show();    
		        }
		        
		        //check cookies are enabled
		      	var cookieEnabled = (navigator.cookieEnabled) ? true : false;
		        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ 
		        	document.cookie="testcookie";
		            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
		      	}
		        
		        if(!cookieEnabled){
		        	$('#divContent_1').hide();
		        	$('#cookieEnabled').show();  
		        }
		        
 
	       
				/* Disable scrolling when mouse over game div */
		    	$('#divContent_1').hover(function() {

		    		if (isFF()) {
					    
				    	document.onmousewheel = function(){ stopWheel(); } /* IE7, IE8 */
				    	if(document.addEventListener){ /* Chrome, Safari, Firefox */
				    	    document.addEventListener('DOMMouseScroll', stopWheel, false);
				    	}
				    } else if (isMac()) {
				    	//other browsers on Mac
	    	    		hideScrollbars();
				    } else {		    	    
			    	    $(document).bind('mousewheel DOMMouseScroll',function(){
			    	    	//if mac, hide the scrollbar instead
			    	    		    	    
		    	        	stopWheel();
			    	        
			    	    });			    	   
		    	    }
		    	    
		    	}, function() {
					if (isFF()) {
					    				    	
				    	if(document.removeEventListener){ /* Chrome, Safari, Firefox */
				    	    document.removeEventListener('DOMMouseScroll', stopWheel, false);
				    	}
				    } else if (isMac()) {
				    	//other browsers on Mac
 			    		showScrollbars();
				    } else {
 			    		$(document).unbind('mousewheel DOMMouseScroll'); 			    		
 			    	}
		    	    
		    	});
			});		
		    
		    function handleonkeydown(e) {
		    	if (isIE()) {		    			    
			    	if (e.keyCode == 9) {
			        	e.preventDefault();
			    	}
		    	}
		    }
		    
	    </script>  
        <script type="text/javascript">
        var playerVersion = swfobject.getFlashPlayerVersion();
		      
		var rndValue = 0;       
        //If IE, create a random value so flash movie is refreshed when refreshing page. -->
        
        if (isIE()) {        
        	rndValue = Math.random();
        }
		
        if (playerVersion.major > 10 && !isMobile()) {
        	trackEvent('flash', 'embed');
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
            var swfVersionStr = "11.0.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
            var xiSwfUrlStr = "flash/playerProductInstall.swf";
            var flashvars = {assetsUrl: "/flash/", buildNumber:"1-0-2-2.359754348632131605",domain:""};
            var params = {};
            params.quality = "high";
            params.bgcolor = "#91CEED";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            params.wmode = "direct";
            var attributes = {};
            attributes.id = "AngryBirdsFP11";
            attributes.name = "AngryBirdsFP11";
            attributes.align = "middle";
            swfobject.embedSWF(
                "flash/CheetosAngryBirds.swf?version=1-0-2-2.359754348632131605&refresh=" + rndValue, "flashContent",
                "750", "500", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
        
        }
        

        </script>
          
		
    </head>
    <body onkeydown="handleonkeydown(event);">    	
    	<!-- Page Holder -->	        
    		<!-- <div  id="BannerLeft" class="grid_1">Banner Left</div> -->
	        <!-- SWFObject's dynamic embed method replaces this alternative HTML content with Flash content when enough 
	             JavaScript and Flash plug-in support is available. The div is initially hidden so that it doesn't show
	             when JavaScript is disabled.
	        -->	        
		<div id="bwowserSupport">
			<div class="errorContainer">
				<div class="flashError">
					<p>Üzgünüz, internet tarayıcın desteklenmiyor. Angry Birds Cheetos oynamak için bu tarayıcılardan birini tavsiye ederiz: </p>
					<p><a href="http://www.google.com/chrome" target=_blank>Google Chrome</a></p>
					<p><a href="http://www.mozilla.org/firefox/new/" target=_blank>Firefox</a></p>
					<p><a href="http://windows.microsoft.com/tr-TR/internet-explorer/downloads/ie" target=_blank>Internet Explorer 8 veya yukarısı</a></p>
				</div>
			</div>
		</div>
		<div id="cookieEnabled">
			<p>Cookies are disabled. You should enable cookies to play Angry Birds. </p>
		</div>
		<div id="divContent_1">
           	<div id="flashContent">	
           		<div class="errorContainer">	            
                	<p class="flashError">Angry Birds Cheetos oynamak için Flash versiyon 11 !</p> 
            		<div class="flashError"><a href="http://www.adobe.com/go/getflashplayer" onclick="trackEvent('Links', 'Download', 'Flash Player Scripts');" target="_blank"><img src="./images/get_flash_player.gif" alt="İndirmek için tıkla"/></a></div>	            
	        	</div>
	        </div>
			<noscript>
				Angry Birds Cheetos oynamak için Javascript'in etkin olması gerekiyor.
			</noscript>
		</div>
   </body>
</html>
