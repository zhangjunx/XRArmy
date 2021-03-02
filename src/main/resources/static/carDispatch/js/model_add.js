getUser();
if(getUrlParam("fid") != undefined && getUrlParam("fid") != null && getUrlParam("fid") != null){
	getOneApprover(getUrlParam("fid"));
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	     var approverName=$("#approver option:selected").html();
	     var fid=$("#fid").val();
	     obj.modelID=getUrlParam("id");
	     obj.approverName=approverName
	     obj.fid=fid;
	     $.ajax({
	    	 url:carUrl+'car/approveModel/addModelInfoMem',
			 type:"POST",
			 data:obj,
	    	 success:function(res){
	    		 if(res.result){
					 layer.msg(res.msg,{time:1000},function(){
						 parent.layer.closeAll();
						parent.initTable(getUrlParam("id"));
					 })
	    		 }else{
					 layer.msg(res.msg,{time:2000});
	    		 }
	    	 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
	 /* 自定义验证规则 */
	    form.verify({
	    });
})

//编辑时获取一条数据
function getOneApprover(fid){
	$.ajax({
		url:carUrl+"car/approveModel/getOneModelMem",
		type:"POST",
		data:{"fid":fid},
		async:false,
		success:function(res){
			console.log(res);
			if(res.result){
				$("#fid").val(res.data.fid);
				$("#approver").val(res.data.approver);
				$("#approveLevel").val(res.data.approveLevel);
				$("#remark").val(res.data.remark);
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
				})
			}
		}
	})
}
//获取用户
function getUser(){
	$.ajax({
		url:url+'/UserData/getList',
		type:"POST",
		async:false,
		success:function(res){
			$("#approver option").not("option:first").remove();
			if(res.flag){
				for(var item of res.result){
					var $opt=$("<option value="+item.userid+">"+item.username+"</option>");
					$("#approver").append($opt);
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

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}