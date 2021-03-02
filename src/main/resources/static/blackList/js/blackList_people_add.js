/*if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}*/
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
		 var toggle="/BlackPeople/insert";
		 var src=$("#scenePhoto").attr("src");
		 if(src.indexOf("data:image") !=-1){
			 obj.black_pic=src;
		 }else{
			 src="";
		 }
		 if(src==""){
			 layer.msg("照片不能为空！",{time:2000});
			 return;
		 }
		 if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.id=getUrlParam("id");
			toggle="/BlackPeople/update";
		 }
		 var obj1={"file":src,"obj":JSON.stringify(obj),"loginid":window.top.loginid};
	     $.ajax({
	    	 url:url+'/BlackPeople/insert',
	    	 type:"POST",
	    	 data:obj1,
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
		url:url+"?action=black",
		type:"GET",
		data:{"black_id":getUrlParam("id")},
		headers: {
				Accept: "application/json; charset=utf-8",
				Authorization:$.cookie("token")
		},
		async:false,
		success:function(data){
			if(data.code == 200){
				 $("#black_name").val(data.data.black_name);
				 $("#black_id_number").val(data.data.black_id_number);
				 $("#black_sex input[value="+data.data.black_sex+"]").attr("checked",true);
				 $("#black_csrq").val(data.data.black_csrq);
				 $("#black_nation").val(data.data.black_nation);
				 $("#black_phone").val(data.data.black_phone);
				 $("#black_bz").val(data.data.black_bz);
				 if(data.data.black_pic2!=undefined&&data.data.black_pic2!=null&&data.data.black_pic2!=""){//现场照
				 		$("#scenePhoto").attr("src",url+"/"+data.data.black_pic2);
				 }
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}
//点击现场照选择图片
$("#sceneFile").change(function(e){
	var imgUrl=this.files[0];
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#scenePhoto").attr("src",dataURL);
    };
})
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}