

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>最高分</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
  
<!-- common css styles -->
<link rel="stylesheet" type="text/css" href="../css/common.min.css" />                    
<!-- common, winners, tracking files compressed -->
<script type="text/javascript" src="../js/common.min.js"></script>            
<script type="text/javascript" src="../js/ga.min.js"></script>
<script type="text/javascript" src="../js/winners.min.js"></script>            
<script type="text/javascript" src="../js/jquery-1.7.min.js"> </script>        
<script src="../js/jquery.ui.core.min.js"> </script>
<script src="../js/jquery.ui.widget.min.js"> </script>
<script src="../js/jquery.ui.tabs.min.js"> </script>
<script type="text/javascript" src="../ext/menu/fg.menu.js"></script>

<link type="text/css" href="../ext/menu/fg.menu.css" media="screen" rel="stylesheet" />
<link rel="stylesheet" href="../themes/blitzer/jquery.ui.all.css" />

<style>
#tabs a {
	cursor: pointer;  	
	cursor: hand;
}

.ui-state-active a, .ui-state-active a:visited {
	color:#fff;
} 

.fg-menu-container {
	padding: 0;
	background: #DE1C1C;
	width: 150px;
}
#weekly-winners .ui-widget {
	background: #DE1C1C;
	border: 1px solid #DE1C1C;
	font-family: Arial;
}

#tabs .ui-widget {
	background:#fff;
}
body,html {
	background: #fff;
	overflow-x:hidden;
	-ms-overflow-x: hidden;	
	font-family: Arial;
}
#tabs .ui-state-default {
	background: url(../images/button_web_highscore_off.png);
	width: 177px;
	height: 40px;
	display:block;
	border: 0;
}

#tabs .ui-tabs-selected, #tabs .ui-tabs-active {
	background: url(../images/button_web_highscore_selected.png);
	width: 177px;
	height: 40px;
	display:block;
	border: 0;
}
#tabs .ui-state-hover {
	background: url(../images/button_web_highscore_hover.png);
	width: 177px;
	height: 40px;
	display:block;
}
#tabs .ui-tabs-selected:hover {
	background: url(../images/button_web_highscore_selected.png);
	width: 177px;
	height: 40px;
	display:block;
	border: 0;
	color:#de1c1c;
}
.ui-tabs .ui-tabs-nav {
	margin: 0;
	padding: .2em .2em 0;
	margin-top: 12px;
}
.ui-widget { font-family: Arial,sans-serif; font-size: 1.1em; text-align: center;}
.ui-tabs-vertical { width: 46em; }
.ui-tabs-vertical .ui-tabs-nav { padding: .2em .1em .2em .2em; float: left; width: 10em; }
.ui-tabs-vertical .ui-tabs-nav li { clear: left; width: 100%; margin: 0 -1px .2em 0; }
.ui-tabs-vertical .ui-tabs-nav li a { display:block; }

.ui-tabs-vertical .ui-tabs-nav li {
	margin:0;
}
.ui-tabs-vertical .ui-tabs-nav li.ui-tabs-selected { margin-bottom: 0px;padding-bottom: 0;margin-top:0px;width:184px;padding-bottom: 0px;}
.ui-tabs-vertical .ui-tabs-panel { padding: 1em; float: right; width: 29em;}
.ui-tabs .ui-tabs-nav li a {float: left;padding: .5em 56px;text-decoration: none;padding-left: 20px;padding-left: 108px;}
.ui-tabs .ui-tabs-panel {
	padding: 0;
}


.ui-tabs-vertical .ui-tabs-panel {
	margin-left: -4px;
	padding: 0;
	float: left;
	width: 630px;
	min-height: 500px;
	border: 4px solid #de1c1c;	
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	-khtml-border-radius: 6px;
	border-radius: 6px;
}


.ui-tabs-vertical {
	width: 830px;	
}

.ui-widget-header {	
	border: none;
	background: #fff;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active { 
	border-left: 1px solid #eee;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
	border-right: none;
	color: #fff;
}

</style>
<!-- styles for this example page only -->
	<style type="text/css">
	
	#menuLog { font-size:1.4em; margin:20px; }
	.hidden { position:absolute; top:0; left:-9999px; width:1px; height:1px; overflow:hidden; }

	.fg-button { clear:left; margin:0 4px 40px 20px; padding: .4em 1em; text-decoration:none !important; cursor:pointer; position: relative; text-align: center; zoom: 1; }
	.fg-button .ui-icon { position: absolute; top: 50%; margin-top: -8px; left: 50%; margin-left: -8px; }
	a.fg-button { float:left;  }
	button.fg-button { width:auto; overflow:visible; } /* removes extra button width in IE */

	.fg-button-icon-left { padding-left: 2.1em; }
	.fg-button-icon-right { padding-right: 2.1em; }
	.fg-button-icon-left .ui-icon { right: auto; left: .2em; margin-left: 0; }
	.fg-button-icon-right .ui-icon { left: auto; right: .2em; margin-left: 0; color:#fff;}
	.fg-button-icon-solo { display:block; width:8px; text-indent: -9999px; }	 /* solo icon buttons must have block properties for the text-indent to work */

	.fg-button.ui-state-loading .ui-icon { background: url(../images/spinner_bar.gif) no-repeat 0 0; }
	</style>

	<!-- style exceptions for IE 6 -->
	<!--[if IE 6]>
	<style type="text/css">
		.fg-menu-ipod .fg-menu li { width: 95%; }
		.fg-menu-ipod .ui-widget-content { border:0; }
	</style>
	<![endif]-->
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="../css/common_ie.css" />   
<![endif]-->

<!--[if IE 8]>
<link rel="stylesheet" type="text/css" href="../css/common_ie8.css" />   
<![endif]-->

<!--[if IE 7]>
<link rel="stylesheet" type="text/css" href="../css/common_ie7.css" />   
<![endif]-->

</head>
<body>
 <script type="text/javascript">
 	var currentTab = 0;
	var currentCompetition = 1;
	var serviceurl = '../winners';
    $(function(){
    	// BUTTONS
    	$('.fg-button').hover(
    		function(){ $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
    		function(){ $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
    	);

    	// MENUS
		$('#flat').menu({
			content: $('#flat').next().html(), 
			showSpeed: 400
		});
		
    	//loading image
		$('#loading-div').hide().ajaxStart(function(){
		    $(this).show();
		}).ajaxStop(function() {
		    $(this).hide();
		});
		
		//get the competitions
		var levels= $.parseJSON('[{"level" : "中国节拍"}, {"level" : "1"}, {"level" : "2"}, {"level" : "3"}, {"level" : "4"}, {"level" : "5"}, {"level" : "6"}, {"level" : "7"}, {"level" : "8"}, {"level" : "9"},{"level" : "10"}]');
		createCompetitions(levels, 7);
		if (isFF()) {
			$('.ui-tabs-vertical .ui-tabs-panel').css('marginLeft','-5px');
		}
    });
    
    </script>
    
<!-- WRAPPER -->
<div id="page">	
	<div id="winnerBanner"> </div>
    <!-- SELECT WEEK -->
    <div id="weekly-winners" >    
   		<a tabindex="0" href="#search-engines" class="fg-button fg-button-icon-right ui-widget ui-state-default ui-corner-all" id="flat"><span class="ui-icon ui-icon-triangle-1-s"></span>每周高分榜</a>
		<div id="weeks" class="hidden">
		<ul>
		
				<li>
				<a href="#" onclick="changeCompetition(1);" >第一周</a></li>	
			
				<li>
				<a href="#" onclick="changeCompetition(2);" >第二周</a></li>	
			
				<li>
				<a href="#" onclick="changeCompetition(3);" >第三周</a></li>	
			
				<li>
				<a href="#" onclick="changeCompetition(4);" >第四周</a></li>	
			
				<li>
				<a href="#" onclick="changeCompetition(5);" >第五周</a></li>	
			
				<li>
				<a href="#" onclick="changeCompetition(6);" >第六周</a></li>	
			
			
			
		</ul>
		</div>	
    </div>
    <div class="clear"> </div>
    <!-- TABS -->
    <div id="tabs" class="left">
    	<div id="loading-div"><img src="../images/ajax-loader.gif" border="0"/></div>
    </div>

</div>	

</body>
</html>