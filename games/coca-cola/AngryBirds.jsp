
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">    
    <head>
    	<!-- CSS for Common-->
        <link href="css/common.min.css" type="text/css" rel="stylesheet"/>        
        <!-- CSS for Layout -->
        <link href="css/fluid_grid.min.css" type="text/css" rel="stylesheet"/>
        <script type="text/javascript">
    	var _gaq = _gaq || [];                	  			 		                              
	  	_gaq.push(['_setAccount', 'UA-23082676-18']);			 			 				
	  	_gaq.push(['_setSampleRate', '100']);
	  	_gaq.push(['_trackPageview']);
	
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>  	
               	
        
        <title>愤怒的小鸟「可口可乐」中国节拍</title>        
		<meta name="description" content="愤怒的小鸟「可口可乐」中国节拍" />	        
        <meta name="google" value="notranslate" />         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Cache-Control" content="Public"/>
        <meta http-equiv="Expires" content="Mon, 31 Dec 2012 12:00:00 GMT"/>
        <meta name="description" content="愤怒的小鸟「可口可乐」中国节拍" />	        
		<meta property="og:image" content="http://coca-cola.angrybirds.com/images/icon_90x90.png"/>
		<meta property="og:title" content="愤怒的小鸟「可口可乐」中国节拍" />
		<meta property="og:url" content="http://coca-cola.angrybirds.com/" />      
               
        <style type="text/css" media="screen"> 
            
            object:focus { outline:none; }
            #flashContent { display:none; }
            
        </style>
                       
        <script type="text/javascript" src="js/common.min.js"></script>        
		<script type="text/javascript" src="js/ga.min.js"></script>
					
	    <!-- Box-Shadowing for IE6-9 -->
	    <script type="text/javascript" src="js/pie.min.js"> </script>		               
		<script type="text/javascript" src="js/jquery-1.7.min.js"> </script>    
        <script type="text/javascript" src="flash/swfobject.js"> </script>
        
        
        <script type="text/javascript" >
		
			
			/*
				When the document has loaded
			*/
		    $(document).ready(function(e) {		    	
		    	if (playerVersion.major < 11) {		    		
		        	$('#flashContent').show(); 		        	
					trackEvent10Percent('flash', 'prompt-install');				
		        }
		        if (IsPhone()) {
		        	$('#flashContent').show();
		        	$('#flashContent').html('<div class=\'center error-text\'>Not working on mobile.</div>')
		        	trackEvent10Percent('browser', 'mobile-not-supported');
		        }
		        if (!isIEVersionSupported()) {
		        	$('#flashContent').show();
		        	var ieErrorMsg = '对不起，本网站暂不支持IE6浏览器。 您可以点击';
		        	ieErrorMsg += '<a href="http://se.360.cn">http://se.360.cn</a>';
		        	ieErrorMsg += '，下载我们推荐的360安全浏览器。同时您也可以选择使用IE8、IE9、Firefox 4.0或Safari 5.0等浏览器。';
		        	
		        	$('#flashContent').html('<div class=\'center error-text\'>' + ieErrorMsg + '</div>')
		        	trackEvent10Percent('browser', 'ie-6-7-not-supported');
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
		    
	   
		    
	    </script>  
        <script type="text/javascript">
        var playerVersion = swfobject.getFlashPlayerVersion();
		      
		var rndValue = 0;       
        //If IE, create a random value so flash movie is refreshed when refreshing page. -->
        
        if (isIE()) {        
        	rndValue = Math.random();
        }
		
        if (playerVersion.major > 10 && !IsPhone() && isIEVersionSupported()) {
        	trackEvent10Percent('flash', 'embed');
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
            var swfVersionStr = "11.0.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
            var xiSwfUrlStr = "flash/playerProductInstall.swf";
                  
            
            var flashvars = {assetsUrl: "/flash/", buildNumber:"1-0-8-0.361328512090756798"};
                        
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            params.wmode = "direct";
            var attributes = {};
            attributes.id = "AngryBirdsFP11";
            attributes.name = "AngryBirdsFP11";
            attributes.align = "middle";
            swfobject.embedSWF(
                "flash/CocaColaChina.swf?version=1-0-8-0.361328512090756798&refresh=" + rndValue, "flashContent",
                "980", "570", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");

        }
        </script>
        <script type="text/javascript" src="js/swfwheel.js"></script>         
    </head>
    <body>    	    	
    	<!-- Use the fluid grid for cross browser compatibility -->
        <div id="page" class="container container_12">	<!-- Page start -->
				<div id="header">
               		<!-- Logo -->                
                    <div id="logo" class="left"> </div>
    				<!-- Menu -->
                    <div class="left buttons-margin" >                	
                      <a class="left btn-faq" href="javascript:;" style="" onclick="displayFAQ();">
                      </a>
                      <a class="left btn-highscore" href="javascript:;" onclick="displayWinners();">
                      </a>	                      
                    </div>
	            </div>
				<div class="clear"> </div>				
        		
<!-- Flash Wrapper -->
<div id="flashObject">
	<!-- Flash content-->	
	<div id="flashContent">
		<!-- Flash start -->		
		<div id="install-flash-div" class="error-text">
			对不起，您没有安装Flash播放器，或者播放器版本过低。请在以下网站下载或更新：<br /> <a
				href="http://get.adobe.com/flashplayer/" target="_blank">http://get.adobe.com/flashplayer/</a>
		</div>
		
		
	</div>
	<!-- Flash End -->
	<noscript>
	<div id="install-flash-div" class="error-text">
			对不起，您的浏览器不支持Javascript，请先开启脚本功能。
	</div>
</noscript>
</div>
<!-- Wrapper End -->
<div class="clear"></div>


				 <!-- Footer -->
                 <div class="clear"> </div>
                 <!-- Competition Text-->
   	
    	   		 <div id="footer">    	   		 	
	   		 	 <!-- Social Media Links -->
	   		 	 <div class="left center">
	   		 	 <a href="javascript:;" onclick="postToQQ();" class="social-tencent left"></a>
	   		 	 <script type="text/javascript">				
					document.write('<a onclick="openURL(\'http://service.weibo.com/share/share.php?url=&appkey=&title=我刚刚在@可口可乐 中国节拍版“愤怒的小鸟”和猪头们对战！快和我一起加入%23中国节拍%23，从猪头们那儿夺回节拍鼓，为中国体育健儿加油！你还有机会赢取可口可乐和愤怒的小鸟精彩好礼哦！' + encodeURIComponent('http://www.icoke.cn/services/og/cmps/2012olp/pt/ab/abf.aspx') +' &pic=' + location.href + '/images/icon_90x90.png&ralateUid=1915410615&language=\');" href="javascript:;" onclick="trackEvent10Percent(\'social\',\'share-weibo\');" class="social-weibo left"></a>');
				 </script>
	   		 	  		 		    	
	   		 	 </div>
	             <!-- Competition info -->
                 <div id="competition-text"  class="left small-text">活动已结束</div>
                 <!-- Legal info -->
                 <div id="legaltext" class="left small-text">                                  
				    © 2012 Rovio Entertainment Ltd. All rights reserved. 
					<br/>Angry Birds is TM Rovio Entertainment Ltd.					
				 	<a class="" href="http://www.rovio.com/eula/" target="_blank">EULA</a>
					<a class="" href="http://www.rovio.com/Privacy/" target="_blank">Privacy Policy</a>
					<br/><br/>「可口可乐」、”Coca-Cola”及弧形瓶是可口可乐公司的商标 。 
				 </div>
                 </div>   

			</div>	<!-- page end -->
				
   </body>
</html>
