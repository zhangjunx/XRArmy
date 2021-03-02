getItemList();
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
	 form.on('select(itemname)', function (data) {
		    //对select和input进行监控渲染
	        if(data.value != "") {        
	            $("#itemname").val(data.value);
	        }        
		})
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	    var toggle="/DictData/insert";
		if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.id=getUrlParam("id");
			toggle="/DictData/update";
		}
	     $.ajax({
	    	url:url+toggle,
	    	type:"POST",
	    	data:obj,
	    	success:function(res){
	    		 console.log(res);
	    		 if(res.flag){
	    			 layer.msg(res.reason,{time:2000},function(){
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
	 /* 自定义验证规则 */
	    form.verify({
	    	phoneNum: function(value){
		    var reg=/^1[3456789]\d{9}$/;
	        if(!reg.test(value)){
	          return '请正确输入手机号!';
	        }
	      },
	    });
})

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data)
			if(data.flag){
				var res=data.result[0];
				 $("#name").val(res.name);//.attr("disabled","disabled");
				 $("#code").val(res.code);//.attr("disabled","disabled");
				 $("#itemname").val(res.itemname);
				 $("#remark").val(res.remark);
			}
		}
	})
}

//获取字典项下拉
function getItemList(){
	$.ajax({
		url:url+"/DictData/getItemList",
		type:"POST",
		data:{"loginid":window.top.loginid},
		async:false,
		success:function(res){
			console.log(res)
			$("#itemname2 option").not("option:first").remove();
			if(res.flag){
				for(var item of res.result){
					var $opt=$("<option value="+item.itemname+">"+item.itemname+"</option>");
					$("#itemname2").append($opt);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
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