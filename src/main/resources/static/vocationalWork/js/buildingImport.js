$(function(){
	initTable([]);
})

$(".file").change(function(e){
	postData();
	//清空input
	e.target.value = '';
});//end

var file;
function postData(){
	 var formData = new FormData();
	 var excle = $(".file").val();
	 file=$(".file")[0].files[0];
	 formData.append("file",$(".file")[0].files[0]);
	//文件名可以带空格
    var reg = /^.*\.(?:xls|xlsx)$/i;
	//校验不通过
	if(!reg.test(excle)) {
		layer.msg("请上传excel格式的文件!",{time:2000});
		initTable([]);
	}else{
		$.ajax({
	        url:url+"?action=building&Excel=ListExcelData",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
			headers:{
				Authorization:$.cookie("token")
			},
	        success : function(res) {
	        	console.log(res);
	          var val=res.data;
	          layer.msg(res.message,{time:2000});
	          if(res.code == 200){
	        	  initTable(val);
	          }else{
				  initTable([]);
			  }
	        }
	     })
	 }
}
function initTable(res){
	layui.use(["form","table"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table;
		 
		  table.render({
			    elem: '#buildingManage',
			    cellMinWidth: 80,
			    cols: [[
			      {field:'building_name', title:'楼栋名称', width:500,templet:function(d){
			    	  if(d.building_name==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.building_name;
			    	  }
			      }},
			      {field:'building_household', title:'楼栋户数', width:500,templet:function(d){
			    	  if(d.building_household==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.building_household;
			    	  }
			      }},
			      {field:'building_person_number', title:'人数', width:430,sort:true,templet:function(d){
			    	  if(d.building_person_number==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.building_person_number;
			    	  }
			      }}
			    ]],
			    data:res,
			    page: true,
			  });
		//监听提交按钮    
			 form.on('submit(component-form-demo1)', function(data){
			     var arr=table.cache.buildingManage;
				 //判断页面有没有加红的数据
				 if($(".redData").length!=0){
					 layer.msg("请检查页面加红的数据!",{time:2000});
					 return;
				 }
				 var formData = new FormData();
				  if($("tr").length==1){
					  layer.msg("请先上传文件!",{time:2000});
					  return;
				  }
				 formData.append("file",file);
			     $.ajax({
			    	 url:url+'?action=building&Excel=UploadExcel',
			    	 type:'POST',
			    	 //async:false,
			    	 data:formData,
			    	 // 告诉jQuery不要去处理发送的数据
			    	 processData:false,
			    	 // 告诉jQuery不要去设置Content-Type请求头
			    	 contentType:false,
			    	 headers:{
			    	 	Authorization:$.cookie("token")
			    	 },
			    	 success:function(res){
			    		 if(res.code == 200){
			    			 layer.msg(res.message,{time:1000},function(){
			    				 parent.layer.closeAll();
			    				 window.parent.location.reload();
			    			 })
			    		 }else{
			    			 layer.msg(res.message,{time:2000});
			    		 }
			    	 }
			     })
		    });
			 //点击取消
			 $("#resetData").click(function(){
				 parent.layer.closeAll();
			 })
	})
}

