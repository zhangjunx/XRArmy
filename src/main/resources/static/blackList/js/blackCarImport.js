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
	        url:url+"/BlackCar/getExcel",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
			/*headers:{
				Authorization:$.cookie("token")
			},*/
	        success : function(data) {
	        	console.log(data);
	          var res=data.result;
	          layer.msg(data.reason,{time:2000});
	          if(data.flag){
	        	  var arr=[];
	        	  for(var item of res){
        			  var obj={
	        				  "carplateno":item[0],
	        				  "photostr":item[1],
	        				  "carplatecolor":item[2],
	        				  "carbodycolor":item[3],
	        				  "cartype":item[4] 
	        		  }
        			  arr.push(obj);
	        	  }
	        	  initTable(arr);
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
			      {field:'carplateno', title:'车牌号码', width:200,templet:function(d){
			    	  if(d.carplateno==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.carplateno;
			    	  }
			      }},
			      {field:'photostr', title:'照片', width:250,templet:function(d){
			    	  var photostr=d.photostr==undefined?"":d.photostr;
			    	  return photostr;
			      }},
			      {field:'carplatecolor', title:'车牌颜色', width:200,sort:true,templet:function(d){
			    	  var carplatecolor=d.carplatecolor==undefined?"":d.carplatecolor;
			    	  return carplatecolor;
			      }},
				  {field:'carbodycolor', title:'车身颜色', width:100,sort:true,templet:function(d){
					  var carbodycolor=d.carbodycolor==undefined?"":d.carbodycolor;
			    	  return carbodycolor;
				  }},
				  {field:'cartype', title:'车辆类型', width:100,sort:true,templet:function(d){
					  var cartype=d.cartype==undefined?"":d.cartype;
			    	  return cartype;
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
			     $.ajax({
			    	 url:url+'/BlackCar/addExcel',
			    	 type:'POST',
			    	 data:{"str":JSON.stringify(arr),"loginid":window.top.loginid},
			    	 success:function(res){
			    		 console.log(res)
			    		 if(res.flag){
			    			 layer.msg(res.reason,{time:1000},function(){
			    				 parent.layer.closeAll();
			    				 window.parent.location.reload();
			    			 })
			    		 }else{
			    			 layer.msg(res.reason,{time:2000});
			    			 var havecarplateno=res.havecarplateno==undefined?"":res.havecarplateno;//身份证号重复
			    			 for(var item of havecarplateno){
			    				 $("td[data-content="+item+"] div").css("color","red");
			    			 }
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

