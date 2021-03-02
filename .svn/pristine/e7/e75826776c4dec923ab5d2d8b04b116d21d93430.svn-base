$(function(){
	//initIssue();//初始化密保问题
	initPlatform();//初始化平台信息
	//query();
})

//测试接口
function query(){
	var arr=[{"roleid":1,"menuid":"001","type":"aa"},
		{"roleid":1,"menuid":"001001","type":"aa"},
		{"roleid":1,"menuid":"001002","type":"aa"}];
	$.ajax({
		url:url+"/ACL_Role_Menu/addBatch",
		type:"POST",
		data:{"str":JSON.stringify(arr)},
		success:function(data){
			console.log(data);
			
		}
	})
}
layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	 
	 //监听提交按钮
	  form.on('submit(component-form-demo1)', function(data){
	      var obj=data.field;
		  var id=window.top.loginid;//$("#platform_id").val();
		  console.log(id)
		  obj.userid=id;
		  var src=$("#img").attr("src");
		  var param={"file":"","obj":JSON.stringify(obj)};
		  if(src.indexOf("data:image") !=-1){
			  param={"file":src,"obj":JSON.stringify(obj)};
		  }
	      $.ajax({
	     	 url:url+'/UserData/update',
	     	 type:"POST",
	     	 data:param,
	     	 success:function(data){
	     		 console.log(data);
	     		 if(!data.flag){
	     			layer.msg(data.reason,{time:2000});
	     			return;
	     		 }
	     		layer.msg(data.reason,{time:2000},function(){
	     			parent.getOneInfo();//logo和图标刷新
	     		});
	     	 }
	      })
	 });
	  //点击取消
	  $("#resetData").click(function(){
	 	//parent.layer.closeAll();
	  })
})
//初始化平台信息
function initPlatform(){
	$.ajax({
		url:url+"/UserData/getList",
		type:"POST",
		data:{"userid":window.top.loginid},
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var res=data.result[0];
    		var title=res.title==undefined?"":res.title;
    		var logo=res.logo==undefined?"../img/add_img.png":"data:image/png;base64,"+res.logo;
			$("#platform_name").val(title);
			$("#img").attr("src",logo);
			 
		}
	})
}
//获取密保问题
function initIssue(){
	$.ajax({
		url:url+"?action=issue",
		type:"GET",
		headers: {
				Accept: "application/json; charset=utf-8",
				Authorization:$.cookie("token")
		},
		async:false,
		success:function(res){
			console.log(res);
			$(".issue_name option").find("not:first").remove();
			if(res.code == 200){
				for(var item of res.data){
					var $opt=$("<option value="+item.issue_id+">"+item.issue_name+"</option>");
					$(".issue_name").append($opt);
				}
				layui.use("form",function(){
						var form=layui.form;
						form.render();
				})
			}
		}
	})
}

//点击logo选择图片
$("#logoIpt").change(function(e){
	var imgUrl=this.files[0];
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#img").attr("src",dataURL);
    };
})