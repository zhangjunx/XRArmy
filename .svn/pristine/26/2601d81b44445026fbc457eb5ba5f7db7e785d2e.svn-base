if(getUrlParam("id") == 0){//新增第一级
	$("#parentDept").remove();
	getNexUnitno("");//生成部门编号
}else if(getUrlParam("no") != undefined && getUrlParam("no") != null && getUrlParam("no") != ""){
	getNexUnitno(getUrlParam("no"));//生成部门编号
	$("#parentno").attr("data-parentno",getUrlParam("no")).val(getUrlParam("title"));
}else if(getUrlParam("parentno") != undefined && getUrlParam("parentno") != null && getUrlParam("parentno") != ""){//编辑
	getOneInfo(getUrlParam("parentno"));
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
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	     var parentno=$("#parentno").attr("data-parentno");
	     obj.parentno=parentno;
	     console.log(obj);
	     var toggle="/UnitList/insert";
	     if(getUrlParam("parentno") != undefined && getUrlParam("parentno") != null && getUrlParam("parentno") != ""){//编辑
	    	 toggle="/UnitList/update";
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
function getNexUnitno(parentno){
	$.ajax({
		url:url+"/UnitList/getNextUnitno",
		type:"POST",
		data:{"parentno":parentno},
		success:function(data){
			console.log(data);
			if(data.flag){
				$("#unitno").val(data.result);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//编辑时获取一条信息
function getOneInfo(parentno){
	$.ajax({
		url:url+"/UnitList/getList",
		type:"POST",
		data:{"unitno":parentno},
		success:function(data){
			if(data.flag){
				var res=data.result[0];
				 $("#parentno").val(res.parentname).attr("data-parentno",res.parentno);
				 $("#unitname").val(res.unitname);
				 $("#unitno").val(res.unitno);
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