if (typeof JSON !== "object") {
    JSON = {}
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
config.feedImageVersion = "5";
var protocol = "https:" == document.location.protocol ? "https:" : "http:";
var stringConstants = {
    CROWN_BRONZE: "bronze",
    CROWN_SILVER: "silver",
    CROWN_GOLD: "gold",
    SHARE_THREE_STARS_TITLE: "Three Star Club!",
    SHARE_THREE_STARS_LINE1: "I just aced %1 with my skills and got %2 points.",
    SHARE_THREE_STARS_LINE2: "Click to try the level now!",
    SHARE_CROWN_TITLE: "All hail the mighty ruler!",
    SHARE_CROWN_LINE1: "I just owned %2 and won a %1 crown with %3 points.",
    SHARE_CROWN_LINE2: "Click to try the level right now!",
    SHARE_TOURNAMENT_1ST_TITLE: "Gold Standard!",
    SHARE_TOURNAMENT_1ST_LINE1: "I got %1 points and beat all my friends in the Angry Birds Friends Tournament.",
    SHARE_TOURNAMENT_1ST_LINE2: "Think you can beat me in the next tournament?",
    SHARE_TOURNAMENT_2ND_TITLE: "Silver Bullet!",
    SHARE_TOURNAMENT_2ND_LINE1: "I took second place in the Angry Birds Friends Tournament with %1 points.",
    SHARE_TOURNAMENT_2ND_LINE2: "Come and challenge me in the next tournament!",
    SHARE_TOURNAMENT_3RD_TITLE: "Bronze Medalist!",
    SHARE_TOURNAMENT_3RD_LINE1: "I won the bronze trophy in the Angry Birds Friends Tournament with %1 points.",
    SHARE_TOURNAMENT_3RD_LINE2: "Come play with me in the next tournament!",
    SHARE_ME_TITLE: "Total destruction!",
    SHARE_ME_LINE1: "I just obliterated %1 with the Mighty Eagle.",
    SHARE_ME_LINE2: "Click to try the level yourself!",
    SHARE_DEFAULT_TITLE: "Angry Birds Friends",
    SHARE_DEFAULT_LINE1: "I just %1 %2 in Angry Birds Friends!",
    SHARE_DEFAULT_LINE2: "Click to play it.",
    SHARE_AVATAR_TITLE: "I made a new avatar!",
    INVITE_TITLE: "Invite your friends!",
    INVITE_MESSAGE: "Join me in Angry Birds Friends and boost my rewards! Tournaments full of bird flinging, pig popping fun!",
    SEND_GIFTS_FRIEND_SELECTOR_TITLE: "Select friends to send mystery gifts to",
    SEND_GIFTS_SINGLE_TITLE: "Send a gift to your friend.",
    SEND_GIFTS_MESSAGE: "%1 just sent you a mystery gift. It may contain an amazing power up. Click to see if you've won one!",
    BRAG_TITLE: "Let your friends know you passed them",
    BRAG_MESSAGE: "I beat your high score in %1 in Angry Birds Friends! Think you can beat mine?",
    CHALLENGE_TITLE: "Ask your friend to join the Tournament!",
    CHALLENGE_MESSAGE: "I challenge you to the Tournament! Don't be a chicken, be an Angry Bird and boost my rewards!",
    SHARE_TOURNAMENT_LEAGUE_PROMOTION_TITLE: "League promotion!",
    SHARE_TOURNAMENT_LEAGUE_PROMOTION_TEXT: "I got promoted to %1 this week! Join me today and work your way to the top!",
    SHARE_TOURNAMENT_STAR_PROMOTION_TEXT: "I got promoted to Star Level %1 this week! Join me today and work your way to the top!",
    SHARE_TOURNAMENT_LEAGUE_WON_TITLE: "League winner!",
    SHARE_TOURNAMENT_LEAGUE_WON_TEXT: "I was 1st in my League last week and got promoted! Join me today and see if you have what it takes!",
    SHARE_TOURNAMENT_LEAGUE_CAPTION: "CLICK TO PLAY IN A LEAGUE!",
    SHARE_TOURNAMENT_AMONG_FRIENDS_PART1: "Join now and see if you can beat me in this weeks tournament!",
    SHARE_TOURNAMENT_1ST_AMONG_FRIENDS_TITLE: "Tournament Winner!",
    SHARE_TOURNAMENT_1ST_AMONG_FRIENDS_TEXT: "I won last week's tournament! Join now and see if you can beat me this week!",
    SHARE_TOURNAMENT_2ND_AMONG_FRIENDS_TITLE: "Silver trophy!",
    SHARE_TOURNAMENT_2ND_AMONG_FRIENDS_TEXT: "I got silver in last week's tournament! Join now and see if you can beat me this week!",
    SHARE_TOURNAMENT_3RD_AMONG_FRIENDS_TITLE: "Bronze trophy!",
    SHARE_TOURNAMENT_3RD_AMONG_FRIENDS_TEXT: "I got bronze in last week's tournament! Join now and see if you can beat me this week!",
    SHARE_TOURNAMENT_FRIENDS_CAPTION: "CLICK TO PLAY WITH YOUR FRIENDS!"
};
var openGraphConstants = {
    MYSTERY_GIFT: "OGMysteryGift",
    INVITE: "OGInvite",
    BRAG: "OGBrag"
};
var permissions = {};
var st = "";
function deleteAllRequests() {
    var a = getURLParameter("request_ids");
    if (a && a != "null") {
        var b = a.split("%2C");
        $.each(b, function(c, d) {
            FB.api(d, "delete", function(e) {})
        })
    }
}
function updatePermissions(a) {
    FB.api("/me/permissions", function(b) {
        for (var c = 0; c < b.data.length; c++) {
            if (b.data[c].status == "granted") {
                permissions[b.data[c].permission] = b.data[c].status
            }
        }
        if (a) {
            a()
        }
    })
}
function placeOrder(a) {
    var b = a.split("_");
    placeOrderPQ(b[0], b[1], b[2] + "_" + b[3])
}
function placeOrderPQ(b, e, d) {
    document.getElementById("AngryBirdsFacebook").orderReceived();
    var c = "?quantity=" + e;
    var a = {
        method: "pay",
        action: "purchaseitem",
        product: protocol + "//apps.facebook.com/" + config.appDomain + "/open_graph/object/" + b + c,
        request_id: d
    };
    pauseGame();
    FB.ui(a, orderCallback)
}
function placeOrderMobile(b, d, c) {
    document.getElementById("AngryBirdsFacebook").orderReceived();
    var a = {
        method: "pay",
        action: "purchaseitem",
        product: protocol + "//apps.facebook.com/" + config.appDomain + "/open_graph/object/OGVirtualCurrencyMobile?quantity=" + d,
        pricepoint_id: b,
        request_id: c
    };
    pauseGame();
    FB.ui(a, orderCallback)
}
function placeOrderRedeemGiftCard(b) {
    document.getElementById("AngryBirdsFacebook").orderReceived();
    var a = {
        method: "pay",
        action: "redeem"
    };
    pauseGame();
    FB.ui(a, orderCallback)
}
function onUrl(a) {
    document.getElementById("AngryBirdsFacebook").onUrl(a.path)
}
var widthToggle = true;
var orderCallback = function(a) {
    onUIDialogClose();
    if (a.error_code) {
        if (a.error_code == 1383104) {
            document.getElementById("AngryBirdsFacebook").handleExpiredMobilePricePoints();
            return
        }
        if (a.error_code == 1383010) {
            document.getElementById("AngryBirdsFacebook").handleUserCancelledOrder();
            return
        }
        if (a.error_code == 1383008) {
            document.getElementById("AngryBirdsFacebook").purchaseFailed();
            return
        }
    }
    if (a.payment_id && a.quantity && a.status && a.signed_request) {
        document.getElementById("AngryBirdsFacebook").purchaseComplete(a.payment_id, a.quantity, a.signed_request, a.status)
    }
};
function shareBrag(b, e, a, f, d, c) {
    pauseGame();
    FB.ui({
        method: "feed",
        to: b,
        name: a,
        description: f,
        caption: d,
        link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + c + "&ref=LVLBeatFrnd",
        picture: config.serverRoot + "/fb_images/brags/" + e + ".png?v=" + config.feedImageVersion,
        ref: "LVLBeatFrnd"
    }, function(g) {
        onUIDialogClose(g)
    })
}
function shareBragCrown(d, a, g, c, e, b) {
    var f = "LVLPlace3Frnd";
    if (e == 1) {
        f = "LVLPlace1Frnd"
    } else {
        if (e == 2) {
            f = "LVLPlace2Frnd"
        }
    }
    pauseGame();
    FB.ui({
        method: "feed",
        name: a,
        description: g,
        caption: c,
        link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + b + "&ref=" + f,
        picture: config.serverRoot + "/fb_images/brags/" + d + ".png?v=" + config.feedImageVersion,
        ref: f
    }, onShareUIDialogClose("crown", b))
}
function shareBragThreeStars(d, b, e, c, a) {
    pauseGame();
    FB.ui({
        method: "feed",
        name: b,
        description: e,
        caption: c,
        link: "http://apps.facebook.com/" + config.appDomain + "/?ref=tournament",
        picture: config.serverRoot + "/fb_images/brags/" + d + ".png?v=" + config.feedImageVersion,
        ref: "LVL3Stars"
    }, onShareUIDialogClose("tournamentStars", a))
}
function sharePhoto(a) {
    pauseGame();
    FB.ui({
        method: "feed",
        link: "http://apps.facebook.com/" + config.appDomain,
        picture: "http://facebook.com/photo.php?fbid=" + a,
        name: stringConstants.SHARE_AVATAR_TITLE,
        ref: "avatar"
    }, onUIDialogClose)
}
function shareThreeStars(b, a, c) {
    pauseGame();
    FB.ui({
        method: "feed",
        name: stringConstants.SHARE_THREE_STARS_TITLE.replace("%1", a),
        description: stringConstants.SHARE_THREE_STARS_LINE1.replace("%1", a).replace("%2", c),
        caption: stringConstants.SHARE_THREE_STARS_LINE2,
        link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + b + "&ref=LVL3Stars",
        picture: getShareImageUrl("stars", b),
        ref: "LVL3Stars"
    }, onShareUIDialogClose("stars", b))
}
function shareFeather(b, a) {
    pauseGame();
    FB.ui({
        method: "feed",
        name: stringConstants.SHARE_ME_TITLE,
        link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + b + "&ref=LVLFeather",
        picture: getShareImageUrl("me", b),
        description: stringConstants.SHARE_ME_LINE1.replace("%1", a),
        caption: stringConstants.SHARE_ME_LINE2,
        ref: "LVLFeather"
    }, onShareUIDialogClose("me", b))
}
function shareDefault(b, a, d, c) {
    pauseGame();
    FB.ui({
        method: "feed",
        name: stringConstants.SHARE_DEFAULT_TITLE,
        caption: stringConstants.SHARE_DEFAULT_LINE2,
        description: stringConstants.SHARE_DEFAULT_LINE1.replace("%1", (c ? "beat" : "played")).replace("%2", a),
        link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + b + "&ref=playthumb",
        picture: getShareImageUrl("default", b),
        ref: "playthumb"
    }, onShareUIDialogClose(c ? "win" : "lose", b))
}
function shareCrown(c, b, e, d) {
    if (e >= 1 && e <= 3) {
        var a = [stringConstants.CROWN_GOLD, stringConstants.CROWN_SILVER, stringConstants.CROWN_BRONZE][e - 1];
        var f = "LVLPlace3Frnd";
        if (e == 1) {
            f = "LVLPlace1Frnd"
        } else {
            if (e == 2) {
                f = "LVLPlace2Frnd"
            }
        }
        pauseGame();
        FB.ui({
            method: "feed",
            name: stringConstants.SHARE_CROWN_TITLE,
            description: stringConstants.SHARE_CROWN_LINE1.replace("%1", a).replace("%2", b).replace("%3", d),
            caption: stringConstants.SHARE_CROWN_LINE2,
            link: "http://apps.facebook.com/" + config.appDomain + "/?levelId=" + c + "&ref=" + f,
            picture: getShareImageUrl("crown", c),
            ref: f
        }, onShareUIDialogClose("crown", c))
    }
}
function getShareImageUrl(b, a) {
    return config.serverRoot + "/fb_images/levels/embed/" + a + ".png?v=" + config.feedImageVersion
}
function onShareUIDialogClose(a, b) {
    return function(c) {
        if (c) {
            trackEvent1Percent("share", a, b)
        }
        onUIDialogClose(c)
    }
}
function shareTournamentResult(c, d) {
    pauseGame();
    var f, e, a, b, g;
    switch (c) {
    case 1:
        f = stringConstants.SHARE_TOURNAMENT_LEAGUE_WON_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_LEAGUE_WON_TEXT;
        a = stringConstants.SHARE_TOURNAMENT_LEAGUE_CAPTION;
        b = "06_sharing_tournament_league_win.png";
        g = "TOURLeagueWin";
        break;
    case 2:
        f = stringConstants.SHARE_TOURNAMENT_LEAGUE_PROMOTION_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_LEAGUE_PROMOTION_TEXT.replace("%1", d);
        a = stringConstants.SHARE_TOURNAMENT_LEAGUE_CAPTION;
        b = "10_sharing_league_promotion.png";
        g = "TOURPromotion";
        break;
    case 3:
        f = stringConstants.SHARE_TOURNAMENT_LEAGUE_PROMOTION_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_STAR_PROMOTION_TEXT.replace("%1", d);
        a = stringConstants.SHARE_TOURNAMENT_LEAGUE_CAPTION;
        b = "10_sharing_league_promotion.png";
        g = "TOURPromotion";
        break;
    case 4:
        f = stringConstants.SHARE_TOURNAMENT_1ST_AMONG_FRIENDS_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_1ST_AMONG_FRIENDS_TEXT;
        a = stringConstants.SHARE_TOURNAMENT_FRIENDS_CAPTION;
        b = "07_sharing_tournament_1st_place.png";
        g = "TOURPlace1Frnd";
        break;
    case 5:
        f = stringConstants.SHARE_TOURNAMENT_2ND_AMONG_FRIENDS_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_2ND_AMONG_FRIENDS_TEXT;
        a = stringConstants.SHARE_TOURNAMENT_FRIENDS_CAPTION;
        b = "08_sharing_tournament_2nd_place.png";
        g = "TOURPlace2Frnd";
        break;
    case 6:
        f = stringConstants.SHARE_TOURNAMENT_3RD_AMONG_FRIENDS_TITLE;
        e = stringConstants.SHARE_TOURNAMENT_3RD_AMONG_FRIENDS_TEXT;
        a = stringConstants.SHARE_TOURNAMENT_FRIENDS_CAPTION;
        b = "09_sharing_tournament_3rd_place.png";
        g = "TOURPlace3Frnd";
        break
    }
    FB.ui({
        method: "feed",
        name: f,
        description: e,
        caption: a,
        link: "http://apps.facebook.com/" + config.appDomain + "/?ref=" + g,
        picture: config.serverRoot + "/fb_images/brags/" + b + "?v=" + config.feedImageVersion,
        ref: g
    }, onUIDialogClose)
}
function shareTournamentRank(e, b) {
    pauseGame();
    var d, f, a;
    var c;
    switch (e) {
    case "1st":
        d = stringConstants.SHARE_TOURNAMENT_1ST_TITLE;
        f = stringConstants.SHARE_TOURNAMENT_1ST_LINE1;
        a = stringConstants.SHARE_TOURNAMENT_1ST_LINE2;
        c = "share_tournament_gold.png";
        break;
    case "2nd":
        d = stringConstants.SHARE_TOURNAMENT_2ND_TITLE;
        f = stringConstants.SHARE_TOURNAMENT_2ND_LINE1;
        a = stringConstants.SHARE_TOURNAMENT_2ND_LINE2;
        c = "share_tournament_silver.png";
        break;
    case "3rd":
        d = stringConstants.SHARE_TOURNAMENT_3RD_TITLE;
        f = stringConstants.SHARE_TOURNAMENT_3RD_LINE1;
        a = stringConstants.SHARE_TOURNAMENT_3RD_LINE2;
        c = "share_tournament_bronze.png";
        break
    }
    FB.ui({
        method: "feed",
        link: "http://apps.facebook.com/" + config.appDomain + "/?ref=tournament",
        picture: config.serverRoot + "/fb_images/" + c + "?v=" + config.feedImageVersion,
        name: d,
        caption: f.replace("%1", b),
        description: a,
        ref: "tournament"
    }, onUIDialogClose)
}
function getEmbedUrl(c, a) {
    var b = config.serverRoot.substr(0, 7) == "http://" ? "https://" + config.serverRoot.substr(7) : config.serverRoot;
    return b + "/flash_embed/AngryBirdsEmbed.swf?assetsUrl=" + b + "/flash_embed/&score=" + c + "&levelId=" + a
}
function postPhotoFeed(a) {
    pauseGame();
    FB.api("/" + a, function(b) {
        if (b && !b.error) {
            FB.ui({
                method: "feed",
                link: "http://apps.facebook.com/" + config.appDomain,
                picture: b.data.url,
            }, onUIDialogClose(b))
        } else {
            onUIDialogClose(b)
        }
    })
}
function shareURL(a) {
    pauseGame();
    FB.ui({
        method: "share",
        display: "popup",
        href: a,
    }, onUIDialogClose)
}
function flashInviteFriendsHandler(a, d, c) {
    pauseGame();
    var b = {
        method: "apprequests",
        filters: ["app_non_users"],
        title: stringConstants.INVITE_TITLE,
        message: stringConstants.INVITE_MESSAGE,
        data: "invite"
    };
    if (c) {
        b.action_type = "send";
        b.object_id = c
    }
    if (a) {
        b.to = a
    }
    if (d) {
        document.getElementById("AngryBirdsFacebook").inviteRequestReceived()
    }
    FB.ui(b, function(e) {
        onUIDialogClose(e);
        if (e !== undefined && e.request !== undefined && e.to) {
            document.getElementById("AngryBirdsFacebook").invitationBatchSent(a);
            trackEvent1Percent("INVITE", "INVITATION-SENT", null, 0)
        } else {
            document.getElementById("AngryBirdsFacebook").invitationBatchCancel()
        }
    })
}
function flashShowFirstTimeNewPayerPromotion(b) {
    pauseGame();
    var a = {
        action: "payer_promotion",
        method: "payer_promotion",
        request_id: b,
        product: "http://apps.facebook.com/" + config.appDomain + "/open_graph/object/OGVirtualCurrencyPayerPromo"
    };
    FB.ui(a, onFirstTimeNewPayerPromotion)
}
function flashSendGiftToFriends(d, b, c) {
    pauseGame();
    var a = {
        method: "apprequests",
        to: b,
        title: stringConstants.SEND_GIFTS_FRIEND_SELECTOR_TITLE,
        message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", d),
        ref: "gift"
    };
    if (c) {
        a.action_type = "send";
        a.object_id = c
    }
    FB.ui(a, onGiftSent)
}
function flashSendGiftFriend(d, a, c) {
    if (c != null) {
        pauseGame();
        var b = {
            method: "apprequests",
            to: a,
            title: stringConstants.SEND_GIFTS_SINGLE_TITLE,
            message: stringConstants.SEND_GIFTS_MESSAGE.replace("%1", d),
            ref: "gift"
        };
        if (c) {
            b.action_type = "send";
            b.object_id = c
        }
        FB.ui(b, onGiftSent)
    }
}
function flashSendChallengeFriend(e, a, b, d) {
    pauseGame();
    var c = {
        method: "apprequests",
        to: b,
        title: stringConstants.CHALLENGE_TITLE,
        message: stringConstants.CHALLENGE_MESSAGE,
        ref: "challenge"
    };
    if (d) {
        c.action_type = "send";
        c.object_id = d
    }
    FB.ui(c, function(f) {
        onUIDialogClose(f);
        if (f !== undefined && f.request !== undefined && f.to) {
            document.getElementById("AngryBirdsFacebook").challengeSentToUser(b);
            trackEvent1Percent("CHALLENGE", "CHALLENGE_TOURNAMENT", null, 0)
        } else {
            document.getElementById("AngryBirdsFacebook").challengeCancelled(b)
        }
    })
}
function onFirstTimeNewPayerPromotion() {
    onUIDialogClose();
    document.getElementById("AngryBirdsFacebook").newPayerPromotionSent(null);
    trackEvent1Percent("newpayer", "newpayer-promotion-sent", null, 0)
}
function onGiftSent(a) {
    onUIDialogClose(a);
    document.getElementById("AngryBirdsFacebook").giftsSentToUsers(a.to);
    if (a !== undefined && a.request !== undefined) {
        var b = "/giftrequestsent/" + a.request + "/" + encodeURIComponent(a.to) + "?st=" + st;
        $.get(b);
        trackEvent1Percent("GIFT", "GIFT-SENT", null, 0)
    }
}
function flashBrag(b, a, d, c, f, g) {
    pauseGame();
    document.getElementById("AngryBirdsFacebook").bragRequestReceived(b);
    var e = {
        method: "apprequests",
        to: b,
        title: stringConstants.BRAG_TITLE,
        message: stringConstants.BRAG_MESSAGE.replace("%1", c),
        ref: "brag"
    };
    if (g) {
        e.action_type = "send";
        e.object_id = g
    }
    FB.ui(e, function(h) {
        onUIDialogClose(h);
        if (h && h.to) {
            document.getElementById("AngryBirdsFacebook").bragCompleted(b);
            var i = "/bragrequestsent/" + h.request + "/" + a + "/" + d + "/" + f + "/" + encodeURIComponent(h.to) + "?st=" + st;
            $.get(i)
        } else {
            document.getElementById("AngryBirdsFacebook").bragCancelled(b)
        }
    })
}
function askForPublishStreamPermission() {
    if (permissions.publish_actions) {
        document.getElementById("AngryBirdsFacebook").permissionRequestComplete("true")
    } else {
        FB.login(function(a) {
            updatePermissions(function() {
                if (permissions.publish_actions) {
                    document.getElementById("AngryBirdsFacebook").permissionRequestComplete("true")
                } else {
                    document.getElementById("AngryBirdsFacebook").permissionRequestComplete("false")
                }
            })
        }, {
            scope: "publish_actions, user_birthday",
            auth_type: "rerequest"
        })
    }
}
function askForMissingGamePermissions() {
    //if (permissions.user_friends) {
        document.getElementById("AngryBirdsFacebook").gamePermissionRequestComplete("true")
    /*} else {
        FB.login(function(a) {
            updatePermissions(function() {
                if (permissions.user_friends) {
                    document.getElementById("AngryBirdsFacebook").gamePermissionRequestComplete("true")
                } else {
                    document.getElementById("AngryBirdsFacebook").gamePermissionRequestComplete("false")
                }
            })
        }, {
            scope: "user_friends, user_birthday",
            auth_type: "rerequest"
        })
    }*/
}
function flashDeleteRequest(a) {
    FB.api(a, "delete", function(b) {})
}
function login(a) {
    postLogin()
}
function onUIDialogClose(a) {
    resumeGame()
}
function requestAuthorization() {
    window.location.replace("/fbauth/authRequest" + window.location.search)
}
function logout() {
    window.location.replace("/logout")
}
function my_ontransact(a) {}
function updateSessionToken(a) {
    st = a
}
function reloadPage() {
    location.reload(true)
}
var ogs = [];
function loadOpenGraph() {
    ogs[openGraphConstants.MYSTERY_GIFT] = "";
    ogs[openGraphConstants.BRAG] = "";
    ogs[openGraphConstants.INVITE] = "";
    for (var a in ogs) {
        loadOpenGraphObject(a.toString())
    }
}
function loadOpenGraphObject(b) {
    var a = protocol + "//apps.facebook.com/" + config.appDomain + "/open_graph/object/" + b;
    FB.api("/", {
        id: a
    }, function(c) {
        ogs[b] = c.og_object.id
    })
}
function hasFriendListPermission() {
    updatePermissions(function() {
        if (permissions.user_friends) {
            document.getElementById("AngryBirdsFacebook").friendListPermission("true")
        } else {
            document.getElementById("AngryBirdsFacebook").friendListPermission("false")
        }
    })
}
function onStatusChange(a) {
    if (a.status === "connected") {}
}
function onAuthResponseChange(a) {/*if(a.status==="connected"){FB.Event.unsubscribe("auth.authResponseChange",onAuthResponseChange);window.top.location.href=protocol+"//apps.facebook.com/"+config.appDomain+window.location.search}*/
}
function redirectToGameCenter() {
    window.top.location.href = "https://www.facebook.com/games/angrybirds"
}
function redirectToLiveGame() {
    window.top.location.href = "https://apps.facebook.com/angrybirds"
}
function trackFBPixelEvent(a) {
    fbq("trackCustom", a, {})
}
;var _gaq = _gaq || [];
_gaq.push(["_setAccount", config.ga]);
_gaq.push(["_addIgnoredRef", "static.ak.facebook.com"]);
(function() {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a)
}
)();
var sample1Percent = Math.random();
var sample10Percent = Math.random();
function trackEvent10Percent(a, c, b, d) {
    if (sample10Percent <= 0.1) {
        trackEvent(a, c + " x 10", b, d)
    }
}
function trackEvent1Percent(a, c, b, d) {
    if (sample1Percent <= 0.01) {
        trackEvent(a, c + " x 100", b, d)
    }
}
function trackEvent(a, c, b, d) {
    if (a == null) {
        return
    }
    if (c == null) {
        c = ""
    }
    if (b == null) {
        b = ""
    }
    if (d == null) {
        _gaq.push(["_trackEvent", a, c, b])
    } else {
        _gaq.push(["_trackEvent", a, c, b, d])
    }
}
function trackPageView(a) {
    _gaq.push(["_trackPageview", a])
}
function trackTransaction(a) {
    _gaq.push(["_addTrans", a.orderId, a.shopName, a.price, a.tax, 0, a.city, a.state, a.country]);
    _gaq.push(["_addItem", a.orderId, a.sku, a.name, a.category, a.price, a.quantity]);
    _gaq.push(["_trackTrans"])
}
function trackTransactionItems(c, a) {
    _gaq.push(["_addTrans", c.orderId, c.shopName, c.price, c.tax, 0, c.city, c.state, c.country]);
    for (var b = 0; b < a.length; b++) {
        _gaq.push(["_addItem", c.orderId, a[b].sku, a[b].name, c.category, a[b].price, a[b].quantity])
    }
    _gaq.push(["_trackTrans"])
}
;FB.init({
    appId: config.appId,
    channelURL: config.channelURL,
    status: true,
    cookie: true,
    oauth: true,
    xfbml: true,
    frictionlessRequests: true,
    hideFlashCallback: false,
    version: "v2.8"
});
postLogin()
FB.Canvas.setSize();
var pausePending = false;
var gameIsPaused = false;
function onFlashLoadComplete() {
    FB.Canvas.setDoneLoading()
}
function onFbVisibilityUpdate(a) {
    if (a.state == "opened") {
        pauseGame()
    } else {
        resumeGame()
    }
}
function getURLParameter(a) {
    return decodeURI((RegExp(a + "=(.+?)(&|$)").exec(location.search) || [, null])[1])
}
function pauseGame() {
    if (pausePending || gameIsPaused) {
        return
    }
    pausePending = true;
    gameIsPaused = true;
    document.getElementById("AngryBirdsFacebook").pause();
    document.getElementById("screenshot").style.display = "none";
    document.getElementById("flashContent").style.top = "-10000px";
    document.getElementById("imageContent").style.top = "";
    document.getElementById("pauseLoading").style.display = ""
}
function flashScreenshotReadyHandler(c) {
    if (pausePending) {
        pausePending = false
    } else {
        return
    }
    var e = document.getElementById("imageContent");
    var a = document.getElementById("flashContent");
    var b = document.getElementById("screenshot");
    document.getElementById("pauseLoading").style.display = "none";
    var d = "data:image/jpeg;base64," + c;
    b.src = d.toString();
    b.style.display = ""
}
function resumeGame() {
    if (!gameIsPaused) {
        return
    }
    document.getElementById("flashContent").style.top = "";
    document.getElementById("imageContent").style.top = "-10000px";
    document.getElementById("screenshot").style.display = "none";
    document.getElementById("AngryBirdsFacebook").resume();
    pausePending = false;
    gameIsPaused = false
}
function flashRequestPauseHandler() {
    pauseGame()
}
function loadMainClient(c) {
    var d = {
        allowScriptAccess: "always",
        wmode: "direct",
        allowFullScreen: "true",
        bgcolor: "#000000"
    };
    var b = {
        id: "AngryBirdsFacebook",
        name: "AngryBirdsFacebook"
    };
    var a = {
        assetsRoot: config.assetsRoot,
        assetsUrl: encodeURIComponent(JSON.stringify(config.assetsUrl)),
        serverVersion: config.serverVersion,
        serverRoot: config.serverRoot,
        accessToken: config.accessToken,
        userId: config.userId,
        tokenExpiresIn: config.tokenExpiresIn,
        acquisitionChannel: config.acquisitionChannel,
        analyticsUrl: config.analyticsUrl,
        fb_source: getURLParameter("fb_source"),
        ref: getURLParameter("ref")
    };
    if (config.levelId) {
        a.levelId = config.levelId
    }
    c.embedSWF(config.assetsRoot + config.assetsUrl["/flash/__11fd560c-fcd9-4a6f-85cd-84cd5c947c2a.swf"], "flashHolder", "943", "572", "11.0.0", config.assetsRoot + config.assetsUrl["/flash/playerProductInstall.swf"], a, d, b);
    c.createCSS("#flashHolder", "display: block;");
    document.getElementById("imageContent").style.top = "-10000px";
    document.getElementById("imageContent").style.display = "block";
    trackEvent1Percent("flash", "embed")
}
function postLogin() {
/*    var b = getURLParameter("request_ids");
    if (b && b != "null") {
        var d = b.split("%2C");
        if (d.length == 1) {
            var c = b + "_" + config.userId;
            var a = "https://graph.facebook.com/v2.8/" + c + "?access_token=" + config.accessToken;
            $.get(a, null, "json").complete(function(e) {
                config.levelId = e.data;
                loadMainClient(swfobject);
                deleteAllRequests();
                updatePermissions();
                loadOpenGraph()
            })
        } else {
            loadMainClient(swfobject);
            deleteAllRequests();
            updatePermissions();
            loadOpenGraph()
        }
    } else {*/
        loadMainClient(swfobject);
        updatePermissions();
        loadOpenGraph()
    //}
}
function flashGetAccessToken() {
    return config.accessToken
}
function flashGetUserId() {
    return config.userId
}
;(function() {
    if (window.SWFWheel) {
        return
    }
    var c = window
      , b = document
      , d = navigator;
    var a = window.SWFWheel = function(e) {
        this.setUp(e);
        if (a.browser.msie) {
            this.bind4msie()
        } else {
            this.bind()
        }
    }
    ;
    a.prototype = {
        setUp: function(f) {
            var e = a.retrieveObject(f);
            if (e.nodeName.toLowerCase() == "embed" || a.browser.safari) {
                e = e.parentNode
            }
            this.target = e;
            this.eventType = a.browser.mozilla ? "DOMMouseScroll" : "mousewheel"
        },
        handleMouseScroll: function(e) {
            var h, g, i = 0;
            if (/XPCNativeWrapper/.test(e.toString())) {
                var f = e.target.getAttribute("id") || e.target.getAttribute("name");
                if (!f) {
                    return
                }
                h = a.retrieveObject(f)
            } else {
                h = e.target
            }
            g = h.nodeName.toLowerCase();
            if (g != "object" && g != "embed") {
                return
            }
            if (!h.checkBrowserScroll()) {
                e.preventDefault();
                e.returnValue = false
            }
            if (!h.triggerMouseEvent) {
                return
            }
            switch (true) {
            case a.browser.mozilla:
                i = -e.detail;
                break;
            case a.browser.opera:
                i = e.wheelDelta / 40;
                break;
            default:
                i = e.wheelDelta / 80;
                break
            }
            h.triggerMouseEvent(i, e.ctrlKey, e.altKey, e.shiftKey)
        },
        bind: function() {
            this.target.addEventListener(this.eventType, this.handleMouseScroll, false);
            if (!this.target.DOMMouseScroll) {
                this.target.addEventListener("wheel", this.handleMouseScroll, false)
            }
        },
        bind4msie: function() {
            var g, e, f = this.target;
            g = function() {
                var h = c.event
                  , j = 0
                  , i = h.srcElement.nodeName.toLowerCase();
                if (i != "object" && i != "embed") {
                    return
                }
                if (!f.checkBrowserScroll()) {
                    h.returnValue = false
                }
                if (!f.triggerMouseEvent) {
                    return
                }
                j = h.wheelDelta / 40;
                f.triggerMouseEvent(j, h.ctrlKey, h.altKey, h.shiftKey)
            }
            ;
            e = function() {
                if (f.detachEvent != null) {
                    f.detachEvent("onmousewheel", g)
                }
                c.detachEvent("onunload", e)
            }
            ;
            f.attachEvent("onmousewheel", g);
            c.attachEvent("onunload", e)
        }
    };
    a.browser = (function() {
        var h = d.userAgent.toLowerCase(), i = d.platform.toLowerCase(), f, j = [0, 0, 0];
        if (d.plugins && d.plugins["Shockwave Flash"]) {
            f = d.plugins["Shockwave Flash"].description.replace(/^.*\\s+(\\S+\\s+\\S+$)/, "$1");
            j[0] = parseInt(f.replace(/^(.*)\\..*$/, "$1"), 10);
            j[1] = parseInt(f.replace(/^.*\\.(.*)\\s.*$/, "$1"), 10);
            j[2] = /[a-z-A-Z]/.test(f) ? parseInt(f.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
        } else {
            if (c.ActiveXObject) {
                try {
                    var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (g) {
                        f = g.GetVariable("$version");
                        if (f) {
                            f = f.split(" ")[1].split(",");
                            j[0] = parseInt(f[0], 10);
                            j[1] = parseInt(f[1], 10);
                            j[2] = parseInt(f[2], 10)
                        }
                    }
                } catch (k) {}
            }
        }
        return {
            win: i ? /win/.test(i) : /win/.test(h),
            mac: i ? /mac/.test(i) : /mac/.test(h),
            playerVersion: j,
            version: (h.match(/.+(?:rv|it|ra|ie)[\/:\\s]([\\d.]+)/) || [0, "0"])[1],
            chrome: /chrome/.test(h),
            stainless: /stainless/.test(h),
            safari: /webkit/.test(h) && !/(chrome|stainless)/.test(h),
            opera: /opera/.test(h),
            msie: /msie/.test(h) && !/opera/.test(h),
            mozilla: /mozilla/.test(h) && !/(compatible|webkit)/.test(h)
        }
    }
    )();
    a.join = function(f) {
        var e = setInterval(function() {
            if (a.retrieveObject(f)) {
                clearInterval(e);
                new a(f)
            }
        }, 0)
    }
    ;
    a.getState = function(f) {
        var s = 2
          , o = 1
          , t = 0
          , r = a.browser
          , q = r.playerVersion;
        if (r.chrome) {
            return s
        }
        if (r.mac) {
            if (q[0] >= 10 && q[1] >= 1) {
                if (r.safari || r.stainless) {
                    return t
                } else {
                    if (r.chrome) {
                        return o
                    } else {
                        return s
                    }
                }
            } else {
                return s
            }
        }
        if (!(q[0] >= 10 && q[1] >= 1) && a.browser.safari) {
            return s
        }
        var h = a.retrieveObject(f)
          , e = h.nodeName.toLowerCase()
          , g = "";
        if (e == "object") {
            var m, j, l = h.getElementsByTagName("param"), p = l.length;
            for (var n = 0; n < p; n++) {
                j = l[n];
                if (j.parentNode != h) {
                    continue
                }
                m = j.getAttribute("name");
                g = j.getAttribute("value") || "";
                if (/wmode/i.test(m)) {
                    break
                }
            }
        } else {
            if (e == "embed") {
                g = h.getAttribute("wmode") || ""
            }
        }
        if (r.msie) {
            if (/transparent/i.test(g)) {
                return s
            } else {
                if (/opaque/i.test(g)) {
                    return o
                } else {
                    return t
                }
            }
        } else {
            if (/opaque|transparent/i.test(g)) {
                return s
            } else {
                return t
            }
        }
    }
    ;
    a.retrieveObject = function(j) {
        var h = b.getElementById(j);
        if (!h) {
            var f = b.getElementsByTagName("embed")
              , e = f.length;
            for (var g = 0; g < e; g++) {
                if (f[g].getAttribute("name") == j) {
                    h = f[g];
                    break
                }
            }
        }
        return h
    }
}
)();
var ThemeManager = function() {
    this.registeredThemes = [];
    this.currentTheme = null;
    this.running = false;
    this.updateInterval = 10000
};
ThemeManager.prototype.registerTheme = function(a) {
    if (new Date().getTime() > a.activeTo) {
        return
    }
    if (this.registeredThemes.indexOf(a) == -1) {
        this.registeredThemes.push(a)
    }
    this.startUpdating()
}
;
ThemeManager.prototype._update = function() {
    var a = new Date().getTime();
    if (this.currentTheme && a > this.currentTheme.activeTo) {
        var c = this.deactivateTheme(this.currentTheme);
        this.registeredThemes.splice(this.registeredThemes.indexOf(this.currentTheme), 1);
        this.currentTheme = null;
        if (c || this.registeredThemes.length == 0) {
            this.stopUpdating();
            return
        }
    }
    if (!this.currentTheme) {
        for (var b = 0; b < this.registeredThemes.length; b++) {
            var d = this.registeredThemes[b];
            if (a > d.activeFrom && a < d.activeTo) {
                this.activateTheme(d);
                break
            }
        }
    }
}
;
ThemeManager.prototype.activateTheme = function(c) {
    var a = this.currentTheme;
    this.currentTheme = c;
    if (a) {
        var b = this.deactivateTheme(a);
        if (b) {
            return
        }
    }
    this._initCurrentTheme()
}
;
ThemeManager.prototype._initCurrentTheme = function() {
    if (this.currentTheme.themeStyleClass) {
        if ($.browser.msie && $.browser.version < 10) {
            $('<link rel="stylesheet" type="text/css" href="' + this.currentTheme.cssFile + '"></link>').appendTo("head");
            $(".theme").addClass(this.currentTheme.themeStyleClass);
            if (this.currentTheme.onActivate) {
                this.currentTheme.onActivate(false)
            }
        } else {
            this.stopUpdating();
            var a = this;
            $.get(this.currentTheme.cssFile, function(b) {
                a.cssLoaded(b)
            })
        }
    }
}
;
ThemeManager.prototype.cssLoaded = function(a) {
    $('<style type="text/css"></style>').html(a).appendTo("head");
    $(".theme").addClass(this.currentTheme.themeStyleClass);
    if (this.currentTheme.onActivate) {
        this.currentTheme.onActivate(true)
    }
    this.startUpdating()
}
;
ThemeManager.prototype.deactivateTheme = function(b) {
    if (b.onDeactivate) {
        this.deactivatingTheme = b;
        var c = this;
        var a = b.onDeactivate(function() {
            c.themeDeactivatedCallback()
        });
        if (a) {
            this.stopUpdating();
            return true
        } else {
            this.themeDeactivatedCallback()
        }
    }
    return false
}
;
ThemeManager.prototype.themeDeactivatedCallback = function() {
    if (this.deactivatingTheme.themeStyleClass) {
        $(".theme").removeClass(this.deactivatingTheme.themeStyleClass)
    }
    this.deactivatingTheme = null;
    this.startUpdating()
}
;
ThemeManager.prototype.stopUpdating = function() {
    if (this.running) {
        clearInterval(this.interval);
        this.running = false
    }
}
;
ThemeManager.prototype.startUpdating = function() {
    if (!this.running) {
        var a = this;
        this.interval = setInterval(function() {
            a._update()
        }, this.updateInterval);
        this.running = true;
        this._update()
    }
}
;
var themeManager = new ThemeManager();
function initializeThemes() {
    try {
        themeManager.registerTheme({
            themeStyleClass: config.currentThemeName,
            cssFile: "/fb_images/themes/" + config.currentThemeName + "/" + config.currentThemeName + ".css",
            activeFrom: config.currentThemeStart,
            activeTo: config.currentThemeFinish,
            onActivate: function(b) {
                if (b) {
                    $(".theme.background." + this.themeStyleClass).css("display", "none");
                    $(".theme.background." + this.themeStyleClass).fadeIn(200)
                }
            },
            onDeactivate: function(b) {
                $(".theme.background." + this.themeStyleClass).fadeOut(200, b);
                $(".theme.background").fadeIn(200);
                return true
            }
        })
    } catch (a) {}
}
;$(document).ready(function() {
    if ($(".schedule").length <= 5) {
        $("#scheduleGroup").css("padding", "25px 10px 10px 20px");
        $("#scheduleGroup").css("margin-top", "21px");
        $("#scheduleGroup").css("width", "290px");
        $("#scheduleGroup").css("margin-left", "170px");
        $("#scheduleGroup").css("background", "url(/fb_images/schedulePop_small.png) no-repeat");
        $("#scheduleContainer").css("-webkit-columns", "1 180px");
        $("#scheduleContainer").css("-moz-columns", "1 180px");
        $("#scheduleContainer").css("columns", "1 180px")
    }
    var l = 0;
    var h = $("#tournamentDetail div").first().attr("id");
    var f = $(".schedule").first().attr("id");
    var e = $(".schedule");
    $(".detailContent").first().removeClass("detailContent");
    if ("${actionBean.upcomingTournamentsInfo}" === "[]") {
        $("#scheduleButton").css("display", "none")
    }
    $("#" + f).addClass("active");
    for (var d = 0; d < e.length; d++) {
        e[d].addEventListener("click", j)
    }
    function j(m) {
        $("#" + f).removeClass("active");
        $("#" + h).css("display", "none");
        var i = this.id
          , n = i.replace("header", "content");
        h = n;
        f = i;
        $("#" + i).addClass("active");
        $("#" + n).fadeIn("fast")
    }
    function g(i) {
        FB.Canvas.getPageInfo(function(m) {
            $({
                y: m.scrollTop
            }).animate({
                y: i
            }, {
                duration: 250,
                step: function(n) {
                    FB.Canvas.scrollTo(0, n)
                }
            })
        })
    }
    var c = 240;
    $("#scheduleButton").click(function() {
        if (l === 1) {
            g(0);
            $("#scheduleButton").css("-webkit-filter", "");
            $("#scheduleButton").css("-moz-filter", "");
            $("#scheduleButton").css("-o-filter", "");
            $("#scheduleButton").css("filter", "");
            $("#tournament").animate({
                height: "0px",
                opacity: "0"
            }, "slow");
            setTimeout(function() {
                $("#tournament").css("display", "none")
            }, 400);
            l = 0
        } else {
            g(240);
            $("#tournament").animate({
                height: "205px",
                opacity: "1"
            }, "slow");
            $("#tournament").css("display", "inline-block");
            l = 1
        }
    });
    var a = config.adsAssetsRoot;
    var b = '<iframe id="bottomExtraContentAds" src="' + a + '/bottom.html" scrolling="no" frameborder="0" border="0"></iframe>';
    function k() {
        $(b).insertAfter("#bottomExtraContent")
    }
    k()
});
