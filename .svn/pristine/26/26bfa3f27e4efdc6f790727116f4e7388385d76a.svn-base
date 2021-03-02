if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
			});
	 });
	
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 if($("#maxNum").val() < 0){
			 layer.msg("容纳车辆数不能小于0！",{time:2000});
			 return;
		 }
		 var fid=$("#fid").val();
	     var obj=data.field;
	     obj.thisUserID=window.top.loginid;
	     obj.fid=fid;
	     $.ajax({
	    	 url:carUrl+'car/parking/addParking',
			 type:"POST",
			 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.result){
					 layer.msg(res.msg,{time:1000},function(){
						 parent.layer.closeAll();
						 window.parent.location.reload();
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


//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:carUrl+"car/parking/getOneParking",
		type:"POST",
		data:{"fid":getUrlParam("id"),"thisUserID":window.top.loginid},
		success:function(data){
			console.log(data);
			if(data.result){
				 $("#code").val(data.data.code);
				 $("#parkName").val(data.data.parkName);
				 $("#location").val(data.data.location);
				 $("#type").val(data.data.type);
				 $("#maxNum").val(data.data.maxNum);
				$("#fid").val(data.data.fid);
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
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