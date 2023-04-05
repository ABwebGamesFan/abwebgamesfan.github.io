
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23082676-6']);	
  _gaq.push(['_setSampleRate', '100']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

		
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