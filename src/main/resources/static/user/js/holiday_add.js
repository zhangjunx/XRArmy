getUserInfo();
if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate","layer"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate,
	 layer=layui.layer;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				type:"datetime",
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 if($(".approverPer1").length == 0){
			 layer.msg("请选择审批人!",{time:2000});
			 return;
		 }
		 var approvertwo="";
		 if($(".approverPer2").length != 0){
			 approvertwo=$(".approverPer2").attr("data-userid");
		 }
		 var approverone=$(".approverPer1").attr("data-userid");
	     var obj=data.field;
	     obj.state="XJ";
	     obj.loginid=window.top.loginid;
	     obj.unitno=$("#unitname").attr("data-unitno");
	     obj.holderno=$("#holderno").attr("data-holderno");
	     obj.approverone=approverone;
	     obj.approvertwo=approvertwo;
		 var toggle="/HolderLeave/insert";
	     if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			toggle="/HolderLeave/update";
	     }
	    console.log(obj);
	     $.ajax({
	    	 url:url+toggle,
	    	 type:"POST",
	    	 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.flag){
					 layer.msg(res.reason,{time:1000},function(){
						 parent.getHoliday();
						 parent.layer.closeAll();
					 })
	    		 }else{
						layer.msg(res.reason,{time:2000});
	    		 }
	    	 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
})


//点击选择审批人
$(".selectPerson").click(function(){
	var id=$(this).attr("data-id");
	if(id == 2){
		if($(".approverPer1").length == 0){
			layer.msg("请先选择一级审批人!",{time:2000});
			return;
		}
	}
	var that=this;
	getUser("");
	layer.open({
		type:1,
		content:$("#layer-selectPerson"),
		title:"选择审批人",
		area:["80%","81%"],
		btn:["确定","取消"],
		btnAlign:"c",
		yes:function(index){
			if($(".peopleBox .curr").length == 0){
				layer.msg("请选择人员!",{time:2000});
				return;
			}
			layer.close(index);
			for(var i=0;i<$(".peopleBox .curr").length;i++){
				var userid=$(".peopleBox .curr").eq(i).attr("data-userid");
				var username=$(".peopleBox .curr").eq(i).attr("data-username");
				var m=0;
				for(var k=0;k<$(".approverPer").length;k++){
					var userid2=$(".approverPer").eq(k).attr("data-userid");
					if(userid == userid2){
						m=1;
					}
				}
				if(m == 0){
					if(id == 1){
						$(".approverPer1").remove();
						var $a=$("<a class='approverPer approverPer1' data-userid="+userid+">"+username+"</a>");
					}else if(id == 2){
						$(".approverPer2").remove();
						var $a=$("<a class='approverPer approverPer2' data-userid="+userid+">"+username+"</a>");
					}
					$(that).after($a);
				}
			}
		}
	})
})
//点击搜索
$("#search").click(function(){
	var name=$("#personnel_name").val();
	getUser(name);
})
//点击人员div
$(document).on("click",".people-item",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
})
//双击审批领导删除
$(document).on("dblclick",".approverPer",function(){
	$(this).remove();
})
//获取审批领导列表
function getUser(name){
	$.ajax({
		url:url+"/UserData/getList",
		type:"POST",
		data:{"name":name},
		success:function(data){
			$(".peopleBox").empty();
			if(data.flag){
				for(var item of data.result){
					var $div=$("<div class='people-item' data-userid="+item.userid+" data-username="+item.username+"><p><label>姓名:</label><span>"+item.username+"</span></p><p><label>所属单位:</label><span>"+item.unitname+"</span></p></div>");
					$(".peopleBox").append($div);
				}
			}
		}
	})
}



//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/HolderLeave/getList",
		type:"POST",
		data:{"userid":getUrlParam("id")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result[0];
				 $("#holderno").val(res.holdername).attr("data-holderno",res.holderno);
				 $("#unitname").val(res.unitname).attr("data-unitno",res.unitno);
				 $("#reason").val(res.reason);
				 $("#startdate").val(res.startdate);
				 $("#enddate").val(res.enddate);
				 $("#type").val(res.type);
				 $("#remark").html(res.remark);
				 if(res.approverone != "" &&res.approverone != undefined){
					 var $a=$("<a class='approverPer approverPer1' style='margin-left:0'>"+res.approverone+"</a>");
					 $("button[data-id=1]").after($a);
				 }
				 if(res.approvertwo != "" &&res.approvertwo != undefined){
					 var $a=$("<a class='approverPer approverPer2' style='margin-left:0'>"+res.approvertwo+"</a>");
					 $("button[data-id=2]").after($a);
				 }
				 $(".selectPerson").remove();
				layui.use("form",function(){
						var form=layui.form;
						form.render();
				})
			}
		}
	})
}
//根据登录用户获取用户信息
function getUserInfo(){
	$.ajax({
		url:url+"/UserData/getList",
		type:"POST",
		data:{"userid":window.top.loginid},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result[0];
				 $("#holderno").val(res.username).attr("data-holderno",res.userid);
				 $("#unitname").val(res.unitname).attr("data-unitno",res.unitno);
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