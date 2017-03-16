var list, left, right, container;
//记得ready中的最后一个函数不要有逗号
$(document).ready( 
	initialize(),
	autoRun(),
	arrowOn(),
	oTimer = setInterval(startSlideToLeft, 4000),
	showContent(),
	QRcode()
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

function showContent(){
	window.onscroll = function(){
		var scrollTop = window.pageYOffset
		  || document.documentElement.scrollTop
		  || document.body.scrollTop;
		// var person = document.getElementsByClassName("content1-1");
		var person1_1 = $(".content1-1");
		var person1_2 = $(".content1-2");
		var person1_1Height = person1_1.offset().top;
		
		if(scrollTop > person1_1Height && scrollTop < 1500){
			// person[0].style.display = "block";
			person1_1[0].style.visibility = "visible";
			// lockLeft();
			$(person1_1[0]).addClass("style1");
			if(a == 0){
				lockLeft2();
				a++;
			}
			console.log(a)
		}
		else if(scrollTop > 1432 && scrollTop < 1700){
			content2style();
		}
		else if(scrollTop > 2238 && scrollTop < 2400){
			content3style();
		}
		else{
			// person1_1[0].style.visibility = "hidden";
			// lockRight();
		}
	}
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
	$content2_1.fadeIn(5000);
	$content2_2.fadeIn(5000);
}

function content3style(){
	var $content3_1 = $(".content3-1");
	var $content3_2 = $(".content3-2");
	$content3_1.slideDown("slow");
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















