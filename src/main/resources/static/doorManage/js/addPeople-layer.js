$(function(){
	getTree();//获取左侧单位
})
layui.use('layer',function(){
	var layer=layui.layer;
})
//点击取消
$("#resetData").click(function(){
	parent.layer.closeAll();
})
//点击确定提交
$("#sure").click(function(){
	if($("#personShow li.curr").length == 0){
		layer.msg("请选择人员!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$("#personShow li.curr").length;i++){
		var holderno=$("#personShow li.curr").eq(i).attr("data-holderno");
		/*arr.push({
			"holderno":holderno,
			"groupid":getUrlParam("groupid")
		})*/
		arr.push(holderno);
	}
	console.log(arr);
	$.ajax({
	     url:url+'/AccessGroupHolder/add',
	     type:"POST",
	     data:{"str":JSON.stringify(arr),"type":"aa","groupid":getUrlParam("groupid"),"loginid":window.top.loginid},
		 success:function(data){
			 console.log(data)
			 if(data.flag){
				 layer.msg(data.reason,{time:1000},function(){
					 var id=getUrlParam("groupid");
					 parent.getPersonByPer(id);
					 parent.layer.closeAll();
				 });
			 }else{
				 layer.msg(data.reason,{time:2000});
			 }
		 }
	})
})

//点击左侧全选
$(document).on("click","#selectAll-left",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$("#person-left li").removeClass("curr");
	}else {
		$(this).addClass("curr");
		$("#person-left li").addClass("curr");
	 }
})
//点击左侧人员
$(document).on("click","#person-left li",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else {
		$(this).addClass("curr");
	 }
	if($("#person-left li").length == $("#person-left li.curr").length){
		$("#selectAll-left").addClass("curr");
	}else{
		$("#selectAll-left").removeClass("curr");
	}
})
//点击右侧全选
$(document).on("click","#selectAll-right",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$("#personShow li").removeClass("curr");
	}else {
		$(this).addClass("curr");
		$("#personShow li").addClass("curr");
	 }
})
//点击右侧人员
$(document).on("click","#personShow li",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else {
		$(this).addClass("curr");
	 }
	if($("#personShow li").length == $("#personShow li.curr").length){
		$("#selectAll-right").addClass("curr");
	}else{
		$("#selectAll-right").removeClass("curr");
	}
})
//点击添加
$("#shuttle_box_toRight").click(function(){
	for(var i=0;i<$("#person-left li.curr").length;i++){
		var holderno=$("#person-left li.curr").eq(i).attr("data-holderno");
		$("#personShow li[data-holderno="+holderno+"]").remove();
	}
	$("#person-left").find("li.curr").removeClass("curr").appendTo("#personShow");
})
//点击移除
$("#shuttle_box_toLeft").click(function(){
	for(var i=0;i<$("#personShow li.curr").length;i++){
		var holderno=$("#personShow li.curr").eq(i).attr("data-holderno");
		$("#person-left li[data-holderno="+holderno+"]").remove();
	}
	$("#personShow").find("li.curr").removeClass("curr").appendTo("#person-left");
})


//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			console.log(res)
			if(res.flag){
				layui.use('tree', function(){
				    var tree = layui.tree;
				    //渲染
				    var inst1 = tree.render({
				        elem: '#selectDept',
				        data: res.result,
				        onlyIconControl:true,
						click: function(obj){
							$(".layui-tree-txt").css("color","#555");
					    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
							queryHolderByDept(obj.data.id);
						}
				    });
				});
			}
		}
	})
}

//点击单位查人
function queryHolderByDept(unitno){
	$.ajax({
		url:url+"/HolderData/getList",
		type:"post",
		data:{"unitno":unitno},
		success:function(data){
			console.log(data);
			$("#person-left").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined)?"":item.holderno;
					var holdername=(item.holdername==undefined)?"":item.holdername;
					var $li=$("<li data-holderno="+holderno+" data-holdername="+holdername+"><p>"+holdername+"</p><p>"+holderno+"</p></li>")
					$("#person-left").append($li);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}


//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}