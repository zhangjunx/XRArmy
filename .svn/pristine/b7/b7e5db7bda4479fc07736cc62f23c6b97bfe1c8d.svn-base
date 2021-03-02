$(function(){
	initTable([]);
})

$(".file").change(function(e){
	postData();
	//清空input
	e.target.value = '';
});//end

function postData(){
	 var formData = new FormData();
	 var excle = $(".file").val();
	 formData.append("file",$(".file")[0].files[0]);
	//文件名可以带空格
    var reg = /^.*\.(?:xls|xlsx)$/i;
	//校验不通过
	if(!reg.test(excle)) {
		layer.msg("请上传excel格式的文件!",{time:2000});
		initTable([]);
	}else{
		$.ajax({
	        url:url+"/DictData/getExcel",//后台检查Excel表格中的数据
	        type:'POST',
	        //async:false,
	        data:formData,
	        // 告诉jQuery不要去处理发送的数据
	        processData:false,
	        // 告诉jQuery不要去设置Content-Type请求头
	        contentType:false,
	        success : function(res) {
	          console.log(res);
	          var val=res.result;
	          layer.msg(res.reason,{time:2000});
	          if(res.flag){
	        	  var arr=[];
	        	  for(var item of val){
        			  var obj={
	        				  "name":item[0],
	        				  "code":item[1],
	        				  "itemname":item[2],
	        				  "remark":item[3],
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
			      {field:'name', title:'字典名称', width:350,templet:function(d){
			    	  if(d.name==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.name;
			    	  }
			      }},
			      {field:'code', title:'字典值', width:350,templet:function(d){
			    	  if(d.code==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.code;
			    	  }
			      }},
			      {field:'itemname', title:'字典项名称', width:350,sort:true,templet:function(d){
			    	  if(d.itemname==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.itemname;
			    	  }
			      }},
				  {field:'remark', title:'备注',sort:true}
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
				  for(var item of arr){
					  if(item.remark == undefined){
						  item.remark="";
					  }
				  }
			     $.ajax({
			    	 url:url+'/DictData/addExcel',
			    	 type:'POST',
			    	 data:{"str":JSON.stringify(arr)},
			    	 success:function(res){
			    		 console.log(res)
			    		 if(res.flag){
			    			 layer.msg(res.reason,{time:1000},function(){
			    				 parent.layer.closeAll();
				    			 window.parent.location.reload();
			    			 });
			    		 }else{
			    			 layer.msg(res.reason,{time:2000})
			    			 var havecode=res.havecode;//重复的字典值
			    			 var havename=res.havename;//重复的字典名称
			    			 for(var item of havecode){
			    				 $("td[data-content="+item+"] div").css("color","red");
			    			 }
			    			 for(var item of havename){
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

