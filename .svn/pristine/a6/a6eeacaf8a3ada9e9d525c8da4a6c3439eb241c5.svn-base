var appenders="";
layui.use(["form","table","laydate"],function(){
	var form=layui.form;
	var table=layui.table;
	var laydate=layui.laydate;
	
	getMeetRoomCombox();
	if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
		getOneInfo(getUrlParam("id"));
	}
	
	lay('.date').each(function() {
		laydate.render({
			elem : this,//元素
			type:"datetime",
			trigger : 'click',//怎么触发
		});
	});
	
	//监听提交按钮    
	form.on('submit(formBtn)', function(data){
		var obj=data.field;
		var appenders = "";//参议人
		var approver = [];//审批人
		var appendList=$(".appendBtn");
		var approverList=$(".approverBtn");
		//参议人
		for(var i=0;i<appendList.length;i++){
			if(appenders == ""){
				appenders = "\'"+$(appendList[i]).attr("data-holderno")+"\'";
			}else{
				appenders = appenders + ",\'" + $(appendList[i]).attr("data-holderno")+"\'";
			}
		}
		
		//审批人
		for(var i=0;i<approverList.length;i++){
			var approverID=$(approverList[i]).attr("data-userID");
			var approverName=$(approverList[i]).html();
			approver.push({"approver":approverID,"approverName":approverName,"approveLevel":"1"});
		}
		obj.appenders=appenders;
		obj.approverList=JSON.stringify(approver);
		obj.fid=$("#fid").val();
    	$.ajax({
	    	url:meetUrl+"meet/meeting/addMeeting",
	    	type:"POST",
	    	data:obj,
	    	success:function(res){
	    		layer.msg(res.msg,{time:2000});
	    		if(res.result){
	    			parent.layer.closeAll();
		    		parent.initTable();
	    		}
	    	}
	    })
	});
	
	//监听取消按钮    
	form.on('submit(formCancelBtn)', function(data){
		parent.layer.closeAll();
	});
})

//会议室下拉框
function getMeetRoomCombox(){
	$.ajax({
    	url:meetUrl+'meet/room/getRoomList',
    	type:"POST",
    	data:{"roomName":"","thisUserID":window.top.loginid},
    	async:false,
    	success:function(res){
    		$("#roomID option").not("option:first").remove();
			if(res.result){
				for(var item of res.data){
					var $opt=$("<option value="+item.fid+">"+item.roomName+"</option>");
					$("#roomID").append($opt);
				}
				layui.use("form",function(){
					var form=layui.form;
					form.render();
				})
			}
    	}
    })
}

//点击参议人
$('#selectAppend').click(function(){
	layer.open({
		type:2,
		title:"选择人员",
		content:"holderList.html",
		area:["90%","91%"],
	})
});

//点击审批人
$('#selectApprover').click(function(){
	layer.open({
		type:2,
		title:"选择用户",
		content:"userList.html",
		area:["90%","91%"],
	})
});

//渲染选择的人员
function setAppenders(obj){
	var html="";
	for(var i=0;i<obj.length;i++){
		var tmpl="<a href='javascript:;' class='layui-btn layui-btn-primary layui-btn-sm appendBtn' data-holderno="+obj[i].holderNo+">"+obj[i].holderName+"</a>";
		if($(".appendBtn[data-holderno="+obj[i].holderNo+"]").length>0){
			continue;
		}
		html = html+tmpl;
	}
	$("#selectAppend").before(html);
}

//双击人员删除
$(document).on("dblclick",".appendBtn",function(){
	$(this).remove();
})

//审批人渲染
function setApprover(obj){
	var html="";
	for(var i=0;i<obj.length;i++){
		var tmpl="<a href='javascript:;' class='layui-btn layui-btn-primary layui-btn-sm approverBtn' data-userID="+obj[i].userID+">"+obj[i].userName+"</a>";
		if($(".approverBtn[data-userID="+obj[i].userID+"]").length>0){
			continue;
		}
		html = html+tmpl;
	}
	$("#selectApprover").before(html);
}

//双击用户删除
$(document).on("dblclick",".approverBtn",function(){
	$(this).remove();
})

//获取一条数据
function getOneInfo(fid){
	$.ajax({
    	url:meetUrl+"meet/meeting/getOneMeeting",
    	type:"POST",
		async:false,
    	data:{"fid":fid,"thisUserID":window.top.loginid},
    	success:function(res){
    		console.log(res);
    		var data = res.data;
    		var appendList = data.appendList;//参议人
    		var approveList = data.approveList;//审批人
    		$("#fid").val(data.fid);
    		$("#mettingTitle").val(data.mettingTitle);
    		$("#mettingType").val(data.mettingType);
    		$("#roomID").val(data.roomID);
    		$("#hostor").val(data.hostor);
    		$("#promoter").val(data.promoter);
    		$("#promoterPhone").val(data.promoterPhone);
    		$("#startDate").val(data.startDate);
    		$("#endDate").val(data.endDate);
    		$("#signinStartTime").val(data.signinStartTime);
    		$("#signinEndTime").val(data.signinEndTime);
    		$("#signBackStartTime").val(data.signBackStartTime);
    		$("#signBackEndTime").val(data.signBackEndTime);
    		$("#remark").val(data.remark);
    		setAppenders(appendList);//参议人
    		setApprover(approveList);//审批人

    		if(getUrlParam("type") == 'view'){
    			$("#shadow").show();
    			$("#btnItem").hide();
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
