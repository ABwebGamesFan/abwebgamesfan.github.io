var height = 680;
var width = 840;

/*function readURL(){
	language = window.location.href.split("=")[1];
	language = (language || "").toLowerCase();
	if((language == "en") || (language == "es")){
		createCookie('c_language',language,7);
	}
	else{
		createCookie('c_language','es',7);
	}
}();*/

function language(language){
	/*console.log(arguments);*/
	function createCookie(c_name,value,days){
		if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = c_name+"="+value+expires+"; path=/";
	}
	createCookie('c_language',language,7); //seven days the language cookie is stored
}

function readCookie(c_name){
		var nameEQ = c_name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = ca[i];
			while(c.charAt(0)==' ') c=c.substring(1,c.length);
			if(c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		
		return null;
}

function displayFAQ(/*codes*/){
	/*createCookie('c_codes', codes, 0);*/
	var x = readCookie('c_language');
	x = (x || "").toLowerCase();
	if(x == ""){
		Popup('./html/faq.html?lang=es','FAQ',height,width);
	}
	else{
		Popup('./html/faq.html?lang='+x,'FAQ',height,width);
	}
}

function openURL(url) {
	Popup(url,'',height,width);
}

/**
 * Displays a popup window
 * @param url
 * @param name
 * @param height
 * @param width
 */
function Popup(url, name, height, width) {
	var iMyWidth;
	var iMyHeight;
	//half the screen width minus half the new window width (plus 5 pixel borders).
	iMyWidth = (screen.width/2)- width/2;
	//half the screen height minus half the new window height (plus title and status bars).
	iMyHeight = (screen.height/2) -height/2;

	window.open( url, '', 'status=1,resizable=no,scrollbars=1,height=' + height + ',width=' + width +',left=' + iMyWidth + ',top=' + iMyHeight + ',screenX=' + iMyWidth + ',screenY=' + iMyHeight);
}

/**
 * Request to fetch an url and display the content of it 
 * in the specified div.
 * @param urlToFetch
 * @param no
 * @param popup Displays as a popup
 */
function fetchAjax(urlToFetch,no, popup) {
	
	$.ajax({
		  url: urlToFetch,
		  context: document.body,
		  success: function(data){		    	

				  $('#divContent_' + no).html(data);
				  $('#divContent_' + no).toggle();
		  }
		  
		});
	
}

/* Checks if the Browser is IE. Resturns true if IE*/
function isIE() {
  return /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
}

function isIEVersionSupported() {
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) 
	{ //test for MSIE x.x;
		var ieversion=new Number(RegExp.$1);	  
		if (ieversion<8) {
		  return false;
		} 
	} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
		 var oprversion=new Number(window.opera.version);		 		 
		 if (oprversion < 11) {
			 return false;
		 }
	} else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
		 var ffversion=new Number(RegExp.$1);
		 if (ffversion < 5) {
			 return false;
		 }
	} else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)){		
		 var saversion=new Number(RegExp.$1);
		 if (saversion < 5) {
			 return false;
		 }
	}

	return true;
}
/*
 * Returns true if Mac, false otherwise
 */
function isMac() {	
	return navigator.appVersion.indexOf("Mac")!=-1;
}

function isFF() {
	return navigator.userAgent.toLowerCase().indexOf("firefox")!=-1;
}

var deviceIphone = "iphone";
var deviceIpod = "ipod";
var deviceAndroid = "android";

//Initialize our user agent string to lower case.
var uagent = navigator.userAgent.toLowerCase();

//**************************
// Detects if the current device is an iPhone.
function DetectIphone()
{
   if (uagent.search(deviceIphone) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is an iPod Touch.
function DetectIpod()
{
   if (uagent.search(deviceIpod) > -1)
      return true;
   else
      return false;
}


//**************************
//Detects if the current device is an Android phone
function DetectAndroid()
{
 if (uagent.search(deviceAndroid) > -1)
    return true;
 else
    return false;
}


//**************************
// Detects if the current device is an iPhone or iPod Touch.
function IsPhone()
{
    if (DetectIphone())
       return true;
    else if (DetectIpod())
       return true;
    else if (DetectAndroid())
    	return true;
    else
       return false;
}

function getMovieName(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
    	return window[movieName];
    }
    else {
    	return document[movieName];
    }
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

function hideScrollbars() {
    $('body').css('overflow', 'hidden');
}

function showScrollbars() {
    $('body').css('overflow', 'auto');
}
function facebook(){
	var x = readCookie('c_language');
	x = (x || "").toLowerCase();
	if(x == 'en'){
		window.open('https://www.facebook.com/dialog/feed?app_id=369055036524649&link=http://tazos.angrybirds.com/&picture=http://angrybirds-spacetazos.appspot.com/images/fb_sharing.png&name=Play%20Tazos%20Angry%20Birds&description=The%20Angry%20Birds%20are%20playing%20with%20Tazos%20in%20SPACE.%20Head%20on%20over%20to%20join%20in!&redirect_uri=http://tazos.angrybirds.com/html/selfclose.html', '_blank');
	}
	else{
        window.open('https://www.facebook.com/dialog/feed?app_id=369055036524649&link=http://tazos.angrybirds.com/&picture=http://angrybirds-spacetazos.appspot.com/images/fb_sharing.png&name=Juega%20Tazos%20Angry%20Birds&description=Los%20Angry%20Birds%20est%C3%A1n%20jugando%20con%20Tazos%20en%20el%20ESPACIO%2C%20%C2%A1Ven%20y%20participa!&redirect_uri=http://tazos.angrybirds.com/html/selfclose.html', '_blank');
	}
}
function twitter(){
	var x = readCookie('c_language');
	x = (x || "").toLowerCase();
	if(x == 'en'){
		window.open('https://twitter.com/share?text=I\'m+playing+Angry+Birds+with+Tazos.+In+SPACE.+Yes,+of+course+I\'m+being+serious!+%23AngryBirdsTazos', '_blank');
		/*trackEvent('sharing','tw');*/
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}else{
		window.open('https://twitter.com/share?text=Estoy%20jugando%20Angry%20Birds%20con%20Tazos.%20En%20el%20ESPACIO.%20S%C3%AD%2C%20por%20supuesto%20%C2%A1Lo%20digo%20en%20serio!+%23AngryBirdsTazos', '_blank');
		/*trackEvent('sharing','tw');*/
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}
}