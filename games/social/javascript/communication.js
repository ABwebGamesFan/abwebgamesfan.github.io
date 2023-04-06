/**
 * 
 */

var xmlDoc = null ;
var username = null;

var fb_id = null;
var fb_name = null;
var facebookAppID = '162250310456760';

var loadingState = 0;

var xmlContent = null;
var componentToLoad = null;

var servicesUrl = 'http://jachren.angry-birds-social.appspot.com/services/'; //'http://127.0.0.1:8888/services/'; //local service 
var swfHandle = null;

if (document.location.href.indexOf('http://127.0.0.1') > -1 ) {
	servicesUrl = 'http://127.0.0.1:8888/services/'; //local service 
}
else if (document.location.href.indexOf('1.angry') > -1 ) {
	servicesUrl = 'http://1.angry-birds-social.appspot.com/services/';
}
else if (document.location.href.indexOf('tpm.angry') > -1 ) {
	facebookAppID = '119116987030';
	servicesUrl = '/services/';
}

/**	
 * **************************************************************************
 * *********************** INTERFACE
 * **************************************************************************
 */

function setFacebookAppId(appId) {
	facebookAppID = appId;
	//alert("AppId set to " + facebookAppID);
}

function setSwfHandle(swf_id) {
	swfHandle = document.getElementById(swf_id);
}

function showWasRight(elementId, flag) {

	if (flag) {
		$('#'+elementId+'-wrong').fadeOut();
		$('#'+elementId+'-okay').fadeIn();
	}
	else {
		$('#'+elementId+'-wrong').fadeIn();
		$('#'+elementId+'-okay').fadeOut();
	}
	
}

function doRegister() {

	email = document.getElementById('register-pop-up-email').value;
	user = document.getElementById('register-pop-up-username').value;
	pass = document.getElementById('register-pop-up-password').value;
	//passcheck = document.getElementById('register-pop-up-password-check').value;
	if (email.length > 1 && email.indexOf('@') && user.length > 1 && pass.length > 1) {
		register(email,user,pass);
	}
	else {
		if (!(email.length > 1 && email.indexOf('@') > 0)) showWasRight('reg-email', false);
		else showWasRight('reg-email', true);
		if (!(user.length > 1)) showWasRight('reg-user', false);
		else showWasRight('reg-user', true);
		if (!(pass.length > 1)) showWasRight('reg-pass', false);
		else showWasRight('reg-pass', true);
		
		$('#register-green-button').animate({'rotate': 8},50, function() { 
			$('#register-green-button').animate({'rotate': -8},50, function() { 
				$('#register-green-button').animate({'rotate': 0},50); 
			}); 
		});
	}
}

function doSessionLogin() {
	if (getToken()) {
		//alert("doSessionLogin");
		sessionLogin();
	}
	//else alert("no token cookie");
}

function doLogin() {
	email = document.getElementById('login-pop-up-email').value;
	pass = document.getElementById('login-pop-up-password').value;
	if (email && pass) {
		login(email,pass);
	}
	else {
		//alert("params missing");
		failedLogin();
	}
}

function failedLogin() {
	$('#login-button').animate({'rotate': 8},50, function() { 
		$('#login-button').animate({'rotate': -8},50, function() { 
			$('#login-button').animate({'rotate': 0},50); 
		}); 
	});
}

function doChangePassword(frm) {
	email = document.getElementById('change-password-pop-up-email').value;
	oldpass = document.getElementById('change-password-pop-up-old-password').value;
	pass = document.getElementById('change-password-pop-up-password').value;
	passcheck = document.getElementById('change-password-pop-up-password-check').value;
	if (pass == passcheck) {
		changePassword(email, oldpass, pass);
	}
	else {
		showError(44, "Password mismatch.");
	}
}

function doChangeEmail(frm) {
	//frm = document.frm;
	//email = frm.email.value;
	//oldemail = frm.oldemail.value;
	email = document.getElementById('change-email-pop-up-old-email').value;
	oldemail = document.getElementById('change-email-pop-up-email').value;
	pass = document.getElementById('change-email-pop-up-password').value;
	//TODO check form
	changeEmail(email, oldemail, pass);
}

function doLoginWithFacebook() {
	var fbName = null;
	FB.api('/me', function(response) {
		fb_id = response.id;
		fb_name = response.name;
		if (username && fb_name) {
			isAccountTiedToFacebook();
		}
		else {
			loginWithFacebook();
		}
	});
}

function doFacebookRegister(frm) {
	user = frm.username.value;
	registerWithFacebook(user);	
}

function doLogout() {
	username = null;
	//parent.location='?logout=1';
	setCookie("ab_token", null, -1);
	setUserName('');
	document.getElementById('AngryBirdsSocial').setAuthToken('');
	//FB.logout();
}

function doLoginAndTieFacebook(frm) {
	email = frm.email.value;
	pass = frm.password.value;
	loginAndTieFacebook(email, pass);
}

function doRequestEmailVerification(email) {
	requestEmailVerification(email);
}

function getToken() {
	return getCookie("ab_token");
}
function getUserInfo() {
	return username;
}


function initFacebook(callback) {
	//window.fbAsyncInit = function() { 
	 	FB.init(
		{ 
			appId:facebookAppID, cookie:true, 
			status:true, xfbml:true 
		});
	 	//alert("Initialized: "+FB.Facebook);
	 	//if (callback) callback();
	//};

}

function doFacebookLogin() {
   
	

	if (!FB.Facebook) {
		initFacebook();
	}
	
	FB.login(function(response) {
   	  if (response.session) {
   		  // user successfully logged in
   		  //alert("Fetching fb user...");
   		  FB.api('/me', function(response) {
   			  alert(response.id+" "+response.name);
   			  setFacebookName(response.name);
   			  doLoginWithFacebook();

   		  });
   	  } else {
   		  // user cancelled login
   		  alert('FB Connect failed!');
   	  }
	}, {perms:'read_friendlists'});
}

function doFacebookLogout() {
	FB.logout();
	setPopUp(false);	
}

/**	
 * **************************************************************************
 * *********************** SERVICES 
 * **************************************************************************
 */

function callService(service, data, callBack) {
	if (typeof window.ActiveXObject != 'undefined' ) {
		xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
		xmlDoc.onreadystatechange = callBack ;
	}
	else {
		xmlDoc = new XMLHttpRequest();
		xmlDoc.onload = callBack ;
	}
	
	//
	//params = "C=" + service + "&" + data;
	params = data; //"?" + data;
	//alert("sending: URL: '"+(servicesUrl+"' service: '" +service+"'"));
	//if (service == 'login') alert(servicesUrl+service+" "+params);
	xmlDoc.open("POST", servicesUrl+""+service, false );
	xmlDoc.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
	xmlDoc.setRequestHeader('Content-length',params.length);
	xmlDoc.setRequestHeader('Connection', 'close');
	//if (service == "sessionLogin") alert(params);
	xmlDoc.send(params);
	
	/*$.ajax({
		   url: servicesUrl+service,
		   data: params,
		   //success: callBack
		   success: callBack
		 });
	alert("sent to: "+(servicesUrl+service));*/
}

function login(email, pass) {
	//alert("email=" + email + "&type=AB&pass=" + pass);
	callService("login", "auth=" + email + "&type=AB&pass=" + pass, processLogin);
}

function sessionLogin() {
	callService("login", "type=session&token=" + getToken(), processSessionLogin);
}

function register(email, user, pass) {
	callService("register", "type=AB&auth=" + email + "&user=" + user + "&pass=" + pass, processRegister);
}

function changePassword(email, oldpass, pass) {
	callService("changePassword", "token=" + getToken() + "&email=" + email + "&oldpass=" + oldpass + "&newpass=" + pass, processChangePassword);
}

function changeEmail(email, oldemail, pass) {
	callService("changeEmail", "token=" + getToken() + "&email=" + email + "&oldemail=" + oldemail + "&pass=" + pass, processChangeEmail);
}

function requestEmailVerification(email) {
	callService("requestEmailVerification", "token=" + getToken() + "&email=" + email, processRequestEmailVerification);
}

function updateStats(pass_token, data) {
	callService("updateStats", "token=" + pass_token + "&" + data, processGetStats);
}

function getPlays(pass_token) {
	callService("getStats", "token=" + pass_token, processGetStats);
}

function tieFacebookAccount() {
	callService("tieFacebookAccount", "token=" + getToken() + "&auth=" + getAuthTokenFromFacebookCookie("access_token"), processTieFacebookAccount);
}

function isAccountTiedToFacebook() {
	callService('isAccountTiedToFacebook', "token=" + getToken() + "&auth=" + getAuthTokenFromFacebookCookie("access_token"), processIsAccountTiedToFacebook);
}

function untieFacebookAccount() {
	callService("untieFacebookAccount", "token=" + getToken() + "&auth=" + getAuthTokenFromFacebookCookie("access_token"), processUntieFacebookAccount);
}

function loginWithFacebook() {
	callService("loginWithFacebook", "auth=" + getAuthTokenFromFacebookCookie("access_token"), processLoginWithFacebook);
}

function registerWithFacebook(user) {
	callService("registerWithFacebook", "user=" + user + "&auth=" + getAuthTokenFromFacebookCookie("access_token"), processLoginWithFacebook);
}

function loginAndTieFacebook(email, pass) {
	callService("loginAndTieFacebook", "email=" + email + "&pass=" + pass + "&auth=" + getAuthTokenFromFacebookCookie("access_token"), processLogin);
}

function unlockItem(object, objectId, unlock) {
	callService("unlockItem", "token=" + getToken() + "&object=" + object + "&object_id=" + objectId + "&unlock=" + unlock, processUnlockItem);
}

function getUnlocks(object, objectId) {
	if (object && objectId) {
		callService("getUnlocks", "token=" + getToken() + "&object=" + object + "&object_id=" + objectId, processGetUnlocks);
	}
	else {
		callService("getUnlocks", "token=" + getToken(), processGetUnlocks);
	}
}

function setShowFacebook(show) {
	callService("setShowFacebook", "token=" + getToken() + "&show=" + show, processSetShowFacebook);
}

function getLevelList() {
	callService("getLevelList", "token=" + getToken(), processLevelList);
}

/**	
 * **************************************************************************
 * *********************** CALLBACKS
 * **************************************************************************
 */

function getResponse(doc) {
	//alert("getResponse: "+doc.responseText);

	//setPopUp(false);
	var values = new Array();
	if (doc.readyState != 4) {
		values['error'] = "Ready state = " + doc.readyState;
	}
	else {
		var vars = doc.responseText.split("&");
		for (var i=0; i<vars.length; i++) {
			var pair = vars[i].split("=");
			values[pair[0]] = pair[1];
		}
	}
	return values;
}

function processLogin() {
	var values = getResponse(xmlDoc);
	var userJSON = jQuery.parseJSON(values['json']);
	//alert('test');
	//alert("Processing login");
	if (userJSON['error']) {
		//showError("COMM", userJSON['error']);
		failedLogin();
		setCookie("ab_token", null, -1);
	}
	else {
		// Parse JSON
		tokenTemp = userJSON['token'];
		userTemp = userJSON['username'];
		setCookie("ab_token", tokenTemp+"", 30);
		setUserName(userTemp+"");
		if (userJSON['trigger'] == 'tie') {
			doLoginWithFacebook();
		}
	}	
}

function processSessionLogin() {
	var values = getResponse(xmlDoc);
	var userJSON = jQuery.parseJSON(values['json']);
	if (userJSON['error']) {
		//showError("COMM", values['error']);
		setCookie("ab_token", null, -1);
	}
	else {
		//alert('doing session login ['+userJSON['username']+']');
		setCookie("ab_token", userJSON['token'], 30);
		setUserName(userJSON['username']);
		if (userJSON['trigger'] == 'tie') {
			doLoginWithFacebook();
		}
	}	
}

function processRegister() {
	var values = getResponse(xmlDoc);
	var userJSON = jQuery.parseJSON(values['json']);
	if (userJSON['error']) {
		showError("COMM", userJSON['error']);
	}
	else {
		tokenTemp = userJSON['token'];
		userTemp = userJSON['username'];
		setCookie("ab_token", tokenTemp+"", 30);
		setUserName(userTemp+"");
		setPopUp(false);	
	}	
}

function processChangePassword() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		//alert("Password changed: " + values['status']);
		getContent('user_profile', 'sub-page', 'sheet=settings');
	}
}

function processChangeEmail() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		//alert("Email changed to " + values['newemail']);
		getContent('user_profile', 'sub-page', 'sheet=settings');
	}
}

function processSetShowFacebook() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		getContent('user_profile', 'sub-page', 'sheet=settings');
	}
}

function processRequestEmailVerification() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		alert("Mail sent");
	}
}

function processGetStats() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		status = values['status'];
		setProgress(187, values['xp'], values['coins']);
	}
}

function processUpdateStats() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		status = values['status'];
		getPlays(getToken());
	}
}

function processTieFacebookAccount() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		status = values['status'];
		id = values['id'];
		data = values['data'];
	}
}

function processIsAccountTiedToFacebook() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else if (values['trigger'] == 'tie') {
		setPopUp('tie-FB-confirmation-pop-up');
		document.getElementById('tie-FB-confirmation-pop-up-profile-image').src = "http://graph.facebook.com/" + fb_id + "/picture";
		document.getElementById('tie-FB-confirmation-pop-up-profile-name').innerHTML = fb_name;
		document.getElementById('tie-FB-confirmation-pop-up-user-name').innerHTML = username;
	}
	else {
		status = values['status'];
		//alert("Accounts already tied together: " + "Status = " + status);
	}
}

function processUntieFacebookAccount() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else {
		alert("FB Account freed");
	}
}

function processLoginWithFacebook() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else if (values['trigger'] == 'register'){
		setPopUp('register-with-FB-pop-up');
	}
	else {
		username = values['user'];
		setCookie("ab_token", values['token'], 30);
		setUserName(username);
	}
}

function processUnlockItem() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else if (values['status'] == 'have'){
		alert("You already have " + values['object'] + "/" + values['object_id'] +
				"\n" + 
				"\nUnlocked: " + values['unlocked'] + 
				"\nExpires: " + values['expires'] + 
				"\nMethod: " +  values['unlocked_by']);
	}
	else if (values['status'] == 'unlocked'){
		alert("Unlocked:" + values['object'] + "/" + values['object_id']);
	}
	else if (values['status'] == 'cannot'){
		alert("Cannot unlock:" + values['object'] + "/" + values['object_id']);
	}
	else {
		alert("Unknown error");
	}
}

function processGetUnlocks() {
	var values = getResponse(xmlDoc);
	
	if (values['error']) {
		showError("COMM", values['error']);
	}
	else if (values['status'] == 'yes'){
		alert("You have it" + "\nExpires: " + values['expires']);
	}
	else if (values['status'] == 'no'){
		alert("You don't have it");
	}
	else {
		alert("Unlocked items: \n" + values['unlocks']);
	}
}

/**	
 * **************************************************************************
 * *********************** SESSION HANDLING
 * **************************************************************************
 */

function setCookie(cookieName,cookieValue,nDays) {
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) nDays=1;
	expire.setTime(today.getTime() + 3600000*24*nDays);
	document.cookie = cookieName+"="+escape(cookieValue)
	+ ";expires="+expire.toGMTString();
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

/**
 * Some info about the Facebook Cookie.
 * 
 * The name of the cookie is of the form "fbs_<app_id>", where app_id is the FB application id.
 * The value is something like the following (the example is cut in the middle, because it's really long): 
 * 		"access_token=162250310456760|2.v95Wp0zYKT4x1lQskdji0g__.3600.128...   ...acb271d&uid=686367254" 
 * It includes the quotes, which should be stripped when reading the key=value pairs.
 */
function getAuthTokenFromFacebookCookie(param_name) {
	//FB cookie name is of the form "fbs_<app_id>"
	var cookieData = unescape(getCookie("fbs_" + facebookAppID).slice(1,-1));
	//alert("fbs_" + facebookAppID + ": " + cookieData);
	var values = new Array();
	var vars = cookieData.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == param_name) {
			return pair[1];
		}
	}
	return "0";
}



/**	
 * **************************************************************************
 * *********************** TESTING FUNCTIONS
 * **************************************************************************
 */

function del(type) {
	callService("delete", "token=" + getToken() + "&type=" + type + "&secret=" + "IhaveTHErightsTOdelete*_*", doLogout);
	getContent('user_profile', 'sub-page', null);
}

function testUpdateStats() {
	updateStats(getToken(), "plays=1");
}

function testGetPlays() {
	if (getToken()) {
		getPlays(getToken());
	}
}

function testUnlockItem(id) {
	unlockItem("TEST", id, "test interface");
}

function testIsUnlockItem(id) {
	getUnlocks("TEST", id);
}

function testGetUnlocks() {
	getUnlocks();
}

/**	
 * **************************************************************************
 * *********************** CONTENT
 * **************************************************************************
 */

function getContent(page, component, params) {
	
	componentToLoad = component;
	pageOnLoad = page;
	if (page == null) {
		document.getElementById(componentToLoad).innerHTML = "&nbsp";
	}
	else {
		
		if (typeof window.ActiveXObject != 'undefined' ) {
			xmlContent = new ActiveXObject("Microsoft.XMLHTTP");
			xmlContent.onreadystatechange = showContent ;
		}
		else {
			xmlContent = new XMLHttpRequest();
			xmlContent.onload = showContent ;
		}
		
		var pLen = 0;
		if (params) {
			params += "&user=" + username;
			pLen = params.length;
		}
		else {
			params = "user=" + username;
			pLen = params.length;
		}
	
		xmlContent.open("POST", "served/" + page + ".php", false );
		xmlContent.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
		xmlContent.setRequestHeader('Content-length',pLen);
		xmlContent.setRequestHeader('Connection', 'close');
		loadingState = 1;
		xmlContent.send(params);
	}
}

function showContent() {
	$("#loader-container").fadeOut(300);
	if (xmlContent.readyState != 4) {
		showError("CONTENT", "Error loading " + componentToLoad);
	}
	else {
		loadingState = 0;
		document.getElementById(componentToLoad).innerHTML = xmlContent.responseText;
		getFriendsListToProfile();
	}
}

function processLevelList(xmlDoc) {
	var values = getResponse(xmlDoc);
}
