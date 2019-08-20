//const $ = window.$;
//const GV = window.GV;
class TimeWidget extends GV.Widget{
	reference() {
		this.html = "./ShiXu.html";
		this.css = "./css/ShiXu.css";
	}
	setSXYX(v) { 
				//alert('timewidget set sxyx')
			this.tw.postMessage('sxyx',v); 
	}
	init() {
	  	this.registerName = 'GeoVIS::BasePlugin::TimeWidget';
		this.tw = this.earth.getMapWidget('TimeWidget').open();
		alert('timewidget')
		
		$(".SXCloseBtn").click(function(){
			$(this).parents(".ShiXuWrap").hide()
		})
		$(".ShiXuWrap").hover(function(){
			$(".SXTime").css("background","rgba(57,57,57,1)")
			$(this).find(".SXBtnList").css("visibility","initial")
			$(this).css({"background":"black","border":"1px solid #0d748e"})
			$(".SXDet").css("color","white")
			$(".SXStart").css("color","rgb(244,244,244)")
			$(".SXEnd").css("color","rgb(244,244,244)")
		},function(){
			$(".SXTime").css("background","rgba(57,57,57,0.3)")
			$(this).find(".SXBtnList").css("visibility","hidden")
			$(this).css({"background":"transparent","border":"none"})
			$(".SXDet").css("color","black")
			$(".SXStart").css("color","black")
			$(".SXEnd").css("color","black")
		})
		$(".SXBar").mousedown(function(e){
			var eve = window.event || e;
			var L = event.clientX - this.offsetLeft;
			var this_ = this;
			$(document).mousemove(function(e){
				var eve = window.event || e;
				var This_L = event.clientX - L;
				if (This_L < 0) {
					This_L = 0
				} else if(This_L > 350){
					This_L = 350
				}
				$(this_).css("left",This_L)
				$(".SXDet").html(getCurrenCursorTime())
				console.log(getCurrenCursorTime())
				this.tw.setSXYX("2006;10;10;10;10;10")
			})
		})
		$(document).mouseup(function(){
			$(this).unbind("mousemove");
		})
		$(".SXPre").click(function(){
			var obj = judgeCondition();
			console.log("SXPre")
		})
		$(".SXNext").click(function(){
			console.log("jia")
		})
		//缩小 
		$(".SXReduceBtn").click(() => {
			var obj = judgeCondition();
			if (obj.strLen == 4 && obj.tiL == 10) {
				$(".SXStart").html(1970)
				$(".SXEnd").html(2017)
			}else if ( obj.strLen > 4 && obj.strLen<8){
				$(".SXStart").html(obj.ActiveYear)
				$(".SXEnd").html(obj.ActiveYear+10)
			}else if(obj.strLen >= 8){
				$(".SXStart").html(obj.ActiveYear+"/"+1)
				$(".SXEnd").html(obj.ActiveYear+"/"+12)
			}
			$(".SXDet").html(getCurrenCursorTime())
			
			this.tw.setSXYX("2006;10;10;10;10;10")
//			this.tw.postMessage('sxyx',"2017;01;30;10;10;10"); 
		})
		//放大 
		$(".SXScaleBtn").click(()=>{
			var obj = judgeCondition();
			if(obj.strLen == 4 && obj.tiL > 10){
				$(".SXStart").html(obj.ActiveYear)
				$(".SXEnd").html(obj.ActiveYear+10)
			}else if ( obj.strLen == 4 && obj.tiL == 10 ){
				$(".SXStart").html(obj.ActiveYear+"/"+1)
				$(".SXEnd").html(obj.ActiveYear+"/"+12)
			}else if(obj.strLen <= 8){
				$(".SXStart").html(obj.ActiveYear+"/"+ 1+obj.ActiveMonth+"/"+1)
				$(".SXEnd").html(obj.ActiveYear+"/"+1+obj.ActiveMonth+"/"+getCMDays(getCurrenCursorTime()))
			}
			$(".SXDet").html(getCurrenCursorTime())
			this.tw.setSXYX("2006;10;10;10;10;10")
		})
		//获取 判断条件 及参数
		function judgeCondition(){
			var ActiveDay = getCurrenCursorTime().getDay();
			var ActiveMonth = getCurrenCursorTime().getMonth();
			var ActiveYear = getCurrenCursorTime().getFullYear();
			var startYear = $(".SXStart").html().split("/")[0];
			var startMonth = $(".SXStart").html().split("/")[1];
			var startDay = $(".SXStart").html().split("/")[2];
			var endYear = $(".SXEnd").html().split("/")[0];
			var endMonth = $(".SXEnd").html().split("/")[1];
			var endDay = $(".SXEnd").html().split("/")[2];
			var tiL = endYear-startYear;
			var strLen = $(".SXStart").html().length;
			
			var obj = {
				"tiL":tiL,
				"strLen":strLen,
				"startYear":startYear,
				"startMonth":startMonth,
				"startDay":startDay,
				"endYear":endYear,
				"endMonth":endMonth,
				"endDay":endDay,
				"ActiveYear":ActiveYear,
				"ActiveMonth":ActiveMonth,
				"ActiveDay":ActiveDay
			}
			return obj;
		}
		//获取 当前月份天数
		function getCMDays(date){
			var year = date.getFullYear();
			var mouth = date.getMonth() + 1;
			var days ;
			if(mouth == 2){
		        days= year % 4 == 0 ? 29 : 28;
		    }else if(mouth == 1||mouth == 3||mouth == 5||mouth == 7||mouth == 8||mouth == 10||mouth == 12){
		        days= 31;
		    }else{
		        days= 30;
		    }
			return days;
		}
		//获取光标当前所在时间
		function getCurrenCursorTime(){
			var startTime = new Date();
			var startYear = $(".SXStart").html().split("/")[0];
			var startMonth = $(".SXStart").html().split("/")[1];
			var startDay = $(".SXStart").html().split("/")[2];
			if (startYear && !startMonth && !startDay) {
				startTime.setFullYear(startYear)
			} else if(startYear && startMonth && !startDay){
				startTime.setFullYear(startYear)
				startTime.setMonth(startMonth-1)
			}else if(startYear && startMonth && startDay){
				startTime.setFullYear(startYear)
				startTime.setMonth(startMonth-1)
				startTime.setDate(startDay)
			}
			var endTime = new Date();
			var endYear = $(".SXEnd").html().split("/")[0];
			var endMonth = $(".SXEnd").html().split("/")[1];
			var endDay = $(".SXEnd").html().split("/")[2];
			if (endYear && !endMonth && !endDay) {
				endTime.setFullYear(endYear)
			} else if(endYear && endMonth && !endDay){
				endTime.setFullYear(endYear)
				endTime.setMonth(endMonth-1)
			}else if(endYear && endMonth && endDay){
				endTime.setFullYear(endYear)
				endTime.setMonth(endMonth-1)
				endTime.setDate(endDay)
			}
			var currentTime = new Date();
			var per = parseInt($(".SXBar").css("left"))/350;
			
			currentTime.setTime((endTime.getTime()-startTime.getTime())*per+startTime.getTime());
			return	currentTime
		}
	}
}