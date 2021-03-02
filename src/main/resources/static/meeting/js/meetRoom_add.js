layui.use(["form","table","laydate"],function(){
	getGoodsList();
	getDeviceCombox();
	if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
		getOneInfo(getUrlParam("id"));
	}
	var form=layui.form;
	var table=layui.table;
	var laydate=layui.laydate;
	//点击物品添加按钮图片
	$('#addImgButton').click(function(){
		layer.open({
			type: 1,
			area:["500px","200px"],
			title:"添加物品",
			content: $('#addGoodsDiv'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
			btn:["确定","取消"],
			btnAlign:'c',
			yes:function(index){
				$.ajax({
			    	url:meetUrl+"meet/room/addRoomGoods",
			    	type:"POST",
			    	data:{"goodsName":$("#goodsName").val()},
			    	success:function(res){
			    		layer.msg(res.msg,{time:2000});
			    	},
				})
				$("#goodsName").val("");
				layer.close(index);
			}
		});
	});
	//监听提交按钮    
	form.on('submit(formBtn)', function(data){
		var obj=data.field;
		var useableGoods = "";
		var checks=$("input[name='goodsName']:checked");
		for(var i=0;i<checks.length;i++){
			console.log($(checks[i]).val());
			if(useableGoods == ""){
				useableGoods = $(checks[i]).val();
			}else{
				useableGoods = useableGoods + "," + $(checks[i]).val();
			}
		}
		obj.useableGoods=useableGoods;
		obj.fid=$("#fid").val();
    	$.ajax({
	    	url:meetUrl+"meet/room/addMeetRoom",
	    	type:"POST",
	    	data:obj,
	    	success:function(res){
	    		parent.layer.closeAll();
	    		parent.initTable();
	    	}
	    })
	});
	
	//监听取消按钮    
	form.on('submit(formCancelBtn)', function(data){
		parent.layer.closeAll();
	});
})

//获取物品列表
function getGoodsList(){
	$.ajax({
    	url:meetUrl+"meet/room/getRoomGoods",
    	type:"POST",
    	async:false,
    	success:function(res){
    		console.log(res);
    		layer.msg(res.msg,{time:2000});
    		/*<input type="checkbox" name="category" value="今日话题" title="今日话题" lay-skin="primary"/>*/
    		var data = res.data;
    		var html = "";
    		for(var i = 0;i<data.length;i++){
    			var tmpl = '<input type="checkbox" name="goodsName" value="'+data[i].ID+'" title="'+data[i].Name+'" lay-skin="primary"/>';
    			if(html == ""){
    				html = tmpl;
    			}else{
    				html = html+"\n"+tmpl;
    			}
    		}
    		$("#addImgButton").before(html);
    		layui.use("form",function(){
    			var form=layui.form;
    			form.render();
    		})
    	},
	})
}

//获取设备下拉框
function getDeviceCombox(){
	$.ajax({
		url:meetUrl+"meet/room/getDeviceCombox",
		type:"POST",
		async:false,
		success:function(res){
			console.log(res);
			$("#signinPlace option").not("option:first").remove();
			if(res.result){
				for(var item of res.data){
					var $opt=$("<option value="+item.DeviceNo+">"+item.DeviceName+"</option>");
					$("#signinPlace").append($opt);
				}
				layui.use("form",function(){
					var form=layui.form;
					form.render();
				})
			}
			
			$("#signBackPlace option").not("option:first").remove();
			if(res.result){
				for(var item of res.data){
					var $opt=$("<option value="+item.DeviceNo+">"+item.DeviceName+"</option>");
					$("#signBackPlace").append($opt);
				}
				layui.use("form",function(){
					var form=layui.form;
					form.render();
				})
			}
		}
	})
}
//获取一条数据
function getOneInfo(fid){
	$.ajax({
    	url:meetUrl+"meet/room/getOneRoom",
    	type:"POST",
		async:false,
    	data:{"fid":fid},
    	success:function(res){
    		console.log(res);
    		var data = res.data;
    		$("#fid").val(data.fid);
    		$("#roomName").val(data.roomName);
    		$("#roomPlace").val(data.roomPlace);
    		$("#roomSize").val(data.roomSize);
    		$("#signinPlace").val(data.signinPlace);
    		$("#signBackPlace").val(data.signBackPlace);
    		$("#remark").val(data.remark);
    		//物品赋值
    		var goodsID = data.useableGoods.split(",");
    		console.log(goodsID)
    		for(var i=0;i<goodsID.length;i++){
    			$("#things input[value="+goodsID[i]+"]").attr("checked",true);
    		}
    		layui.use("form",function(){
    			var form=layui.form;
    			form.render();
    		})
    	}
    })
}

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
