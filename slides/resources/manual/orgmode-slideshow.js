// // Create the Script Object
// var script = document.createElement('script');
// script.src = '../assets/js/jquery-1.7.1.min.js';
// script.type = 'text/javascript';
// script.defer = true;
// script.id = 'scriptID'; // This will help us in referencing the object later for removal
// // Insert the created object to the html head element
// var head = document.getElementsByTagName('head').item(0);
// head.appendChild(script);

////////////// Padilicious start
// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT
// Courtesy of PADILICIOUS.COM and MACOSXAUTOMATION.COM

// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger

var triggerElementID = null; // this variable is used to identity the triggering element
var fingerCount = 0;
var startX = 0;
var startY = 0;
var curX = 0;
var curY = 0;
var deltaX = 0;
var deltaY = 0;
var horzDiff = 0;
var vertDiff = 0;
var minLength = 72; // the shortest distance the user may swipe
var swipeLength = 0;
var swipeAngle = null;
var swipeDirection = null;

// The 4 Touch Event Handlers

// NOTE: the touchStart handler should also receive the ID of the triggering element
// make sure its ID is passed in the event call placed in the element declaration, like:
// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">

function touchStart(event,passedName) {
    // disable the standard ability to select the touched object
    event.preventDefault();
    // get the total number of fingers touching the screen
    fingerCount = event.touches.length;
    // since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
    // check that only one finger was used
    if ( fingerCount == 1 ) {
	// get the coordinates of the touch
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
	// store the triggering element ID
	triggerElementID = passedName;
    } else {
	// more than one finger touched so cancel
	touchCancel(event);
    }
}

function touchMove(event) {
    event.preventDefault();
    if ( event.touches.length == 1 ) {
	curX = event.touches[0].pageX;
	curY = event.touches[0].pageY;
    } else {
	touchCancel(event);
    }
}

function touchEnd(event) {
    event.preventDefault();
    // check to see if more than one finger was used and that there is an ending coordinate
    if ( fingerCount == 1 && curX != 0 ) {
	// use the Distance Formula to determine the length of the swipe
	swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
	// if the user swiped more than the minimum length, perform the appropriate action
	if ( swipeLength >= minLength ) {
	    caluculateAngle();
	    determineSwipeDirection();
	    processingRoutine();
	    touchCancel(event); // reset the variables
	} else {
	    touchCancel(event);
	}	
    } else {
	touchCancel(event);
    }
}

function touchCancel(event) {
    // reset the variables back to default values
    fingerCount = 0;
    startX = 0;
    startY = 0;
    curX = 0;
    curY = 0;
    deltaX = 0;
    deltaY = 0;
    horzDiff = 0;
    vertDiff = 0;
    swipeLength = 0;
    swipeAngle = null;
    swipeDirection = null;
    triggerElementID = null;
}

function caluculateAngle() {
    var X = startX-curX;
    var Y = curY-startY;
    var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
    var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
    swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
    if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
}

function determineSwipeDirection() {
    if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
	swipeDirection = 'left';
    } else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
	swipeDirection = 'left';
    } else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
	swipeDirection = 'right';
    } else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
	swipeDirection = 'down';
    } else {
	swipeDirection = 'up';
    }
}

function processingRoutine() {
    var swipedElement = document.getElementById(triggerElementID);
    if ( swipeDirection == 'left' ) {
	// REPLACE WITH YOUR ROUTINES
	chgSlide(1);
	imgresize();
    } else if ( swipeDirection == 'right' ) {
	// REPLACE WITH YOUR ROUTINES
	chgSlide(-1);
	imgresize();
    } else if ( swipeDirection == 'up' ) {
	// REPLACE WITH YOUR ROUTINES
	chgSlide(1);
	imgresize();
    } else if ( swipeDirection == 'down' ) {
	// REPLACE WITH YOUR ROUTINES
	chgSlide(-1);
	imgresize();
    }
    

}
 
////////////// Padilicious end


function chgSlide(direction) {
    var currentSlide=getthisSlide();
    var slideCt = $(".slide,.slide current").length-1;

    thisSlide = currentSlide + direction;
    if (thisSlide > slideCt) {
	thisSlide = slideCt;
    }
    if (thisSlide < 0) {
	thisSlide = 0;
    }
    $(".current").removeClass("current");
    $(".slide,.slide current").each(function(index){
	if (index==thisSlide){ $(this).addClass("current");}
    });

    imgresize();
    return thisSlide;
}
function addinfo(){
    var metas = document.getElementsByTagName('META');
    var i;
    var title;
    var description;
    var date;
    var author;
    for (i = 0; i < metas.length; i++)
    {
	if (metas[i].getAttribute('NAME') == "title"){
	    title=metas[i].getAttribute('CONTENT');    }
	if (metas[i].getAttribute('NAME') == "description"){
	    description=metas[i].getAttribute('CONTENT');    }
	if (metas[i].getAttribute('NAME') == "generated"){
	    date=metas[i].getAttribute('CONTENT');    }
	if (metas[i].getAttribute('NAME') == "author"){
	    author=metas[i].getAttribute('CONTENT');    }
    }

    var _body = document.getElementsByTagName('body') [0];
    var _preamble = document.getElementById('preamble');
    var _div = document.createElement('div');
    _div.className="info";
    var _divtitle =document.createElement('div');
    _divtitle.className="info-text";
    var _text = document.createTextNode(title);
    _divtitle.appendChild(_text);

    var _divdesc =document.createElement('div');
    _divdesc.className="info-text";
    var _text = document.createTextNode(description);
    _divdesc.appendChild(_text);

    var _divauth =document.createElement('div');
    _divauth.className="info-text";
    var _text = document.createTextNode(author+' '+date);
    _divauth.appendChild(_text);

    _div.appendChild(_divtitle);
    _div.appendChild(_divdesc);
    _div.appendChild(_divauth);
    _body.appendChild(_div);
    
    _tdiv=_div.cloneNode(true);
    
    _preamble.appendChild(_tdiv);
}
function addmeta(){
    var meta;
    if (document.createElement &&
	(meta = document.createElement('meta'))) {
	// set properties
	meta.name = "apple-mobile-web-app-capable";
	meta.content = "yes";
	document.getElementsByTagName('head').item(0).appendChild(meta);
}
}

function padiliciousaddeventhandler(){
        var _body = document.getElementsByTagName('body') [0];
    var _div = document.createElement('div');
    _div.id='swipeBox';
    _div.setAttribute('ontouchcancel','touchCancel(event);');
    _div.setAttribute('ontouchmove','touchMove(event);');
    _div.setAttribute('ontouchend','touchEnd(event);');
    _div.setAttribute('ontouchstart','touchStart(event,\'swipeBox\');');
 _body.appendChild(_div);
   
}

function handleEvent(oEvent){
    chgSlide(1);
    
}

function addslideclass(){
    $("#postamble").addClass("slide"); 
    $("#preamble").addClass("slide");
    $("#table-of-contents").addClass("slide");
    $(".outline-2").addClass("slide");
    $(".outline-2").removeClass("outline-2");
}

function addheaderclass(){
    var elems = document.getElementsByTagName("*"); // yes, wildcards do exist
    for (var i=0;i<elems.length;i++) {
	var myRegExp = /sec/;
	var matchPos1 = elems[i].id.search(myRegExp);


	if (matchPos1 == 0 ) { // you probably don't want to hide *all* elements
	    elems[i].className="header";

	}
    }
    
} 

function getthisSlide(){
    var count=0;
    $(".slide,.slide current").each(function(index){
	if ($(this).hasClass("slide current") ) {
	    count=index;}    });
     return count;
}

function mykeys(){
    document.onkeydown = keyHit;

    function keyHit(evt) {
	var ltArrow = 37;
	var rtArrow = 39;
	var thisKey = (evt) ? evt.which : window.event.keyCode;
	// forward:
	// K-key: 75
	// right arrow: 39
	// down arrow: 40
	// pagedown: 34
	// spacebar: 32
	
	// Backwards:
	// J-key: 74
	// left arrow: 37
	// UP arrow: 38
	// pageup: 33
	// backspace: 8

	// HOME:36
	// A-key: 65 

	// END:35
	// E-key: 69
	if (thisKey in {74:'',37:'', 38:'', 33:'', 8:''}) {
            thisSlide=chgSlide(-1);
	imgresize();
	    return false;
	}
	else if (thisKey in {75:'', 39:'', 40:'', 34:'', 32:''} ) {
            thisSlide=chgSlide(1);
	imgresize();
	    return false;
	}else if (thisKey in {65:'', 36:''}){
	    thisSlide=chgSlide(-1000);
	imgresize();
	    return false;

	}else if (thisKey in {69:'', 35:''}){
	    thisSlide=chgSlide(1000);
	imgresize();
	    return false;
	}}}

function imgresize(){
    var count=$(".figure:visible").length;
    if ($(".outline-text-2:visible p:first").text()){
	    count++;
	}
    $(".figure:visible").each(function(index){

	var browserwidth = $(window).width();
	var browserheight = $(window).height();
	var figwidth = $(this).width();
	var figheight = $(this).height();
	var figratio=figwidth/figheight;

	if (count){
	    $(this).css("right",(index)*(100/count)+"%")
	    $(this).css("width",100/count+"%");
	}

	$(this).find("img").each(function(){
	    var imgwidth=$(this).width();
	    var imgheight=$(this).height();
	    var imgratio=imgwidth/imgheight;

	    if (figratio >= imgratio) {
		$(this).css("height",(figheight-60));
		$(this).css("width",(figheight-60)*imgratio);

	    }else{
		$(this).css("width",(figwidth-60));
		$(this).css("height",(figwidth-60)/imgratio);
	    }
	    // document.getElementById('swipeBox').innerHTML = 
	    // 	'browser width: '+browserwidth + '<br>' +
	    // 	'browser height: '+browserheight + '<br>' +
	    // 	'figure width: '+ figwidth + '<br>' +
	    // 	'figure height: '+ figheight + '<br>' +
	    // 	'image width: '+ imgwidth + '<br>'+
	    // 	'image height: '+ imgheight + '<br>'+
	    // 	$(".outline-text-2:visible p:first").text();
	
	}) })
	}

// fire it UP !
function main(){
  var thisSlide=0;  
    addinfo();
    addslideclass();
    addheaderclass();
    addmeta();
    padiliciousaddeventhandler();
    var mySlides= mySlides=$(".slide,.slide current");
    mySlides[0].className="slide current";
 
  mykeys();
 

}

$(document).ready(function(){main();});
$(window).bind("resize", function() {imgresize();})

