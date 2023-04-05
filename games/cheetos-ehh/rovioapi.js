window.rovio = new function() {
	var handlers, iframeElement, origin, receiveMessage;
	handlers = {};
	this.addEventListener = function(type, handler) {
		handlers[type] = handler;
	};
	receiveMessage = function(event) {
		if (event.origin !== origin) {
			return;
		}
		var data = JSON.parse(event.data);
		if (handlers[data.type] !== undefined) {
			handlers[data.type](data);
		}
	};
	this.init = function(iframeId, newOrigin) {
		iframeElement = document.getElementById(iframeId);
		if (newOrigin === undefined) {
			origin = (/^https?:\/\/[^\/]*/.exec(iframeElement.src))[0];
		} else {
			origin = newOrigin;
		}
		if (!window.addEventListener) {
			window.attachEvent("onmessage", receiveMessage);
		} else {
			window.addEventListener("message", receiveMessage, false);
		}
	};
	this.sendMessage = function(message) {
		iframeElement.contentWindow
				.postMessage(JSON.stringify(message), origin);
	};
	this.initFrame = function(newOrigin) {
		origin = (/^https?:\/\/[^\/]*/.exec(newOrigin))[0];
		if (!window.addEventListener) {
			window.attachEvent("onmessage", receiveMessage);
		} else {
			window.addEventListener("message", receiveMessage, false);
		}
	};
	this.sendMessageParent = function(message) {
		parent.postMessage(JSON.stringify(message), origin);
	};
};
