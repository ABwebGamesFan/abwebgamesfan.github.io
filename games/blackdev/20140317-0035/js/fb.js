config.feedImageVersion = "1";

var protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';

var stringConstants = {
	CROWN_BRONZE: "bronze",
	CROWN_SILVER: "silver",
	CROWN_GOLD: "gold",

	SHARE_THREE_STARS_TITLE: "Three Star Club!",
	SHARE_THREE_STARS_LINE1: "I just aced %1 with my skills and got %2 points.",
	SHARE_THREE_STARS_LINE2: "",

	SHARE_CROWN_TITLE: "All hail the mighty ruler!",
	SHARE_CROWN_LINE1: "I just owned %2 and won a %1 crown with %3 points.",
	SHARE_CROWN_LINE2: "",

	SHARE_TOURNAMENT_1ST_TITLE: "Gold Leader!",
	SHARE_TOURNAMENT_1ST_LINE1: "I got %1 points and beat all my friends in the Angry Birds Star Wars Weekly Tournament.",
	SHARE_TOURNAMENT_1ST_LINE2: "Think you can beat me in the next Tournament?",

	SHARE_TOURNAMENT_2ND_TITLE: "Silver Starfighter!",
	SHARE_TOURNAMENT_2ND_LINE1: "I took second place in the Angry Birds Star Wars Weekly Tournament with %1 points.",
	SHARE_TOURNAMENT_2ND_LINE2: "Come and challenge me in the next Tournament!",

	SHARE_TOURNAMENT_3RD_TITLE: "Bronze Master!",
	SHARE_TOURNAMENT_3RD_LINE1: "I won the bronze trophy in the Angry Birds Star Wars Weekly Tournament with %1 points.",
	SHARE_TOURNAMENT_3RD_LINE2: "Come play with me in the next Tournament!",

	SHARE_MEDAL_GOLD_TITLE: "Total destruction!",
	SHARE_MEDAL_GOLD_LINE1: "I just obliterated %1 with the Mighty Falcon.",
	SHARE_MEDAL_GOLD_LINE2: "Click play to try the level yourself!",

	SHARE_DEFAULT_TITLE: "Angry Birds Star Wars",
	SHARE_DEFAULT_LINE1: "I just %1 %2 in Angry Birds Star Wars!",
	SHARE_DEFAULT_LINE2: "Click the icon to play the level.",

	SHARE_AVATAR_TITLE: "I made a new avatar!",

	INVITE_TITLE: "Select friends to invite",
	INVITE_MESSAGE: "Squawk! Join the Rebellion and compete against your friends in Angry Birds Star Wars!",

	SEND_GIFTS_FRIEND_SELECTOR_TITLE: "Select which friends to send free Crystals to",
	SEND_GIFTS_SINGLE_TITLE: "Send a gift to your friend.",
	SEND_GIFTS_MESSAGE: "%1 just sent you a Crystal. Claim it now!",

    SEND_HELP_REQUEST_FRIEND_SELECTOR_TITLE: "Ask selected friends for Crystals",
    SEND_HELP_REQUEST_SINGLE_TITLE: "Ask your friend to send you a Crystal.",
    SEND_HELP_REQUEST_MESSAGE: "%1 needs your assistance! Click to help them out and send a Crystal!",

	BRAG_TITLE: "Let your friends know you have beaten their score",
	BRAG_MESSAGE: "I beat your high score in %1 in Angry Birds Star Wars! Think you can beat mine?",

	CHALLENGE_TITLE: "Ask your friend to join the Tournament!",
	CHALLENGE_MESSAGE: "%1 challenged you to the Angry Birds Star Wars Weekly Tournament. Can you beat their score?"
}

var permissions = {};

function deleteAllRequests() {
// Delete all requests that brought us here, always
    var request_ids = getURLParameter("request_ids");
    if (request_ids && request_ids != "null") {
        var requests = request_ids.split('%2C');
        $.each(requests, function() {
            FB.api(this + '_' + config.userId, "delete", function(response) {
                //console.log("Delete requests response: " + response);
            });
        });
    }
}

function updatePermissions(callback) {
	FB.api('/me/permissions', function (response) {
		permissions = response.data[0];
		if (callback) {
			callback();
		}
	});
}

function placeOrder(productId) {
    // calling the local currency API ...
    FB.ui({
            method: 'pay',
            action: 'purchaseitem',
            product: protocol + '//apps.facebook.com/' + config.appDomain + '/open_graph/object/OGProduct/' + productId,
            quantity: 1                  // optional, defaults to 1
        },
        orderCallback
    );
}

function onUrl(data) {
	document.getElementById("AngryBirdsBlack").onUrl(data.path);
}

var widthToggle = true;

/*
 JS callback will return a payment_id which represents the unique order,
 that was just completed and has associated information such as amount and quantity
 */
var orderCallback = function(data) {
    onUIDialogClose();
    if (data['payment_id'] && data['quantity'] && data['status']) {
        document.getElementById("AngryBirdsBlack").purchaseComplete();
    }
};

function sharePhoto(photoId) {
	pauseGame();
	FB.ui({
		method: "feed",
		link: protocol + "//apps.facebook.com/" + config.appDomain,
		picture: protocol +"//facebook.com/photo.php?fbid=" + photoId,
		name: stringConstants.SHARE_AVATAR_TITLE,
        ref: "avatar"
	}, onUIDialogClose);
}

function shareThreeStars(levelId, levelDisplay, score) {
	pauseGame();
    var link = protocol + "//apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=stars";
   	FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: "stars",
		attachment: {
			name: stringConstants.SHARE_THREE_STARS_TITLE.replace("%1", levelDisplay),
			caption: stringConstants.SHARE_THREE_STARS_LINE1.replace("%1", levelDisplay).replace("%2", score),
			description: stringConstants.SHARE_THREE_STARS_LINE2,
			href: link,
			media: [{"type": "image",
				"src": getShareImageUrl("stars.png", levelId),
                "href": link
				}]
		}
	}, onShareUIDialogClose("stars", levelId));
}

function shareGoldMedal(levelId, levelDisplay) {
	pauseGame();
    var medalRef = "medal_gold";
    var link = protocol + "//apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=" + medalRef;

    FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: medalRef,
		attachment: {
			name: stringConstants.SHARE_MEDAL_GOLD_TITLE,
			caption: stringConstants.SHARE_MEDAL_GOLD_LINE1.replace("%1", levelDisplay),
			description: stringConstants.SHARE_MEDAL_GOLD_LINE2,
			href: link,
			media: [{"type": "image",
				"src": getShareImageUrl("share_medal_gold.png", levelId),
                "href": link
				}]
		}
	}, onShareUIDialogClose(medalRef, levelId));
}


function shareDefault(levelId, levelDisplay, score, completedLevel) {
	pauseGame();
    var link = protocol + "//apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=play";
    FB.ui({
		method: "stream.publish",
		user_message_prompt: "",
		message: "message",
        ref: "play",
		attachment: {
			name: stringConstants.SHARE_DEFAULT_TITLE,
			caption: stringConstants.SHARE_DEFAULT_LINE1.replace("%1", (completedLevel ? "beat" : "played")).replace("%2", levelDisplay),
			description: stringConstants.SHARE_DEFAULT_LINE2,
			href: link,
			media: [{"type": "image",
				"src": getShareImageUrl("share_level_complete.jpg", levelId),
                "href": link
				}]
		}
	}, onShareUIDialogClose(completedLevel ? "win" : "lose", levelId));
}

function shareCrown(levelId, levelDisplay, rank, score) {
	if (rank >= 1 && rank <= 3)
	{
		var crown = [stringConstants.CROWN_GOLD, stringConstants.CROWN_SILVER, stringConstants.CROWN_BRONZE][rank - 1];
        var link = protocol + "//apps.facebook.com/" + config.appDomain + "/?levelId=" + levelId + "&ref=crown";
		pauseGame();
		FB.ui({
			method: "stream.publish",
			user_message_prompt: "",
			message: "message",
            ref: "crown",
			attachment: {
				name: stringConstants.SHARE_CROWN_TITLE,
				caption: stringConstants.SHARE_CROWN_LINE1.replace("%1", crown).replace("%2", levelDisplay).replace("%3", score),
				description: stringConstants.SHARE_CROWN_LINE2,
				href: link,
				media: [{"type": "image",
					"src": getShareImageUrl("share_crown_" + crown + ".png", levelId),
                    "href":link
					}]
			}
		}, onShareUIDialogClose("crown", levelId) );
	}
}

function getShareImageUrl(type, levelId) {
    return config.serverRoot + "/fb_images/" + type + "?v=" + config.feedImageVersion;
}

function onShareUIDialogClose(shareType, levelId) {
	return function (response) {
		if (response) { // Only track if it was actually shared
			trackEvent1Percent("share", shareType, levelId);

			// let the flash know that the sharing is completed
			if (shareType == "crown"){	// now only for the crown
				document.getElementById("AngryBirdsBlack").crownShared();
			} else if (shareType == "tournament"){
				document.getElementById("AngryBirdsBlack").tournamentRankShared();
			}
		}
		onUIDialogClose(response);
	};
}

function shareTournamentRank(tournamentRank, points) {
	pauseGame();

	var tournamentMsgName, tournamentCaption, tournamentDescription;
	var tournamentPhoto;

	switch(tournamentRank)
	{
		case 1:
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_1ST_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_1ST_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_1ST_LINE2;
			tournamentPhoto = "share_trophy_gold.png";
			break;

		case 2:
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_2ND_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_2ND_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_2ND_LINE2;
            tournamentPhoto = "share_trophy_silver.png";
            break;

		case 3:
			tournamentMsgName = stringConstants.SHARE_TOURNAMENT_3RD_TITLE;
			tournamentCaption = stringConstants.SHARE_TOURNAMENT_3RD_LINE1;
			tournamentDescription = stringConstants.SHARE_TOURNAMENT_3RD_LINE2;
            tournamentPhoto = "share_trophy_bronze.png";
            break;
	}

	FB.ui({
		method: "feed",
		link: protocol + "//apps.facebook.com/" + config.appDomain + "/?ref=tournament",
		picture: config.serverRoot + "/fb_images/"+ tournamentPhoto +"?v=" + config.feedImageVersion,
		name: tournamentMsgName,
		caption: tournamentCaption.replace("%1", points),
		description: tournamentDescription,
        ref: "tournament"
	}, onShareUIDialogClose("tournament", tournamentRank));
}

function flashInviteFriendsHandler(toUser) {
	var uiObj = { method: "apprequests",
		filters: ["app_non_users"],
		title: stringConstants.INVITE_TITLE,
		message: stringConstants.INVITE_MESSAGE,
        ref: "invite"
	};
	if (toUser) {
		uiObj.to = toUser;
	}
	pauseGame();
	FB.ui(uiObj, onInvitationDialogClose);
}

function onInvitationDialogClose(response) {
	onUIDialogClose(response);
	if(response && response.to) {
		// Here, requests have been sent, facebook gives you the ids of all requests
		document.getElementById("AngryBirdsBlack").invitationBatchSent(response.to);

		var url = "/invitationsent/" + encodeURIComponent(response.to) + "?st=" + getSessionToken();
		$.get(url);
		var inviteCount = response.to ? response.to.length : 0;
		trackEvent1Percent("invite", "invitation-sent", "" + inviteCount, inviteCount);
    } else {
    	// No requests sent
	}
}

function flashShowFirstTimePayerPromotion() {
	pauseGame();
	var obj = {
	  method: 'fbpromotion',
	  display: 'popup',
	  package_name: 'zero_promo',
	  product: protocol + '//apps.facebook.com/' + config.appDomain + '/open_graph/object/OGCredit'
	};

	FB.ui(obj, onFirstTimePayerPromotion);
}

function flashSendGiftToFriends(originName, friendsIDs) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendsIDs,
		title: stringConstants.SEND_GIFTS_FRIEND_SELECTOR_TITLE,
		message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", originName),
        ref: "gift"
	}, onGiftSent);
}

function flashSendGiftFriend(originName, friendId) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.SEND_GIFTS_SINGLE_TITLE,
		message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", originName),
        ref: "gift"
	}, onGiftSent);
}

function flashSendHelpRequestToFriends(originName, friendsIDs) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendsIDs,
		title: stringConstants.SEND_HELP_REQUEST_FRIEND_SELECTOR_TITLE,
		message: stringConstants.SEND_HELP_REQUEST_MESSAGE.replace("%1", originName),
        ref: "help"
	}, onHelpSent);
}

function flashSendHelpRequestFriend(originName, friendId) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.SEND_HELP_REQUEST_SINGLE_TITLE,
		message: stringConstants.SEND_HELP_REQUEST_MESSAGE.replace("%1", originName),
        ref: "help"
	}, onHelpSent);
}

function flashSendChallengeFriend(originName, friendId) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.CHALLENGE_TITLE,
		message: stringConstants.CHALLENGE_MESSAGE.replace("%1", originName),
        ref: "challenge"
	}, onChallengeSent);
}

function flashSendChallengeToFriends(originName, friendsIDs) {
	pauseGame();
	FB.ui({ method:"apprequests",
		to: friendsIDs,
		title: stringConstants.CHALLENGE_TITLE,
		message: stringConstants.CHALLENGE_MESSAGE.replace("%1", originName),
		ref: "challenge"
	}, onChallengeSent);
}

function onChallengeSent(response) {
    onUIDialogClose(response);
    if (response !== undefined && response.request !== undefined) {
		document.getElementById("AngryBirdsBlack").challengeSent(response.to);
    	var url = "/bragrequestsent/" + response.request + "/t_challenge/" + encodeURIComponent(response.to) + "?st=" + getSessionToken();
        $.get(url);
    	trackEvent1Percent("challenge", "challenge-sent", null, 0);
    }
}

function onFirstTimePayerPromotion(response) {
    onUIDialogClose(response);
    if (response !== undefined && response.request !== undefined) {
		document.getElementById("AngryBirdsBlack").newPayerPromotionSent(response.to);
		trackEvent10Percent("newpayer", "newpayer-promotion-sent", null, 0);
    }
}

function onGiftSent(response) {
    if (response == undefined || response.request == undefined) {
        resumeGame(false);
        return;
    }

    onUIDialogClose(response);

    if (response !== undefined && response.request !== undefined) {
        document.getElementById("AngryBirdsBlack").giftsSentToUsers(response.to);
        var url = "/giftrequestsent/" + response.request + "/" + encodeURIComponent(response.to) + "?st=" + getSessionToken();
        $.get(url);
		trackEvent1Percent("gift", "gift-sent", null, 0);
    }
}

function onHelpSent(response) {
    onUIDialogClose(response);

    if (response !== undefined && response.request !== undefined) {
        document.getElementById("AngryBirdsBlack").helpRequestSentToUsers(response.to);
        var url = "/helprequestsent/" + response.request + "/" + encodeURIComponent(response.to) + "?st=" + getSessionToken();
        $.get(url);
		trackEvent1Percent("gift", "help-request-sent", null, 0);
    }
}

/*function flashSendCrownStolen(friendIds, levelName) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendIds,
		message: "Sorry, but I took your crown on level " + levelName + " in Angry Birds. Try to get it back if you can!",
        title: "Let your friends know you passed them",
        data: levelName
	}, onUIDialogClose);
}*/

function flashBrag(friendId, levelId, levelDisplay) {
	pauseGame();
	FB.ui({ method: "apprequests",
		to: friendId,
		title: stringConstants.BRAG_TITLE,
		message: stringConstants.BRAG_MESSAGE.replace("%1", levelDisplay),
        ref: "brag"
	}, function (response) {
        onUIDialogClose(response);
        if (response !== undefined && response.request !== undefined) {
            var url = "/bragrequestsent/" + response.request + "/" +  levelId + "/" + encodeURIComponent(response.to) + "?st=" + getSessionToken();
            $.get(url);
        }
    });
}

function askForPublishStreamPermission()
{
	if (permissions.publish_stream) {
		document.getElementById("AngryBirdsBlack").permissionRequestComplete("true");
	} else {
		// No permission, ask for it
		FB.login(
			function(response) {
				// Check to see if the user granted us the permissions after the dialog has been closed
				updatePermissions(function() {
					if (permissions.publish_stream) {
						document.getElementById("AngryBirdsBlack").permissionRequestComplete("true");
					} else {
						document.getElementById("AngryBirdsBlack").permissionRequestComplete("false");
					}
				});
			}, {scope:'publish_stream'}
		);
	}
}

function flashDeleteRequest(requestId) {
    FB.api(requestId, 'delete', function(response) {
        // keep calm and carry on
    });
}

 function login(response) {
	 postLogin();
	/*var url = "/login/" +  response.authResponse.userID + "/" + response.authResponse.accessToken +  "/" + response.authResponse.expiresIn;
	$.get(url, function(data){
		if (data.error !== undefined) {
			// TODO handle error
		} else {
			postLogin();
		}
	})*/;
}

function onUIDialogClose(response) {
	resumeGame(true);
}

function requestAuthorization() {
	window.location.replace("/fbauth/authRequest" + window.location.search);
}

function logout() {
	window.location.replace("/logout");
}

function getSessionToken() {
	return document.getElementById("AngryBirdsBlack").getSessionToken();
}

function getTips() {
	return config.loadingTips;
}

function renewAccessToken() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			// Store the response parameters
			config.accessToken = response.authResponse.accessToken;
			config.tokenExpiresIn = response.authResponse.expiresIn;

			document.getElementById("AngryBirdsBlack").accessTokenRenewed(config.accessToken);
		}
		else
		{
			document.getElementById("AngryBirdsBlack").error("Could not renew access token. Status: '" + response.status + "'.");
		}
	});
}