var list, left, right, container;
//记得ready中的最后一个函数不要有逗号
$(document).ready( 
	initialize(),
	autoRun(),
	arrowOn(),
	oTimer = setInterval(startSlideToLeft, 4000),
	showContent(),
	QRcode(),
	goTop(),
	reset()
	// 测试锚点高度
	// console.log($("#contentHeader1").offset().top, 111111),
	// console.log($("#contentHeader2").offset().top, 222222),
	// console.log($("#contentHeader3").offset().top, 333333)
);

//全局变量

function initialize() {
	list = document.getElementById("list");
	left = document.getElementById("left");
	right = document.getElementById("right");
	container = document.getElementById("container");
}

var timer;
var slideLock = false;
var picWidth = 1280;

//全局变量end

//防止重复点击左右箭头时出现加速bug

function startSlideToLeft(){
	if(!slideLock){
		slideLock = true;
		toLeft();
	}
}

function startSlideToRight() {
	if(!slideLock){
		slideLock = true;
		toRight();
	}
}
//防止重复点击左右箭头时出现加速bug end

function autoRun(){
	// var time = 300;
	// var interval = 10;
	// var speed = 1280/(time/interval);

	right.onclick = function(){
		// list.style.left = parseInt(list.style.left) - 1280 + "px";
		// if(list.style.left == -3840 + "px"){
		// 	list.style.left = 0 + "px";
		// }
		startSlideToLeft();
	}

	left.onclick = function(){
		// list.style.left = parseInt(list.style.left) + 1280 + "px";
		// if(list.style.left == 1280 + "px"){
		// 	list.style.left = -2560 + "px";
		// }
		startSlideToRight();
	}
}

function toLeft(){
	list.style.left = parseInt(list.style.left) - 20 + "px";
	timer = setTimeout(toLeft, 25);

	if(list.style.left == 0 + "px"){
		clearTimeout(timer);
		list.style.left = -(picWidth*3) + "px";
		slideLock = false;
	}
	if(list.style.left == -picWidth + "px"){
		clearTimeout(timer);
		slideLock = false;
	}
	else if(list.style.left == -(picWidth*2) + "px"){
		clearTimeout(timer);
		slideLock = false;
	}
	else if(list.style.left == -(picWidth*3) + "px"){
		clearTimeout(timer);
		slideLock = false;
		// list.style.left = 0 + "px";
	}
	else if(list.style.left == -(picWidth*4) + "px"){
		clearTimeout(timer);
		list.style.left = -picWidth + "px";
		slideLock = false;
	}
}

function toRight(){
	list.style.left = parseInt(list.style.left) + 20 + "px";
	timer = setTimeout(toRight, 25);
	if(list.style.left == 0 + "px"){
		clearTimeout(timer);
		list.style.left = -(picWidth*3) + "px";
		slideLock = false;
	}
	else if(list.style.left == -picWidth + "px"){
		clearTimeout(timer);
		slideLock = false;
	}
	else if(list.style.left == -(picWidth*2) + "px"){
		clearTimeout(timer);
		slideLock = false;
	}
	else if(list.style.left == -(picWidth*3) + "px"){
		clearTimeout(timer);
		slideLock = false;
	}
}

function arrowOn(){
	container.onmouseover = function(){
		left.style.display = "block";
		right.style.display = "block";
	}
	container.onmouseout = function(){
		left.style.display = "none";
		right.style.display = "none";
	}
}

var scrollLock1 = false;
var scrollLock2 = false;
var scrollLock3 = false;

function showContent(){
	window.onscroll = function(){
		var scrollTop = window.pageYOffset
		  || document.documentElement.scrollTop
		  || document.body.scrollTop;

		// var person = document.getElementsByClassName("content1-1");
		var person1_1 = $(".content1-1");
		var person1_2 = $(".content1-2");
		// var person1_1Height = person1_1.offset().top - 400;
		console.log(scrollTop);
		
		if(scrollTop > 600 && scrollTop < 1500 && scrollLock1 == false){
			// person[0].style.display = "block";
			person1_1[0].style.visibility = "visible";
			// lockLeft();
			$(person1_1[0]).addClass("style1");
			if(a == 0){
				lockLeft2();
				a++;
			}
			scrollLock1 = true;
		}
		else if(scrollTop > 1900 && scrollTop < 2500 && scrollLock2 == false){
			content2style();
			scrollLock2 = true;
		}
		else if(scrollTop > 2600 && scrollTop < 3200 && scrollLock3 == false){
			content3style();
			scrollLock3 = true;
		}
		else if (scrollTop < 20) {
			reset();
		}
		else{
			// person1_1[0].style.visibility = "hidden";
			// lockRight();
		}
	}
}

function reset(){
	a = 0;
	scrollLock1 = false;
	scrollLock2 = false;
	scrollLock3 = false;
	$(".content1-1").css("visibility", "hidden");
	$(".content1-2").css("left", 640); 
	$(".content2-1").fadeOut(500);
	$(".content2-2").fadeOut(500);
	$(".content3-1").slideUp("fast");
}

//这是一个锁住content1-2内容的运行锁，确保每次只能走一个方向
//谨记aLock的位置应该放在动作完成后，可以认为是清理时钟的后面
var aLock = false;
var a = 0;
function lockRight(){
	if(!aLock){
		aLock = true;
		contentMoveLeft(".content1-2 h2");
		contentMoveLeft(".content1-2 p");
	}
}

function lockLeft(){
	if(!aLock){
		aLock = true;
		contentMoveRight(".content1-2 h2");
		contentMoveRight(".content1-2 p");	
	}
}

function lockLeft2(){
	if (!aLock){
		aLock = true;
		contentMoveLeft2();
	}
}
//=====================================

function QRcode(){
	document.getElementById("weixin").onmouseover = function(){
		var QRcode = document.getElementsByClassName("QRcode");
		QRcode[0].style.display = "block";
	}
	document.getElementById("weixin").onmouseout = function(){
		var QRcode = document.getElementsByClassName("QRcode");
		QRcode[0].style.display = "none";
	}

}

function contentMoveRight(key){ //key就是需要控制的内容元素
	// var $content = $(".content1-2 h2");
	var $content = $(key);
	var styleTimer;
	var distance = $content.offset().left;
	styleTimer = setInterval(move, 30);
	$content.addClass("style2");
	function move(){
		distance = distance + 4;
		$content.css("left", distance);
		if(distance > 50){
			clearInterval(styleTimer);
			aLock = false;
		}
	}
}

function contentMoveLeft(key){ //key就是需要控制的内容元素
	// var $content = $(".content1-2 h2");
	var $content = $(key);
	var styleTimer;
	var distance = $content.offset().left;
	styleTimer = setInterval(move, 30);
	$content.addClass("style2");
	function move(){
		distance = distance - 4;
		$content.css("left", distance);
		if(distance < 100){
			clearInterval(styleTimer);
			aLock = false;
		}
	}
}

function contentMoveLeft2(){
	var $content = $(".content1-2 p");
	var styleTimer;
	var distance = $content.offset().left;
	styleTimer = setInterval(move, 10);
	// $content.addClass("style2");
	function move(){
		distance = distance - 10;
		$content.css("left", distance);
		if(distance < 0){
			clearInterval(styleTimer);
			aLock = false;
		}
	}
}

function content2style(){
	var $content2_1 = $(".content2-1");
	var $content2_2 = $(".content2-2");
	$content2_1.fadeIn(1000);
	$content2_2.fadeIn(1000);
}

function content3style(){
	var $content3_1 = $(".content3-1");
	var $content3_2 = $(".content3-2");
	$content3_1.slideDown("slow");
}

function goTop(){
	$(".goTop").click(function(){
		$("html, body").animate({scrollTop: "0px"}, 800)
	});
}

// function mouseOut(){
// 	var list = document.getElementById("list");
// 	var left = document.getElementById("left");
// 	var right = document.getElementById("right");
// 	list.onmouseout = function(){
// 		left.style.display = "none";
// 		right.style.display = "none";
// 		left.style.zIndex = -2;
// 		right.style.zIndex = -2;
// 		console.log("22222") 
// 	}
// }

// function stopInterval(){
// 	var container = document.getElementById("container");
// 	container.onmouseover = function(){
// 		clearInterval(oTimer);
// 		console.log(0000000000)
// 	}
// }

// function startInterval(){
// 	var container = document.getElementById("container");
// 	container.onmouseout = function(){
// 		setInterval(startSlideToLeft, 5000);
// 	}
// }















