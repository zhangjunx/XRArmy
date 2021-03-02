$(function(){
	initArea();
	initImgLink();
//	new Promise(function(resolve){
//		layui.use('tree', function(){
//			var tree = layui.tree;
//			//渲染
//			var inst1 = tree.render({
//				elem: '#monitroBox',
//				data: arrList2,
//				onlyIconControl:true,
//				showLine:false,
//				click: function(obj){
//					
//				}
//			});
//			resolve();
//		});
//	}).then(function(){
//		for(var item of arrList3){
//			if(item.monitor == "1"){//监控点添加摄像头的图标
//				var $img=$("<img src='../img/camera.png' style='width:16px;margin-right:5px'>");
//				$("#monitroBox div[data-id="+item.id+"]").find(".layui-tree-txt").prepend($img);
//			}
//		}
//		initCamera();
//	})
	
	new Promise(function(resolve){
		getCameraData();
		resolve();
	}).then(function (){
		initCamera();;
	})
	
})
var startLeft = 0; //定义位置初始变量
var startTop = 0;
var clickFlag = null;//是否点击标识（定时器编号）
//点击摄像头,调监控
$(document).on("click",".secondEle",function(e){
	if (e.clientX !== startLeft || e.clientY !== startTop) {
		startLeft = 0, //位置发生变化为拖拽
		startTop = 0;
		return;
	}
	if(clickFlag) {//取消上次延时未执行的方法
	    clickFlag = clearTimeout(clickFlag);
	  }else{
		  clickFlag = setTimeout(function() {
			    // click 事件的处理
				  var cameraIndexCode=$(this).attr("data-code");
					layer.open({
						type:2,
						content:"prevewVideo.html",
						area:["90%","92%"],
						move:false,
						success:function(layero){
							setTimeout(function(){
								layero.find('iframe')[0].contentWindow.startPreview("93157868");
							},1000);
						}
					})
			  }, 300);//延时300毫秒执行
	  }
})


//点击图片链接切换图片
$(document).on("click",".secondLink",function(e){
	if (e.clientX !== startLeft || e.clientY !== startTop) {
			startLeft = 0, //位置发生变化为拖拽
			startTop = 0;
			return;
	}
	var src=$(this).attr("data-src");
	$(".cellDt").attr("data-src",src);
	//弹出选择框
   	$(".hover").css("position","absolute");
   	$(".hover").css("top",e.clientY+10+"px");
   	$(".hover").css("left",e.clientX-20+"px");
	if ($(".hover").is(':hidden')) {
		$(".hover").show();
	} else {
		$(".hover").hide();
    }
	//清空所有的图片链接和摄像头，回显图片链接和摄像头
})
//点击跳转
$(".jump").click(function(){
	$(".hover").hide();
	var src=$(this).attr("data-src");
	if(src != undefined && src != null && src != ""){
		$("#imgBox").attr("src",src);
	}
})
//点击上传图片
$(".imgup").click(function(){
	$(".hover").hide();
	//弹出上传图片框
	layer.open({
		type:1,
		content:$("#uploadBox"),
		area:["50%","50%"],
			btn:["确定","取消"],
			btnAlign:"c",
			yes:function(index){
				layer.close(idnex);
			}
	})
})
//点击删除
$(".delete").click(function(){
	$(".hover").hide();
	layer.confirm("确定删除?",function(index){
		layer.close(index);
	})
})

//初始化图片链接
function initImgLink(){
	$(".imgLink").Tdrag({
		cbStart:function(e,obj){
			 startLeft = e.clientX;    //记录初始位置
			 startTop = e.clientY;
			console.log("鼠标按下");
			console.log(obj);
			if($(obj).hasClass("secondLink") == false){
				var item=$(obj).clone();
				$(obj).addClass("secondLink")
				$(obj).parent().append(item);
				//initImgLink();
			}
		},
		cbMove:function(){
			console.log("鼠标移动");
		},
		cbEnd:function(e,obj){
			console.log("鼠标松开");
			// console.log(e);
			// console.log(e.srcElement)
			var currentX=e.clientX;
			var currentY=e.clientY;
			//console.log($("#imgBox").offset().left);
			var left=$("#imgBox").offset().left;
			var top=$("#imgBox").offset().top;
			var height=$("#imgBox").height();
			var xh=height + top;
			if(currentX < left || currentY < top || currentY > xh){
				if($(e.target).hasClass("layui-tree-entry")){
					$(e.target).find(".secondEle").remove();
				}else{
					if($(e.target).hasClass("secondEle")){
						$(e.target).remove();
					}
				}
			}
		}
	});
}
//初始化摄像头
function initCamera(){
	$(".camera").Tdrag({
		cbStart:function(e,obj){
			// console.log("鼠标按下");
			// console.log(e);
			 startLeft = e.clientX;    //记录初始位置
			 startTop = e.clientY;
			if($(obj).hasClass("secondEle") == false){
				var item=$(obj).clone();
				$(obj).addClass("secondEle")
				$(obj).parent().prepend(item);
				//initCamera();
			}
		},
		cbMove:function(){
			console.log("鼠标移动");
		},
		cbEnd:function(e,obj){
			console.log("鼠标松开");
			 //console.log(e);
			// console.log(e.srcElement)
			var currentX=e.clientX;
			var currentY=e.clientY;
			var left=$("#imgBox").offset().left;
			var top=$("#imgBox").offset().top;
			var height=$("#imgBox").height();
			var xh=height + top;
			if(currentX < left || currentY < top || currentY > xh){
				if($(e.target).hasClass("layui-tree-entry")){
					$(e.target).find(".secondEle").remove();
				}else{
					if($(e.target).hasClass("secondEle")){
						$(e.target).remove();
					}
				}
			}else{
				if (e.clientX !== startLeft || e.clientY !== startTop) {
					startLeft = 0, 
					startTop = 0;
					//位置发生变化为拖拽
					$(e.target).prev().remove();
					$(e.target).next().remove();
					$(e.target).parent().css("margin","0");
					var eleImgY=currentY - top;//按钮相对于图片的坐标
					var eleImgX=currentX - left;//按钮相对于图片的坐标
					var coordinate=currentX+","+currentY;
					var item=$(e.target).clone();
					$(e.target).remove();
					$(item).css({
						"left":eleImgX+"px",
						"top":eleImgY+"px"
					}).addClass("thirstEle")
					$(".imgArea").append(item);
					var deviceKey=$(e.target).attr("data-code");
					saveLocal(eleImgX,eleImgY,deviceKey,coordinate);
				}
				
			}
		}
	});
}
//拖拽摄像头松开的时候，保存位置
function saveLocal(eleImgX,eleImgY,deviceKey,coordinate){
	var imgID=$("#imgBox").attr("data-fid");
	var areaCode=$("#imgBox").attr("data-code");
	var obj={"imgID":imgID,"areaCode":areaCode,"top":eleImgY,"fleft":eleImgX,"coordinate":coordinate,"deviceKey":deviceKey,"thisUserID":window.top.loginid};
	console.log(obj)
	$.ajax({
		url:mapUrl+"camera/deviceBtn/addInfo",
		type:"POST",
		data:obj,
		async:false,
		success:function(res){
			console.log(res);
			layer.msg(res.msg,{time:2000});
			if(res.result){
				clearCamera();
				initLocal();//获取摄像头位置
			}
		}
	})
}

//数据回显之后的初始化
function initCameraEdit(){
	$(".thirstEle").Tdrag({
		cbStart:function(e,obj){
			// console.log("鼠标按下");
			// console.log(e);
			 startLeft = e.clientX;    //记录初始位置
			 startTop = e.clientY;
//			if($(obj).hasClass("secondEle") == false){
//				var item=$(obj).clone();
//				$(obj).addClass("secondEle")
//				$(obj).parent().prepend(item);
//				//initCamera();
//			}
		},
		cbMove:function(){
			console.log("鼠标移动");
		},
		cbEnd:function(e,obj){
			console.log("鼠标松开");
			 //console.log(e);
			// console.log(e.srcElement)
			var currentX=e.clientX;
			var currentY=e.clientY;
			var left=$("#imgBox").offset().left;
			var top=$("#imgBox").offset().top;
			var height=$("#imgBox").height();
			var xh=height + top;
			if(currentX < left || currentY < top || currentY > xh){
				if($(e.target).hasClass("layui-tree-entry")){
					$(e.target).find(".secondEle").remove();
				}else{
					if($(e.target).hasClass("secondEle")){
						$(e.target).remove();
					}
				}
			}else{
				if (e.clientX !== startLeft || e.clientY !== startTop) {//位置发生变化为拖拽
					startLeft = 0, 
					startTop = 0;
					var eleImgY=currentY - top;//按钮相对于图片的坐标
					var eleImgX=currentX - left;//按钮相对于图片的坐标
					var coordinate=currentX+","+currentY;
					var item=$(e.target).clone();
//					$(e.target).remove();
//					$(item).css({
//						"left":eleImgX+"px",
//						"top":eleImgY+"px"
//					})
//					$(".imgArea").append(item);
					var deviceKey=$(e.target).attr("data-code");
					var fid=$(e.target).attr("data-fid");
					editLocal(eleImgX,eleImgY,deviceKey,coordinate,fid);
				}
				
			}
		}
	});
}
//拖拽摄像头松开的时候，保存位置
function editLocal(eleImgX,eleImgY,deviceKey,coordinate,fid){
	var imgID=$("#imgBox").attr("data-fid");
	var areaCode=$("#imgBox").attr("data-code");
	var obj={"fid":fid,"imgID":imgID,"areaCode":areaCode,"top":eleImgY,"fleft":eleImgX,"coordinate":coordinate,"deviceKey":deviceKey,"thisUserID":window.top.loginid};
	$.ajax({
		url:mapUrl+"camera/deviceBtn/editInfo",
		type:"POST",
		data:obj,
		async:false,
		success:function(res){
			layer.msg(res.msg,{time:2000});
		}
	})
}

//双击删除摄像头
$(document).on("dblclick",".thirstEle",function(){
	if(clickFlag) {//取消上次延时未执行的方法
	    clickFlag = clearTimeout(clickFlag);
	  }
	var fid=$(this).attr("data-fid");
	var obj={"thisUserID":window.top.loginid,"fid":fid};
	var that=this;
	layer.confirm("确定删除?",function(index){
		layer.close(index);
		$.ajax({
			url:mapUrl+"camera/deviceBtn/delInfo",
			type:"POST",
			data:obj,
			success:function(res){
				console.log(res);
				layer.msg(res.msg,{time:2000});
				if(res.result){
					$(that).remove();
				}
			}
		})
	})
})


//清空图上的摄像头
function clearCamera(){
	$(".secondEle").remove();
}


//摄像头回显
function initLocal(){
	var imgID=$("#imgBox").attr("data-fid");
	var obj={"imgID":imgID};
	$.ajax({
		url:mapUrl+"camera/deviceBtn/getList",
		type:"POST",
		data:obj,
		async:false,
		success:function(res){
			console.log(res);
			if(res.result){
				for(var item of res.data){
					var $img=$("<img src='../img/camera.png' class='secondEle thirstEle' data-fid="+item.fid+" data-code="+item.deviceKey+" style='position:absolute;left:"+item.fleft+"px;top:"+item.top+"px'>")
					$(".imgArea").append($img);
				}
				initCameraEdit();
			}
		}
	})
}

//获取摄像头数据
function getCameraData(){
	var arr=["南门","北门","东门","西门","操场","餐厅","枪械库","篮球场"];
	for(var i=0;i<arr.length;i++){
		var $li=$("<li data-code='cameraIndexCode'><img src='../img/camera.png' data-code='cameraIndexCode' class='camera' title='"+arr[i]+"'><p>"+arr[i]+"</p></li>");
		$("#cameraBox").append($li);
	}
}
//初始化区域
function initArea(){
	$.ajax({
		url:mapUrl+'camera/area/getList',
		type:"POST",
		success:function(res){
			console.log(res);
			if(res.result){
				var arr=res.data;
				layui.use('tree', function(){
					var tree = layui.tree;
					//渲染
					var inst1 = tree.render({
						elem: '#monitroBox',
						data: arr,
						onlyIconControl:true,
						showLine:false,
						click: function(obj){
							console.log(obj);
							$(".layui-tree-txt").css("color","#555");
					    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
					    	clearCamera();
							getImg(obj.data.id);//获取图片
							initLocal();//获取摄像头位置
						}
					});
				});
			}else{
				layer.msg(res.msg,{time:2000});
			}
		}
	})
}
//根据区域id查询图片
function getImg(id){
	$.ajax({
		url:mapUrl+"camera/area/getInfo",
		type:"POST",
		data:{"code":id},
		async:false,
		success:function(res){
			console.log(res)
			if(res.result){
				 $("#imgBox").attr("src",mapUrl+res.data.imgList[0].imgPath).attr("data-original",mapUrl+res.data.imgList[0].imgPath).attr("data-fid",res.data.imgList[0].fid).attr("data-code",res.data.imgList[0].areaCode);
				 var image = new Viewer(document.getElementById('imgBox'),{
					 url: 'data-original',
					 title:false,
					 toolbar:false,
					 button:false,
				});
			}
		}
	})
}
