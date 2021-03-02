getTree();
getAccessGroup();//通行权限组
if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
if(getUrlParam("watch")== 0){//查看
	$(".layui-layout-admin").hide();
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
		 if( $("#unitno").val() == ""){
			 layer.msg("请选择所属单位!",{time:2000});
			 return;
		 }
		 var level=1;
		 if($(".approverPer1").length == 0){
			 layer.msg("请选择审批人!",{time:2000});
			 return;
		 }
		 var approver2="";
		 if($(".approverPer2").length != 0){
			 approver2=$(".approverPer2").attr("data-userid");
			 level=2;
		 }
		 var approver3="";
		 if($(".approverPer3").length != 0){
			 approver3=$(".approverPer3").attr("data-userid");
			 if($(".approverPer2").length == 0 ){
				 layer.msg("请选择二级审批人!",{time:2000});
				 return;
			 }
			 level=3;
		 }
		 var approver4="";
		 if($(".approverPer4").length != 0){
			 approver4=$(".approverPer4").attr("data-userid");
			 if(($(".approverPer2").length == 0) || ($(".approverPer3").length == 0)){
				 layer.msg("请选择二级，三级审批人!",{time:2000});
				 return;
			 }
			 level=4;
		 }
		 var approver1=$(".approverPer1").attr("data-userid");
	     var obj=data.field;
	     obj.level=level;
	     obj.state="JB";
	     obj.loginid=window.top.loginid;
	     obj.unitno=$("#unitno").val();
	     obj.unitname=$("#unitname").html();
	     obj.holdername=$("#holderno option:selected").html();
	     obj.approver1=approver1;
	     obj.approver2=approver2;
	     obj.approver3=approver3;
	     obj.approver4=approver4;
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
						 parent.getOvertime();
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
//					if(id == 1){
//						$(".approverPer1").remove();
//						var $a=$("<a class='approverPer approverPer1' data-userid="+userid+">"+username+"</a>");
//					}else if(id == 2){
//						$(".approverPer2").remove();
//						var $a=$("<a class='approverPer approverPer2' data-userid="+userid+">"+username+"</a>");
//					}
					$(".approverPer"+id).remove();
					var $a=$("<a class='approverPer approverPer"+id+"' data-userid="+userid+">"+username+"</a>");
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
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result[0];
				 $("#holderno").val(res.holderno);
				 $("#holderno option:selected").html(res.holdername);
				 $("#unitno").val(res.unitno);
				 $("#unitname").html(res.unitname);
				 $("#reason").val(res.reason);
				 $("#startdate").val(res.startdate);
				 $("#enddate").val(res.enddate);
				 $("#type").val(res.type);
				 $("#groupid option[value="+res.groupid+"]").attr("selected",true);
				 $("#remark").html(res.remark);
				 if(res.approver1 != "" &&res.approver1 != undefined){
					 var $a=$("<a class='approverPer approverPer1' style='margin-left:0'>"+res.approver1+"</a>");
					 $("button[data-id=1]").after($a);
				 }
				 if(res.approver2 != "" &&res.approver2 != undefined){
					 var $a=$("<a class='approverPer approverPer2' style='margin-left:0'>"+res.approver2+"</a>");
					 $("button[data-id=2]").after($a);
				 }
				 if(res.approver3 != "" &&res.approver3 != undefined){
					 var $a=$("<a class='approverPer approverPer3' style='margin-left:0'>"+res.approver3+"</a>");
					 $("button[data-id=3]").after($a);
				 }
				 if(res.approver4 != "" &&res.approver4 != undefined){
					 var $a=$("<a class='approverPer approverPer4' style='margin-left:0'>"+res.approver4+"</a>");
					 $("button[data-id=4]").after($a);
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

//通行权限组下拉
function getAccessGroup(){
	$.ajax({
			url:url+'/AccessGroup/getList',
			type:"POST",
			dataType:"json",
			async:false,
			success:function(res){
				console.log(res)
				$("#groupid option:not(:first)").remove();
				if(!res.flag){
				   return;
				}
				var html="";
				 $.each(res.result,function(i,val){
					 var name=val.name==undefined?"":val.name;
					 html+="<option value='"+val.id+"'>"+name+"</option>"; 
				 })
				 $("#groupid").append(html);
				 layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
				})
			}
		})
}


//根据单位   获取人员
function getHolder(id){
	$.ajax({
		url:url+'/HolderData/getList',
		type:"POST",
		data:{"unitno":id},
		success:function(res){
			console.log(res);
			$("#holderno option:not(:first)").remove();
			if(res.flag){
				for(var item of res.result){
					var $opt=$("<option value="+item.holderno+">"+item.holdername+"</option>");
					$("#holderno").append($opt);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
				})
			}else{
				layer.msg(res.reason,{time:2000});
			}
		}
	})
}

//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		async:false,
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
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.data.title).end().find("input:hidden[name='unitno']").val(node.data.id);
				            getHolder(node.data.id);
				        }
				    });
				    
				    if(getUrlParam("id")==undefined||getUrlParam("id")==null||getUrlParam("id")==""){//添加
				    	$(".downpanel").on("click", ".layui-select-title", function (e) {
					        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
					        $(this).parents(".downpanel").toggleClass("layui-form-selected");
					        layui.stope(e);
					    }).on("click", "dl i", function (e) {
					        layui.stope(e);
					    });
				    }
				    
				});
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