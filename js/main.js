var plugin = {
	_audioNode		: $('.u-audio'),						// 声音模块
	_audio			: null,									// 声音对象
	_audio_val		: true,									// 声音是否开启控制

	audio_init : function(){
 	// media资源的加载
		var options_audio = {
			loop: true,
            preload: "auto",
            src: plugin._audioNode.attr('data-src')
		}
		
        plugin._audio = new Audio(); 

        for(var key in options_audio){
            if(options_audio.hasOwnProperty(key) && (key in plugin._audio)){
                plugin._audio[key] = options_audio[key];
            }
        }
        plugin._audio.load();
 	},

 	// 声音事件绑定
 	audio_addEvent : function(){
 		if(plugin._audioNode.length<=0) return;

 		// 声音按钮点击事件
 		var txt = plugin._audioNode.find('.txt_audio'),
 			time_txt = null;
 		plugin._audioNode.find('.btn_audio').on('click',plugin.audio_contorl);

 		// 声音打开事件
 		$(plugin._audio).on('play',function(){
 			plugin._audio_val = false;
 			audio_txt(txt,true,time_txt);
 		})

 		// 声音关闭事件
 		$(plugin._audio).on('pause',function(){
 			audio_txt(txt,false,time_txt)
 		})

 		function audio_txt(txt,val,time_txt){
 			if(val) txt.text('打开');
 			else txt.text('关闭');

 			if(time_txt) clearTimeout(time_txt);

 			txt.removeClass('z-move z-hide');
 			time_txt = setTimeout(function(){
 				txt.addClass('z-move').addClass('z-hide');
 			},1000)
 		}
 	},

 	// 声音控制函数
 	audio_contorl : function(){
 		if(!plugin._audio_val){
 			plugin.audio_stop();
 		}else{
 			plugin.audio_play();
 		}
 	},	

 	// 声音播放
 	audio_play : function(){
 		plugin._audio_val = false;
 		if(plugin._audio) {
	 		plugin._audio.play();
	 		$('.music-icon').addClass('a-spin');
 		}
 	},

 	// 声音停止
 	audio_stop	: function(){
 		plugin._audio_val = true;
 		if(plugin._audio) {
 			plugin._audio.pause(); 
 			$('.music-icon').removeClass('a-spin');
 		}
 	},

 	//处理声音和动画的切换
	media_control : function(){
		if(!plugin._audio) return;
		if($('video').length<=0) return;

		$(plugin._audio).on('play', function(){
			$('video').each(function(){
				if(!this.paused){
					this.pause();
				}
			});	
		});
	},

	bg_init : function(){
		var self = $('.p1bg'),srcImg = self.attr('data-src');
		$('<img />').on('load',function(){
			self.css({
				//'background-image'	: 'url('+srcImg+')'
                'background' :'#FFCCCC'
			})
		}).attr("src",srcImg);
		setTimeout(function(){
			$('<img />').on('load',function(){
				$('.p4bg').css({
                    'background' :'#FFCCCC'
                    //'background-image'	: 'url(images/P4-bg-2.jpg)'
				})
			}).attr("src",'images/P4-bg-2.jpg');
			setTimeout(function(){
				$('<img />').on('load',function(){
					$('.p9bg').css({
                        'background' :'#FFCCCC'
                        //'background-image'	: 'url(images/P9-bg.jpg)'
					})
				}).attr("src",'images/P9-bg.jpg');
				setTimeout(function(){
					$('<img />').on('load',function(){
						$('.p10bg').css({
                            'background' :'#FFCCCC'
                            //'background-image'	: 'url(images/P10-bg.jpg)'
						})
					}).attr("src",'images/P10-bg.jpg');
					setTimeout(function(){
						$('<img />').on('load',function(){
							$('.p11bg').css({
                                'background' :'#FFCCCC'
                                //'background-image'	: 'url(images/P11-bg.jpg)'
							})
						}).attr("src",'images/P11-bg.jpg');
					},1000);
				},1000);
			},1000);
		},1000);
	},

	ring_bar : function(obj){
			var canvasId = obj.id;//canvas的ID
			var ringRadius = obj.ringRadius;//圆的半径
			var ringWidth = obj.ringWidth;//环宽
			var downRingColor = obj.downRingColor;//下环颜色
			var upRingColor = obj.upRingColor;//上环颜色
			var textColor = obj.textColor;//字体颜色
			var textSize = obj.textSize;//字体大小
			var rpValue = obj.rpValue;//人品

			var canvas = document.getElementById(canvasId);//获取canvas
			var ctx = canvas.getContext("2d");
			var W = canvas.width;
			var H = canvas.height;
			var deg=0,new_deg=0,dif=0;
			var loop,re_loop;
			var text,text_w;
			function init(){
				ctx.clearRect(0,0,W,H);
				ctx.beginPath();
				ctx.strokeStyle=downRingColor?downRingColor:"#333";//下环颜色
				ctx.lineWidth=ringWidth?ringWidth:30;//下环宽
				ctx.arc(W/2,H/2,ringRadius?ringRadius:100,0,Math.PI*2,false);//100为圆的半径
				ctx.stroke();
				
				var r = deg*Math.PI/180;
				ctx.beginPath();
				ctx.strokeStyle = upRingColor?upRingColor:"lightgreen";//上环颜色
				ctx.lineWidth=ringWidth?ringWidth:30;//上环宽
				ctx.arc(W/2,H/2,ringRadius?ringRadius:100,0-90*Math.PI/180,r-90*Math.PI/180,false);//100为圆的半径
				ctx.stroke();
				
				ctx.fillStyle=textColor?textColor:"#f00";//字体颜色
				ctx.font=textSize?textSize:50+"px abc";//字体大小
				text = Math.round(deg/360*100)+"分";
				text_w = ctx.measureText(text).width;
				ctx.fillText(text,W/2 - text_w/2,H/2+15);
			}
			function draw(){
				var rp = rpValue?rpValue:0.5;//人品值
				new_deg = Math.round(rp*360);
				dif = new_deg-deg;
				loop = setInterval(to,1000/dif);

			}
			function to(){
				if(deg == new_deg){
					clearInterval(loop);
					if(obj.rpValue >= 0.8){
						$('.p3f2-2').addClass('a-bouncein');
					}else{
						$('.p3f2-1').addClass('a-bouncein');
					}
				}
				if(deg<new_deg){
					deg++;
				}else{
					deg--;
				}
				init();
			}
			draw();
			$('.p3f1').addClass('a-fadeinB2');
			//re_loop = setInterval(draw,2000);
	},

	// media管理初始化
	init : function(){
		$(window).on('load',function(){
			$('.swiper-main').height(document.documentElement.clientHeight);
			var mySwiper1 = new Swiper('.swiper-main',{
				mode: 'vertical',
				loop: true,
				noSwiping: false,
				grabCursor: true,
				// autoplay: 5000,
				onSlideChangeEnd: function(swiper){
					$(".animation").hide();
					var _self = $($('.main-swiper')[swiper.activeIndex]);
					if($(_self).hasClass('endpage') || $(_self).hasClass('swiper-no-swiping')){
						$('.arrow-up').hide();
					}else{
						$('.arrow-up').show();
					}
					$(_self).find('.animation').each(function(){
			 			var curAnimationName = $(this).attr('animationType');
			 			$(this).addClass(curAnimationName).show();
		 			});
		 			if($(_self).hasClass('slide-3') && !$(_self).hasClass('drawed')){
			 			var rp = Math.floor(65+Math.random()*(89-65))/100;
			 			var obj = new Object();
			 			obj.id = "canvas";
			 			obj.radius = "100";
			 			obj.rpValue = rp;
			 			obj.ringWidth = "15";
			 			obj.upRingColor = "#359591";
			 			obj.downRingColor = "#fff";
			 			obj.textColor = "#359591";
			 			obj.ringRadius = "150";
			 			plugin.ring_bar(obj);
			 			$(_self).addClass('drawed');
			 			var rs = setTimeout(function(){
			 				
			 				clearTimeout(rs);
			 			},2000)
		 			}
		 			if($(_self).hasClass('p9bg')){
						if(window.DeviceMotionEvent) {
							var speed = 15;//定义一个数值 
							var x = y = z = lastX = lastY = lastZ = 0;//重置所有数值 
							window.addEventListener('devicemotion', function(){ 
								var acceleration =event.accelerationIncludingGravity;//将传感值赋给acceleration 
								x = acceleration.x; 
								y = acceleration.y; 
								z = acceleration.z; 
								if(!$(_self).hasClass('yaoqz') && swiper.activeIndex <10){
									if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed ) { 
										$(_self).addClass('yaoqz');
										$('.qqgif img').attr('src','images/qq.gif');
										$('.qqgif').css('opacity','1');
										$('.p9f2').parent().remove();
										var qiuq=document.getElementById("qiuq");
							  			qiuq.play(); 
							  			var qianw = Math.floor(1+Math.random()*(8));
							  			$('.qianw').attr('class','qianw qian'+qianw);
										setTimeout(function(){
											plugin.audio_play();
											$('.rm-btn').text('解　　签').addClass('jieq');
											$(_self).removeClass('yaoqz');
										},2700);
									}
								}
								lastX = x; 
								lastY = y; 
								lastZ = z; 
							}, false); 
						} 
					}

				},
				onFirstInit: function (swiper) {
					setTimeout(function(){
						$('.sloading').hide();
						setTimeout(function(){
							$('.busmain').addClass('a-moveinXL');
							setTimeout(function(){
								$('.p1f1').addClass('a-fadein11');
							},4000);
						},100);
					},500);
					plugin.audio_play();
				}
			});
			var mySwiper2 = new Swiper('.swiper-children-1',{
			    pagination: '.pagination-children-1',
			    loop:true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction: false,
			    paginationClickable: true
			});
			var mySwiper3 = new Swiper('.swiper-children-2',{
			    pagination: '.pagination-children-2',
			    loop:true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction: false,
			    paginationClickable: true
			});
			var mySwiper4 = new Swiper('.swiper-children-3',{
			    pagination: '.pagination-children-3',
			    loop:true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction: false,
			    paginationClickable: true
			});
			var mySwiper5 = new Swiper('.swiper-children-4',{
			    pagination: '.pagination-children-4',
			    loop:true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction: false,
			    paginationClickable: true
			});
			var mySwiper6 = new Swiper('.swiper-children-5',{
			    pagination: '.pagination-children-5',
			    loop:true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction: false,
			    paginationClickable: true
			});
	        setTimeout(function() {  
	            window.scrollTo(0, 1)  
	        }, 0); 
	        $('.rm-btn').click(function(event) {
	        	if($(this).hasClass('jieq')){
		        	mySwiper1.swipeNext();
		        	$(this).text('摇晃手机再求一签').removeClass('jieq');
	        	}
	        });
	        var check;
        	var cr = false;
		    $('.printloc').on('touchstart mousedown',function(e){
		    	e.preventDefault();
		    	var st = new Date().getTime();
		    	check = setInterval(function(){
		    		var nt = new Date().getTime();
		    		if(nt - st > 600){
		    			cr = true;
		    			clearInterval(check);
		    			$('.err-remind').text('扫描成功！').css('opacity','1');
		    			$('.line').remove();
		    			$('.slide-2').removeClass('swiper-no-swiping');
		    			$('.arrow-up').show();
		    			$('.slide-2').find('div').each(function(){
				 			$(this).removeClass('animation opacity0');
			 			});
		    			setTimeout(function(){mySwiper1.swipeNext();},500);
		    		}
		    	},200);
		    });
		    $('.printloc').on('touchend mouseup',function(e){
		 		e.preventDefault();
		 		clearInterval(check);
		 		if(!cr){
		 			$('.err-remind').addClass('a-shake');
		 			setTimeout(function(){
		 				$('.err-remind').removeClass('a-shake');
		 			},2500);
		 		}
		 	});
			$('.video-btn').click(function(event) {
					$('.video-btn').hide();
					$('.video-mask').addClass('a-bouncein').show();
					$('.video-div').append("<iframe height=400 width=640 src=\"http://player.youku.com/embed/XODU5NjgyMTc2\" frameborder=0 allowfullscreen></iframe>");
					$(this).parent().addClass('swiper-no-swiping');
					$('.arrow-up').hide();
					$('.u-audio').hide();
					plugin.audio_stop();
			});
			$(".closeBtn").bind("click",function(){
				$(".video-mask").removeClass('a-bouncein').hide();
				$('.video-btn').show();
				$('.video-div').html('');
				$(this).parent().parent().removeClass('swiper-no-swiping');
				$('.arrow-up').show();
				$('.u-audio').show();
				plugin.audio_play();
			});
			
		});
		//封面初始化
		plugin.bg_init();

		// 声音初始化
		//plugin.audio_init();

		// 绑定音乐加载事件
		//plugin.audio_addEvent();

		// 音频切换
		//plugin.media_control();

	}
}
plugin.init();
function showShare(){
	if($("#div-invite").css("display") == "none"){
		$("#div-invite").show();
	}else{
		$("#div-invite").hide();
	}
}
