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
	        url:carUrl+"public/analysisFile",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
	        success : function(res) {
	        	console.log(res);
	          var val=res.data;
	          layer.msg(res.msg,{time:2000});
	          if(res.result){
	        	  var list=[];
	        	  for(var item of res.data){
	        		  list.push({
	        			  "carNum":item[0],
	        			  "parkName":item[1],
	        			  "deptName":item[2],
	        			  "startDate":item[3],
	        			  "endDate":item[4]
	        		  })
	        	  }
	        	  initTable(list);
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
			      {field:'carNum', title:'车牌号', width:200,templet:function(d){
			    	  if(d.carNum==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.carNum;
			    	  }
			      }},
			      {field:'parkName', title:'停车场', width:200,templet:function(d){
			    	  if(d.parkName==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.parkName;
			    	  }
			      }},
			      {field:'deptName', title:'使用单位', width:200,sort:true,templet:function(d){
			    	  if(d.deptName==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.deptName;
			    	  }
			      }},
				  {field:'startDate', title:'有效期开始时间', width:200,sort:true,templet:function(d){
					  if(d.startDate==null){
						  return  "<div class='redData' style='color:red'>请填写</div>";
					  }else{
						  return d.startDate;
					  }
				  }},
				  {field:'endDate', title:'有效期结束时间', sort:true,templet:function(d){
					  if(d.endDate==null){
						  return  "<div class='redData' style='color:red'>请填写</div>";
					  }else{
						  return d.endDate;
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
				for(var item of arr){
					item.carType="";
					item.carClass="";
					item.repairRecord="";
					item.purpose="";
					item.remark="";
					item.kilometers="";
				}
				console.log(arr)
			     $.ajax({
			    	 url:carUrl+'car/carManager/insertMore',
			    	 type:'POST',
			    	 data:{"thisUserID":window.top.loginid,"carList":JSON.stringify(arr)},
			    	 success:function(res){
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
	})
}

