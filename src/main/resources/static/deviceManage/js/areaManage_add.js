if(getUrlParam("parentid") == 0){//新增第一级
	getNextid("");//生成部门编号
	//$("#parentDept").remove();
	
}else if(getUrlParam("parentid") != undefined && getUrlParam("parentid") != null && getUrlParam("parentid") != "" && getUrlParam("parentid") != "0"){
	getNextid(getUrlParam("parentid"));//生成部门编号
	$("#parentid").attr("data-parentid",getUrlParam("parentid")).val(getUrlParam("parentname"));
}else if(getUrlParam("id") != undefined && getUrlParam("id") != null && getUrlParam("id") != ""){
	//编辑
	getOneInfo(getUrlParam("id"));
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
				trigger : 'click',//怎么触发
			});
	 });
	//监听楼栋下拉框
	 /*form.on('select(parentid)', function(data){
		//var id=$("#parentid option:selected").attr("data-id");
		 getTree(id);
	 });*/
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	     var parentid=$("#parentid").attr("data-parentid");
	     
	     obj.parentid=parentid;
	     console.log(obj);
	     var toggle="/AreaList/insert";
	     if(getUrlParam("id") != undefined && getUrlParam("id") != null && getUrlParam("id") != ""){//编辑
	    	 toggle="/AreaList/update";
	     }
	     $.ajax({
	    	 url:url+toggle,
	    	 type:"POST",
	    	 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.flag){
					 layer.msg(res.reason,{time:1000},function(){
						 parent.layer.closeAll();
						 window.parent.location.reload();
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
//获取部门编号
function getNextid(id){
	$.ajax({
		url:url+"/AreaList/getNextid",
		type:"POST",
		data:{"parentid":id},
		success:function(data){
			console.log(data);
			if(data.flag){
				$("#areaid").val(data.result);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//编辑时获取一条信息
function getOneInfo(id){
	$.ajax({
		url:url+"/AreaList/getList",
		type:"POST",
		data:{"areaid":id},
		success:function(data){
			console.log(data)
			if(data.flag){
				var res=data.result[0];
				 $("#parentid").val(res.parentname).attr("data-parentid",res.parentid);
				 $("#areaname").val(res.areaname);
				 $("#areaid").val(res.areaid);
				 $("#remark").val(res.remark);
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