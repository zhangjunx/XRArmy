$(function(){
	//查询角色
	getRole();
	getTree();
})
//点击人员下的li、
$(document).on("click","#holder li",function(){
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
	}else{
		$(this).addClass("cur");
	}
})
//点击角色
$(document).on("click","#module-list li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	var id=$(this).attr("data-id");
	getUserByRole(id);
})
//点击角色查用户
function getUserByRole(roleid){
	$.ajax({
		url:url+"/UserData/getList",
		type:"post",
		data:{"roleid":roleid},
		success:function(data){
			console.log(data);
			$("#holder").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			var html="";
			for(var item of res){
				var userid=(item.userid==undefined)?"":item.userid;
				var username=(item.username==undefined)?"":item.username;
				var unitname=(item.unitname==undefined?"":item.unitname);
				var unitno=(item.unitno==undefined?"":item.unitno);
				 html+="<li data-userid="+userid+" data-username="+username+" data-unitno="+unitno+"><div class='personPhoto'><img src='../img/person.png'></div>" +
				 "<div class='holderInfo'><p>用户ID:<span class='holderno'>"+userid
				 +"</span></p><p>用户姓名:<span class='holdername'>"+username
				 +"</span></p><p>所属单位:<span class='deptname'>"+unitname
				 +"</span></p></div></li>";
			}
			 $("#holder").append(html);
		}
	})
}

//点击确定
$("#sure").click(function(){
	save();
})
function save(){
	if($("#module-list li.curr").length == 0){
		layer.msg("请选择角色!",{time:2000});
		return;
	}
	if($("#holder li.cur").length == 0){
		layer.msg("请选择人员!",{time:2000});
		return;
	}
	var roleid=$("#module-list li.curr").attr("data-id");
	var arr=[];
	for(var i=0;i<$("#holder li").length;i++){
		if($("#holder li").eq(i).hasClass("cur")){
			var holderno=$("#holder li").eq(i).attr("data-userid");
			var holdername=$("#holder li").eq(i).attr("data-username");
			var unitno=$("#holder li").eq(i).attr("data-unitno");
			var obj={
				"holderno":holderno,
				"holdername":holdername,
				"unitno":unitno
			}
			arr.push(obj);
		}
	}
	$.ajax({
		url:url+"/UserData/add",
		type:"POST",
		data:{"str":JSON.stringify(arr),"roleid":roleid,"type":"aa","loginid":window.top.loginid},
		success:function(data){
			layer.msg(data.reason,{time:2000},function(){
				parent.location.reload();
				parent.layer.closeAll();
			});
		}
	})
}//end
//点击移除
$("#remove").click(function(){
	removeBatch();//
})
function removeBatch(){//给多个用户赋予角色  批量修改holderpower
	if($("#module-list li.curr").length == 0){
		layer.msg("请选择角色!",{time:2000});
		return;
	}
	if($("#holder li.cur").length == 0){
		layer.msg("请选择人员!",{time:2000});
		return;
	}
	var roleid=$("#module-list li.curr").attr("data-id");
	var arr=[];
	for(var i=0;i<$("#holder li").length;i++){
		if($("#holder li").eq(i).hasClass("cur")){
			var holderno=$("#holder li").eq(i).attr("data-userid");
			var holdername=$("#holder li").eq(i).attr("data-username");
			var unitno=$("#holder li").eq(i).attr("data-unitno");
			var obj={
				"holderno":holderno,
				"holdername":holdername,
				"unitno":unitno
			}
			arr.push(obj);
		}
	}
	$.ajax({
		url:url+"/UserData/add",
		type:"POST",
		data:{"str":JSON.stringify(arr),"roleid":roleid,"type":"dd","loginid":window.top.loginid},
		success:function(data){
			layer.msg(data.reason,{time:2000},function(){
				parent.location.reload();
				parent.layer.closeAll();
			});
		}
	})
}//end

//点击人员下的全选
$(".toolbar_all").click(function(){
	$("#holder li").addClass("cur");
})
//点击清空
$(".toolbar_empty").click(function(){
	$("#holder li").removeClass("cur");
})
//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			console.log(res);
			if(res.flag){
				layui.use('tree', function(){
				    var tree = layui.tree;
				    //渲染
				    var inst1 = tree.render({
				        elem: '#classtree',
				        data: res.result,
				        onlyIconControl:true,
						click: function(obj){
							$(".layui-tree-txt").css("color","#555");
					    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
							getHolderByDept(obj.data.id);
						}
				    });
				});
			}
		}
	})
}
//点击单位查人
function getHolderByDept(unitno){
	$.ajax({
		url:url+"/HolderData/getList",
		type:"post",
		data:{"unitno":unitno},
		success:function(data){
			console.log(data);
			$("#holder").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			
			var res=data.result;
			var html="";
			for(var item of res){
				var userid=(item.holderno==undefined)?"":item.holderno;
				var username=(item.holdername==undefined)?"":item.holdername;
				var unitname=(item.unitname==undefined?"":item.unitname);
				var unitno=(item.unitno==undefined?"":item.unitno);
				 html+="<li data-userid="+userid+" data-username="+username+" data-unitno="+unitno+"><div class='personPhoto'><img src='../img/person.png'></div>" +
				 "<div class='holderInfo'><p>证号:<span class='holderno'>"+userid
				 +"</span></p><p>姓名:<span class='holdername'>"+username
				 +"</span></p><p>单位:<span class='deptname'>"+unitname
				 +"</span></p></div></li>";
			}
			 $("#holder").append(html);
		}
	})
}



//获取角色列表
function getRole(){
	$.ajax({
		url:url+"/ACL_Role/getList",
		type:"post",
		success:function(res){
			console.log(res);
			$("#module-list").empty();
			if(res.flag){
				var data=res.result;
				for(var item of data){
					var id=item.id==undefined?"":item.id;
					var name=item.name==undefined?"":item.name;
					var $li=$("<li data-id="+id+">"+name+"</li>");
					$("#module-list").append($li);
				}
			}
		}
	})
}