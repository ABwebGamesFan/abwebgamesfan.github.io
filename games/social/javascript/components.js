/**
 * 
 */
var loggedFB = false;
var loadedLevelKey = '';
var tabs = new Array();
tabs['home']= 0;
tabs['browse']= -111;
tabs['shop']= -111;
tabs['build']= -111;
tabs['community']= -111;
var currentPage = 'home';
var avatarRefreshParameter = 0;


function getFriendsListToProfile() {
	var query = FB.Data.query('select uid, name, is_app_user from user where uid in (select uid2 from friend where uid1=me()) and is_app_user=1');
	var data = "";
	query.wait(function(rows) {
		for ( var i = 0; i < rows.length; i++) {
			data += '<div style="display:inline;width:25px;"><img src="http://graph.facebook.com/' + rows[i].uid + '/picture" height="25" width="25" /></div>';
		}
		document.getElementById("profile-FB-friends-list").innerHTML = data;
	});
}

function showFriendUsingApp() {
	var query = FB.Data.query('select uid, name, is_app_user from user where uid in (select uid2 from friend where uid1=me()) and is_app_user=1');
	query.wait(function(rows) {
		for ( var i = 0; i < rows.length; i++) {
			document.getElementById('FB-friend-' + rows[i].uid).innerHTML = "<b>AB</b>";
			document.getElementById('FB-friend-' + rows[i].uid).style.backgroundColor = "#884444";
		}
	});
}

function getUserFacebookInfo() {
	//alert("fetching facebook user info");
	var query = FB.Data.query('select uid, first_name, pic_square from user where uid = me()');
	var output = "";
	query.wait(function(rows) {
		output = rows[0].uid + ":" + escape(rows[0].first_name) + ":" + escape(rows[0].pic_square) + ":";
		document.getElementById('AngryBirdsSocial').setFacebookUserInfo(output);
		//alert("returning facebook info");
	});
}

// called from the client. Fetches facebook friends from FB Data API and sends them back to client. Assumes 
// client has a 'setFriends' callback function
function getFacebookFriendsForSwf() {
	var query = FB.Data.query('select uid, first_name, pic_square, is_app_user from user where uid in (select uid2 from friend where uid1=me()) and is_app_user=1');
	var output = "";
	query.wait(function(rows) {
		for ( var i = 0; i < rows.length; i++) {
			output += rows[i].uid + ":" + escape(rows[i].first_name) + ":" + escape(rows[i].pic_square) + ":";
		}
		document.getElementById('AngryBirdsSocial').setFriends(output);
	});
}

//Temporary function for testing FB friends. Ugly but functional.
function showFriends(data) {
		
	var html = '<div style="width:700px;height:420px;position:relative;left:282px;top:171px;background-color:#FFFFFF;text-align:center;vertical-align:middle;overflow:scroll;">';
	if (!data) {
		html += "No Friends, no community.";
	}
	else {
		html += '<table cellspacing="5">';

		var col = 1;
		var addtr = false;
		
		for ( var friend in data) {
			if (col != 1) {
				html += '<td style="width:90px;overflow:hidden;">';
			}
			else {
				html += '<tr><td style="width:90px;overflow:hidden;">';
				addtr = true;
			}
			html += 
				'<div class="fb-friend-image">' +
				'<img src="http://graph.facebook.com/' + data[friend].id + '/picture" height="50" width="50" />' +
				'<div class="stroke-text-container" style="display:block;">' +
			    	'<div class="stroke-text-background-left">' + data[friend].name + '</div>' +
			    	'<div class="stroke-text-background-top">' + data[friend].name + '</div>' +
			    	'<div class="stroke-text-background-right">' + data[friend].name + '</div>' +
			    	'<div class="stroke-text-background-bottom">' + data[friend].name + '</div>' +
			    	'<div class="stroke-text-foreground">' + data[friend].name + '</div>' +
		    	'</div>' +
				'</div>' +
				'<div class="ab-stamp" id="FB-friend-' + data[friend].id + '">[invite]</div>';
				'<br><br>';
			if (col != 7) {
				html += "</td>";
				col++;
			}
			else {
				html += "</td></tr>";
				col = 1;
				addtr = false;
			}
		}
		for ( var int = col; int < 7; int++) {
			html += "<td>&nbsp;</td>";
		}
		if (addtr) {
			html += "</tr>";
		}
		html += "</table>";
	}	
	html += "</div>";
	
	var newPage = 'community';

	for ( var tab in tabs) {
		tabs[tab] = -111;
		document.getElementById('tab-' + tab).style.backgroundPosition = "0px " + tabs[tab] + "px";
	}
	tabs[newPage] = 0;
	document.getElementById('tab-' + currentPage).style.backgroundPosition = "0px " + tabs[currentPage] + "px";
	document.getElementById('tab-' + newPage).style.backgroundPosition = "0px " + tabs[newPage] + "px";
	
	//getContent(newPage, 'sub-page', null);
	currentPage = newPage;
	document.getElementById('swf_div').style.height = "420px";
	document.getElementById('sub-page').innerHTML = html;
	
	showFriendUsingApp();
}

/**
 * Switch the flash component to player view. Assumes the flash component has a "showLevel()"-method.
 * TODO: Make the ids as parameters.
 */
function showPlayer() {
	document.getElementById('swf_div').style.height = "420px";
	document.getElementById('swf_div').style.top = "194px";
	document.getElementById('AngryBirdsSocial').showLevel();
}

function showSavedLevel(levelKey) {
	if (levelKey != null) showLevelPage(levelKey);
	$('#browse-container').hide();
	$('#profile-container').hide();
	$('#main-container').show();
	$('#AngryBirdsSocial').height(420);
	if (levelKey != '') document.getElementById('AngryBirdsSocial').showSavedLevel(levelKey);
	
}

/**
 * Switch the flash component to editor view. Assumes the flash component has a "showEditor()"-method.
 * TODO: Make the ids as parameters.
 */
function showEditor()  {
	if (getUserInfo() != "" && getUserInfo()+"" != "null" && getUserInfo()+"" != "undefined") {
		$('#main-container').hide();
		$('#browse-container').hide();
		$('#profile-container').hide();
		$('#AngryBirdsSocial').height(560);
		document.getElementById('AngryBirdsSocial').showEditor();
	}
	else showLogin();
}

/**
 * Switch the content table to level browser view.
 */
function showLevelBrowser() {
	document.getElementById('swf_div').style.height = "797px";
}

/**
 * Switch the content table to shop view.
 */
function showShop() {
	document.getElementById('swf_div').style.height = "428px";
}

/**
 * Changes the tab on the main page and loads the corresponding content.
 */
function switchTab(newPage) {
	
	
	if (newPage == currentPage) {
		$('#tab-new-'+newPage).css('background-image', 'url(./img2/TabSelected.png)');
		getContent(newPage, 'sub-page', null);
	}
	else {
		/*
		for ( var tab in tabs) {
			tabs[tab] = -111;
			document.getElementById('tab-' + tab).style.backgroundPosition = "0px " + tabs[tab] + "px";
		}
		tabs[newPage] = 0;
		document.getElementById('tab-' + currentPage).style.backgroundPosition = "0px " + tabs[currentPage] + "px";
		document.getElementById('tab-' + newPage).style.backgroundPosition = "0px " + tabs[newPage] + "px";
		*/
		document.getElementById("loader-container").style.display = "block";

		//$('#tab-new-'+currentPage).toggleClass("tab-new-bg-deselected"); 
		$('#tab-new-'+currentPage).css('background-image', 'url(./img2/TabDeselected.png)');
		//$('#tab-new-'+newPage).toggleClass("tab-new-bg-selected"); 
		$('#tab-new-'+newPage).css('background-image', 'url(./img2/TabSelected.png)');				        

		getContent(newPage, 'sub-page', null);
		currentPage = newPage;
		document.getElementById('swf_div').style.height = "420px";
	}

	// Clear all the things related to a new page loading
	level_offset = 0;

}

function tabHover(div, action) {
	if (action == 'over') 
		$('#tab-new-'+div).css('background-image', 'url(./img2/TabHover.png)');
	else {
		if (div == currentPage) $('#tab-new-'+div).css('background-image', 'url(./img2/TabSelected.png)');
		else $('#tab-new-'+div).css('background-image', 'url(./img2/TabDeselected.png)');
	}
}

/**
 * Sets the current popup on the screen, use false or null as a parameter to hide all popups.
 * Currently it hides all possible popups to be sure only the selected is visible.
 * TODO: May need to redesign.
 * @param popup
 */
function setPopUp(popup) {
	if (!popup) {
		$('#login-popup-container').html('');
		$('#darken-background').fadeOut(300);
	}
	/*
	document.getElementById('register-pop-up').style.display = 'none';
	document.getElementById('login-pop-up').style.display = 'none';
	document.getElementById('tie-FB-confirmation-pop-up').style.display = 'none';
	document.getElementById('registration-confirmation-pop-up').style.display = 'none';
	document.getElementById('registration-confirmation-FB-pop-up').style.display = 'none';
	document.getElementById('change-password-pop-up').style.display = 'none';
	document.getElementById('change-email-pop-up').style.display = 'none';
	document.getElementById('register-with-FB-pop-up').style.display = 'none';
	*/
	if (popup) {
		document.getElementById(popup).style.display = 'block';
	}
}

/**
 * A hackish way to pass the current email to the pass/email change forms. This could be gotten separately from the
 * server too, but this saves a connection. 
 * TODO: May need to redesign.
 * @param email
 */
function setChangeFormEmail(email) {
	document.getElementById('change-password-pop-up-email').value = email;
	document.getElementById('change-email-pop-up-old-email').value = email;
}

function showFacebookProfileImage(id) {
	if (id) {
		loggedFB = true;
		document.getElementById("facebook-connect-image").src="http://graph.facebook.com/" + id + "/picture";
		document.getElementById("facebook-connect-bar").style.display = "none";
		document.getElementById("facebook-connect-bar-logged").style.display = "block";
	}
	else {
		loggedFB = false;
		document.getElementById("facebook-connect-image").src="img/unknown.jpg";
		document.getElementById("facebook-connect-bar-logged").style.display = "none";
		document.getElementById("facebook-connect-bar").style.display = "block";
	}
}

/**
 * Sets the XP-progress.
 * TODO: Need to support level gaps.
 * @param max
 * @param value
 * @param coins
 */
function setProgress(max, value, coins) {
	var width=187;
	var filledWidth = value % max;
	var level = (value - filledWidth) / max;
	document.getElementById("mini-profile-level-number").innerHTML = level;
	document.getElementById("mini-profile-coins").innerHTML = coins;
	document.getElementById("mini-profile-progress-bar-left").style.width = filledWidth + "px";
	document.getElementById("mini-profile-progress-bar-right").style.width = (width - filledWidth) + "px";
}

function setFacebookName(name) {
	alert("Connected as Facebook name: "+name);
//	document.getElementById('facebook-connect-name').innerHTML = name;
}

/**
 * Called when the user logs in. Sets all the relevant parameters and visible UI elements.
 * @param name
 */
function setUserName(name) {
	username = name;
	if (name) {
		try {
			//alert("setting: ["+name+"]");
			document.getElementById('AngryBirdsSocial').setUserName(name);
			
			//alert(getToken());
			document.getElementById('AngryBirdsSocial').setAuthToken(getToken());
		} catch (e) {
			// TODO: handle exception
			//alert('Error setting name and token');
		}
		setupLoginBar(true);
		setPopUp(false);
	}
	else {
		try {
			document.getElementById('AngryBirdsSocial').setAuthToken('');
		} catch (e) {
			// TODO: handle exception
			// SWF probably not loaded yet.
		}
		$("#loader-container").fadeIn(200);
		$("#log-out").fadeOut(200);
	}
	
}

function getSessionInfo() {
	updateHome();
	if (getUserInfo() != "" && getUserInfo()+"" != "null" && getUserInfo()+"" != "undefined") {
		document.getElementById('AngryBirdsSocial').setUserName(getUserInfo());
		document.getElementById('AngryBirdsSocial').setAuthToken(getToken());
		setupLoginBar(true);
	}
}

function setupLoginBar(loggedIn) {
	if (loggedIn) {
		if (getUserInfo() != "" && getUserInfo()+"" != "null" && getUserInfo()+"" != "undefined") {
			document.getElementById('your-name-here').innerHTML = getUserInfo();
			document.getElementById('log-sign-in').style.display = 'none';
			document.getElementById('log-sign-out').style.display = 'block';
			$('#login-pop-up').hide();
		}
	}
	else {
		document.getElementById('your-name-here').innerHTML = "Guest";
		document.getElementById('log-sign-in').style.display = 'block';
		document.getElementById('log-sign-out').style.display = 'none';
	}
}

function showError(type, message) {
	alert("Error: " + type + "\n\n" + message);
}



var timeoutID;
function updateHome() {
	$('#miniprofile-container').load('/pages/miniprofile.html', function() {
		setupLoginBar(true);
	});
	$('#main-container-1').load('/pages/highlighted.html', function() {
		//alert('added highlighted');
	});
	$('#main-container-2').load('/pages/search.html', function() {
		//alert('added search');
	});
	timeoutID = window.setTimeout(populateLevelBoxes, 200);
}

function showLevelPage(levelKey) {
	loadedLevelKey = levelKey;
	$('#main-container-2').html('');
	$('#main-container-2').load('/pages/comments.html', function() {
		getLevelComments(levelKey, username, 0, 5);
		$('#text-box').jqEasyCounter();
	});
}

function getLevelComments(levelKey, username, offset, limit) {
	$.ajax({
		  url: servicesUrl+"getLevelComments",
		  type: "POST",
		  data: "levelKey="+levelKey+"&user="+username+"&offset="+offset+"&limit="+limit,
		  success: function(msg){
			  msg = unescape(msg);
			  var secondParam = msg.split('&')[1];
			  var commentListJSON = jQuery.parseJSON(secondParam.split('=')[1]);
			  for (key in commentListJSON.comments) {
				  first = commentListJSON.comments[key];
				  str = getLevelPageComment(first.user, first.timestamp, first.comment);
				  $('#all-the-comments').append(str);
			  }
		  }
	});
}

function submitLevelComment(levelKey, comment) {
	if (!(getUserInfo() != "" && getUserInfo()+"" != "null" && getUserInfo()+"" != "undefined")) {
		showLogin();
	}
	else {
		$.ajax({
			  url: servicesUrl+"submitLevelComment",
			  type: "POST",
			  data: "levelKey="+levelKey+"&token="+getToken()+"&comment="+comment,
			  success: function(msg){
				  $('#all-the-comments').html('');
				  getLevelComments(levelKey, username, 0, 5);
			  }
		});
	}
}

function updateProfile() {
	if (getUserInfo() != "" && getUserInfo()+"" != "null" && getUserInfo()+"" != "undefined") {
		$('#AngryBirdsSocial').height(0);
		$('#main-container').hide();
		$('#browse-container').html('');
		$('#profile-container').show();
		$('#profile-container').load('/pages/profile.html', function() {
			// Update avatar
			updateAvatarPicture();  
		});
	}
	else showLogin();
}

function showLogin() {
	$('#darken-background').fadeIn(300);
	$('#login-popup-container').load('/pages/login.html');
}

function showRegister(fromLogin) {
	if (fromLogin) {
		$('#login-popup-container').fadeOut(200, function() {
			$('#login-popup-container').html('');
			$('#login-popup-container').load('/pages/register.html', function() {
				$('#login-popup-container').fadeIn(300);
			});
		});
	}
	else {
		$('#darken-background').fadeIn(300);
		$('#login-popup-container').load('/pages/register.html');
	}
	
}

function getLevelScreenDiv(levelName, levelKey) {
	
	var str = '<div style="position: relative; width: 187px; height: 151px;margin-right:5px;margin-bottom:5px;-moz-border-radius: 4px;border-radius: 4px;float:left;background-color:white;background-image: url(\'http://dev.angrybirds.com/upload/img/LevelThumbnailBase1.png\');">'+
	'<div style="position:absolute;top:7px;left:6px;width:175px;height:105px;cursor:pointer;background-image: url(\'/services/downloadScreenShot?levelKey='+levelKey+'\');" onclick="switchTab(\'home\');showSavedLevel(\''+levelKey+'\');return false;">&nbsp;'+
	'</div>'+
	'<div id="level_play_div_'+levelKey+'" style="display:none;">'+
	'	<div style="position:absolute;top:7px;left:6px;width:175px;height:105px;background-color:#ffffff;opacity:0.4;filter:alpha(opacity=40);border:0px;"></div>'+
	'	<div style="position:absolute;top:40px;left:30px;width:103px;height:56px;border:0px;"><a href="#" onclick="switchTab(\'home\');showSavedLevel(\''+levelKey+'\');return false;"><img src="http://dev.angrybirds.com/upload/img/PlayBtn_Up.png"></a></div>'+
	'</div>'+
	'<div style="position:absolute;left:7px;top:112px;">'+
	'	<p style="line-height:12px; width:110px; height:14px;padding:0px;margin:0px;font:12px arial,sans-serif;color:#7f7f7f;font-weight:bold;">'+
	'		'+levelName+
	'	</p>'+
	'	<p style="line-height:12px; width:110px; height:10px;padding-left:0px;margin:0px;font:12px arial,sans-serif;color:#7f7f7f;font-weight:bold;font-size:10px;color:#a7a7a7;">'+
	//'		14,662 played'+
	'	</p>'+
	'</div>	'+
	'<div style="position:absolute;left:119px;top:133px;border: 0px solid black;">'+
	'	<img src="http://dev.angrybirds.com/upload/img/2stars.png">'+
	'</div>	'+
	'<div onclick="switchTab(\'home\');showSavedLevel(\''+levelKey+'\');return false;" id="level_hover_div_118" style="cursor:pointer;display:block;position:absolute;top:7px;left:6px;width:157px;height:122px;z-index:1002;border:0px solid red;">'+ // onmouseout="$(\'#level_play_div_118\').fadeOut(150);" onmouseover="$(\'#level_play_div_118\').fadeIn(150);">'+
	'</div>'+
	'</div>';
	return str;
}

function showAvatarEditor() {
	
	if ($('#AvatarEditor').height() == 0) {

		$('#profile-inner-container').animate({
		    top: '450px'
		  }, 300, function() {
		    // Animation complete.
		    $('#AvatarEditor').height(510);
		    $('#close-avatar-editor').show();
		    $('#close-avatar-editor').css('rotate', 45);
			$('#profile-inner-container').animate({ top: '0px' }, 0, function() { $('#profile-inner-container').fadeOut(500); } );
		  });
	} else if ($('#AvatarEditor').height() == 510) {
		updateAvatarPicture();
		$('#profile-inner-container').fadeIn(400, function() { 
			$('#profile-inner-container').animate({ top: '500px' }, 0);
			$('#AvatarEditor').height(0);
			$('#profile-inner-container').animate({
			    top: '0px'
			  }, 400, function() {
				  $('#close-avatar-editor').hide();
				  $('#close-avatar-editor').css('rotate', 45);
			     // Animation complete.
			  });
		});
	}
}

(function($) {
    function getTransformProperty(element) {
        var properties = ['transform', 'WebkitTransform',
                          'MozTransform', 'msTransform',
                          'OTransform'];
        var p;
        while (p = properties.shift()) {
            if (element.style[p] !== undefined) {
                return p;
            }
        }
        return false;
    }
    $.cssHooks['rotate'] = {
        get: function(elem, computed, extra){
            var property = getTransformProperty(elem);
            if (property) {
                return elem.style[property].replace(/.*rotate\((.*)deg\).*/, '$1');
            } else {
                return '';
            }
        },
        set: function(elem, value){
            var property = getTransformProperty(elem);
            if (property) {
                value = parseInt(value);
                $(elem).data('rotatation', value);
                if (value == 0) {
                    elem.style[property] = '';
                } else {
                    elem.style[property] = 'rotate(' + value%360 + 'deg)';
                }
            } else {
                return '';
            }
        }
    };
    $.fx.step['rotate'] = function(fx){
        $.cssHooks['rotate'].set(fx.elem, fx.now);
    };
})(jQuery);

function showLevelList() {
	
	$('#AngryBirdsSocial').height(0);
	$('#main-container').hide();
	$('#profile-container').hide();
	$('#browse-container').html('');
	$('#browse-container').show();
	// Handle the browse list rendering here
	//return;
	var service = 'getLevelList';
	$.ajax({
		  url: servicesUrl+service,
		  type: "POST",
		  success: function(msg){
			  msg = unescape(msg);
			  var secondParam = msg.split('&')[1];
			  var levelListJSON = jQuery.parseJSON(secondParam.split('=')[1]);
			  for (key in levelListJSON) {
				  first = levelListJSON[key];
				  $('#browse-container').append(getLevelScreenDiv(first.levelName,first.levelKey));
			  }
		  }
		});
}

function populateLevelBoxes() {
	
	$('#popular-levels').html('');
	$('#newest-levels').html('');
	$('#premium-levels').html('');
	$('#browse-container').html('');
	$('#browse-container').hide();
	// Handle the browse list rendering here
	var count = 0;
	var service = 'getLevelList';
	$.ajax({
		  url: servicesUrl+service,
		  type: "POST",
		  success: function(msg){
			  msg = unescape(msg);
			  //var levelListJSON = jQuery.parseJSON(msg.split('&')[1]);
			  var secondParam = msg.split('&')[1];
			  var levelListJSON = jQuery.parseJSON(secondParam.split('=')[1]);
			  for (key in levelListJSON) {
				  first = levelListJSON[key];
				  $('#popular-levels').append(getHtmlLevelSmall(first.levelKey, first.levelName, first.user));
				  $('#newest-levels').append(getHtmlLevelSmall(first.levelKey, first.levelName, first.user)); 
				  $('#premium-levels').append(getHtmlLevelSmall(first.levelKey, first.levelName, first.user));
				  //$('#browse-container').append(getLevelScreenDiv(first.levelName,first.levelKey));
				  count++;
				  if (count == 7) break;
			  }
		  }
		});
	window.clearTimeout(timeoutID);
	updateAvatarPicture();
}

function updateAvatarPicture() {
	avatarRefreshParameter++;
	$('#profile-avatar').css("background-image", "url('/services/downloadProfileImage?user="+username+"&r="+avatarRefreshParameter+"')");
	$('#profile-avatar-small').css("background-image", "url('/services/downloadProfileImage?user="+username+"&r="+avatarRefreshParameter+"')");
	//$('#your-pic').css("background-image", "url('/services/downloadProfileImage?user="+username+"&r="+avatarRefreshParameter+"')");
	//$('#your-pic-img').css("background-image", "url('/services/downloadProfileImage?user="+username+"&r="+avatarRefreshParameter+"')");
	if ($("#your-name-here").html() != "Guest") 
		$("#your-pic-img").attr("src","/services/downloadProfileImage?user="+username+"&r="+avatarRefreshParameter);
}

function getHtmlLevelSmall(levelKey, levelName, levelCreator) {

	str = '<div id="level-'+levelKey+'" onclick="showSavedLevel(\''+levelKey+'\');return false;">'+
		'  <div class="spotlighted-bar-level-pic" style="background-image: url(\'/services/downloadScreenShot?levelKey='+levelKey+'\');"></div>'+
		'  <div class="spotlighted-bar-level-text">'+
		'	<p class="levels-text-topic">'+levelName+'</p>'+
		'	<p>by <a href="#" onclick="switchtab">'+levelCreator+'</a></p>'+
		'  </div>'+
		'</div>';	
	return str;
}

function getLevelPageComment(commentCreator, commentTime, comment) {
	
	strAgo = remaining.getString(-remaining.getSeconds(commentTime), null, true) + ' ago';
	str = '<div><img width="35" height="33" src="http://dev.angrybirds.com/ab2/img2/GuestProfilePicture.png" id="your-pic-img" alt="">'+
	'&nbsp;<span class="span-user-name">'+commentCreator+'</span>&nbsp;<span class="span-when-posted">'+strAgo+'</span>'+
	'<div class="comment-bar">'+comment+'</div>'+
	'</div>';
	return str;
}

// jqEasyCharCounter
(function($) {

	$.fn.extend({
	    jqEasyCounter: function(givenOptions) {
	        return this.each(function() {
	            var $this = $(this),
	                options = $.extend({
	                    maxChars: 500,
						maxCharsWarning: 80,
						msgFontSize: '10pt',
						msgFontColor: '#555',
						msgFontFamily: 'Arial',
						msgTextAlign: 'right',
						msgWarningColor: '#F00',
						msgAppendMethod: 'insertAfter'
	                }, givenOptions);
	            //font-size:11pt;line-height:32px;font-weight:bold;color:#555;
		
				if(options.maxChars <= 0) return;
				
				// <div class="comment-submit">Submit</div>
				var jqEasyCounterMsg2 = $("<div class=\"comment-submit\" onclick=\"submitLevelComment(loadedLevelKey, $('#text-box').val());\">Submit</div>");
				jqEasyCounterMsg2[options.msgAppendMethod]($this);
				
				// create counter element
				var jqEasyCounterMsg = $("<div class=\"jqEasyCounterMsg\">&nbsp;</div>");
				var jqEasyCounterMsgStyle = {
					'font-size' : options.msgFontSize,
					'font-family' : options.msgFontFamily,
					'color' : options.msgFontColor,
					'text-align' : options.msgTextAlign,
					'width' : '576px',
					'opacity' : 0,
					'border' : '0px solid black',
					'font-weight' : 'bold',
					'margin-right' : '8px',
					'float' : 'left',
					'line-height' : '32px'
				};
				jqEasyCounterMsg.css(jqEasyCounterMsgStyle);
				// append counter element to DOM
				jqEasyCounterMsg[options.msgAppendMethod]($this);
				
				
				
				// bind events to this element
				$this
					.bind('keydown keyup keypress', doCount)
					.bind('focus paste', function(){setTimeout(doCount, 10);})
					//.bind('blur', function(){jqEasyCounterMsg.stop().fadeTo( 'fast', 0);return false;})
					;
				
				function doCount(){
					var val = $this.val(),
						length = val.length
					
					if(length >= options.maxChars) {
						val = val.substring(0, options.maxChars); 				
					};
					
					if(length > options.maxChars){
						// keep scroll bar position
						var originalScrollTopPosition = $this.scrollTop();
						$this.val(val.substring(0, options.maxChars));
						$this.scrollTop(originalScrollTopPosition);
					};
					
					if(length >= options.maxCharsWarning){
						jqEasyCounterMsg.css({"color" : options.msgWarningColor});
					}else {
						jqEasyCounterMsg.css({"color" : options.msgFontColor});
					};
					
					//jqEasyCounterMsg.html('Characters: ' + $this.val().length + "/" + options.maxChars);
					jqEasyCounterMsg.html((options.maxChars - $this.val().length));
	                jqEasyCounterMsg.stop().fadeTo( 'fast', 1);
				};
	        });
	    }
	});

	})(jQuery);
