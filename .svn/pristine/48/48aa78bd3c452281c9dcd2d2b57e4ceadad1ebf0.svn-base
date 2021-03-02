
$(function(){
	if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
    }
	initGroup();
	getTree();
})
layui.use("form",function(){
	var form=layui.form;
})
//点击添加人员
$("#add").click(function(){
	if($("#module-list li.curr").length == 0){
		layer.msg("请选择权限组!",{time:2000});
		return;
	}
	var groupid=$("#module-list li.curr").attr("data-id");
	layer.open({
		type:2,
		title:"添加人员",
		content:"addPeople-layer.html?groupid="+groupid,
		area:["90%","92%"]
	})
})
//点击某个权限组
$(document).on("click",".module-list li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	var id=$(this).attr("data-id");
	getPersonByPer(id);
})
//点击人员
$(document).on("click",".personBox li",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})
//点击人员全选
$(".power h2 span").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$(".personBox li").removeClass("curr");
	}else{
		$(this).addClass("curr");
		$(".personBox li").addClass("curr");
	}
})
//点击移除提交数据
$("#remove").click(function(){
	saveInfo();
})
//提交数据
function saveInfo(){
	if($("#module-list li.curr").length == 0){
		layer.msg("请选择权限组!",{time:2000});
		return;
	}
	var groupid=$("#module-list li.curr").attr("data-id");
	var arr=[];
	if($("#personBox li.curr").length == 0){
		layer.msg("请选择要移除的人员!",{time:2000});
		return;
	}else{
		for(var i=0;i<$("#personBox li.curr").length;i++){
			var id=$("#personBox li.curr").eq(i).attr("data-id");
			arr.push(id);
			/*arr.push({
				"groupid":groupid,
				"holderno":id
			})*/
		}
	}
	$.ajax({
	     url:url+'/AccessGroupHolder/addBatch',
	     type:"POST",
	     data:{"str":JSON.stringify(arr),"groupid":groupid,"type":"dd","loginid":window.top.loginid},
		 success:function(data){
			 console.log(data)
			 if(data.flag){
				 layer.msg(data.reason,{time:1000},function(){
					 getPersonByPer(groupid);
				 });
			 }else{
				 layer.msg(data.reason,{time:2000});
			 }
		 }
	})
}


//点击搜索
$("#search").click(function(){
	var id=$("#module-list li.curr").attr("data-id");
	console.log(id)
	if(id==undefined || id==""){
		layer.msg("请先选择权限组！",{time:2000});
		return;
	}
	var unitno=$("#unitno").val();
	var holderno=$("#holderno").val();
	var holdername=$("#holdername").val();
	var obj={
		"unitno":unitno,
		"holderno":holderno,
		"holdername":holdername,
		"groupid":id,
	}
	$.ajax({
	   url:url+'/AccessGroupHolder/getListByGroup',
	   type:"POST",
	   data:obj,
	   success:function(res){
		    $("#personBox").empty();
			 if(!res.flag){
			     layer.msg(res.reason,{time:2000});
				 return; 
			 }
			 for(var item of res.result){
					var $li=$("<li data-id="+item.holderno+" data-opendoorid="+item.id+" class='curr'><p>"+item.holdername+"</p><p>"+item.holderno+"</p></li>");
					$("#personBox").append($li);
			 }
			 /*if(res.flag){
				 for(var item of res.result){
					 var $li=$("<li data-id="+item.holderno+">"+item.holdername+"</li>");
					 if(item.fk_opendoorqxid == id){
						 $li=$("<li class='curr' data-id="+item.personnel_id+">"+item.personnel_name+"</li>");
					 }
					$("#personBox").append($li);
				 }
			 }*/
		 }
	})
})

////根据子页面的传值生成人员
//function createPeople(arr){
//	var id=$("#module-list li.curr").attr("data-id");
//	if(id == undefined || id ==""){
//		layer.msg("请先选择权限组！",{time:2000});
//		return;
//	}
//	for(var item of arr){
//		var $li=$("<li data-id="+item.holderno+"><p>"+item.holdername+"</p><p>"+item.holderno+"</p></li>");
//		if($("#personBox li[data-id="+item.holderno+"]").length == 0){
//			$("#personBox").append($li);
//		}
//	}
//}


//根据权限组获取人员
function getPersonByPer(id){
	$.ajax({
	   url:url+'/AccessGroupHolder/getListByGroup',
	   type:"POST",
	   data:{"groupid":id},
	   success:function(res){
			 console.log(res);
			 $("#personBox").empty();
			 if(!res.flag){
				 layer.msg(res.reason,{time:2000});
				 return;
			 }
			 for(var item of res.result){
					var $li=$("<li data-id="+item.holderno+" data-opendoorid="+item.id+" class='curr'><p>"+item.holdername+"</p><p>"+item.holderno+"</p></li>");
					$("#personBox").append($li);
			 }
		 }
	})
}

//初始化权限组列表
function initGroup(){
	$.ajax({
	   url:url+'/AccessGroup/getList',
	   type:"POST",
	   data:{"loginid":window.top.loginid},
	   success:function(res){
		     console.log(res)
			 $("#module-list").empty();
			 if(res.flag){
				 for(var item of res.result){
					 var $li=$("<li data-id="+item.id+">"+item.name+"</li>");
					 $("#module-list").append($li);
				 }
			 }
		 }
	})
}

//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			console.log(res)
			if(res.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree",
				        data: res.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	console.log(node)
				        	$("#unitno").val(node.data.id);
				        	$("#unitname").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				        }
				    
				    });
				    $(".downpanel").on("click", ".layui-select-title", function (e) {
				        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
				    
				});
			}
		}
	})
}

 