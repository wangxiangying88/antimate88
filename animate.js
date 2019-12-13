var box = document.getElementById('box');
var zi=document.getElementById('zi');
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var nav = document.getElementById('nav').children;
var timer;
var isMoving = false;
var count = 1;
timer = setInterval(next,3000);



window.onload = gundong;//页面载入时字体滚动

//字体滚动
function gundong(){
	var timer=setInterval(function(){
		var now = parseInt(getStyle(zi,'right'));
		if(now==1000){
			now=-120;
		}
		zi.style.right=now+4+"px";
		
	},100);
}


//鼠标划入
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,3000);
}

//左右键绑定
left.onclick = last;
right.onclick =next;

//轮播
//下一张
function next(){
	if(isMoving){
		return;
	}
	isMoving=true;
	count++;
	navchange();
	animate(slider,{left:-1200*count},function(){
		if(count===6){
			slider.style.left="-1200px";
			count=1;
		}
		isMoving=false;
	});
}
//上一张
function last(){
	if(isMoving){
		return;
	}
	isMoving=true;
	count--;
	navchange();
	animate(slider,{left:-1200*count},function(){
		if(count===0){
			slider.style.left="-6000px";
			count=5;
		}
		isMoving=false;
	});
}

//小按钮绑定
for(var i = 0;i<nav.length;i++){
	nav[i].idx=i;
	nav[i].onclick=function(){
		count = this.idx+1;
		navchange();
		animate(slider,{left:-1200*count})
	}
}
//小按钮背景色切换
function navchange(){
	for (var i = 0; i < nav.length; i++) {
		nav[i].className='';
	}
	if(count>5){
		oNavlist[0].className = 'active';
	}else if(count<=0){
		nav[4].className='active';
	}else{
		nav[count-1].className='active';
	}
	
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

function animate(obj,json,callback){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;

			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
					
			if(json[attr] !== cur){
				isStop = false;
			}
		}

		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}

	}, 30)

}