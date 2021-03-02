//getRoles();
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
	     var obj=data.field;
	     var toggle="/TitleData/insert";
	     if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.id=getUrlParam("id");
			toggle="/TitleData/update";
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

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/TitleData/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result[0];
				 $("#titlename").val(res.titlename);
				 $("#remark").val(res.remark);
				 
				/*$("input[value="+data.data.zt+"]").attr("checked",true);
				layui.use("form",function(){
						var form=layui.form;
						form.render();
				})*/
			}
		}
	})
}

//获取角色
function getRoles(){
	$.ajax({
		url:url+'?action=roles',
		type:"GET",
		headers: {
			Accept: "application/json; charset=utf-8",
			Authorization:$.cookie("token")
		},
		async:false,
		success:function(res){
			console.log(res);
			$("#fk_roleid option").find("not:first").remove();
			if(res.code==200){
				for(var item of res.data){
					var $opt=$("<option value="+item.ID+">"+item.Title+"</option>");
					$("#fk_roleid").append($opt);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
				})
			}else{
				layer.msg(res.message,{time:2000});
			}
		}
	})
}
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
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}