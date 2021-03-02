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
	        url:url+"/HolderData/getExcel",//后台检查Excel表格中的数据
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
		        				  "holderno":item[0],
		        				  "holdername":item[1],
		        				  "sexname":item[2],
		        				  "unitname":item[3],
		        				  "emptype":item[4],
		        				  "idcode":item[5],
		        				  "file":item[6],
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
			      {field:'holderno', title:'编号', width:100,templet:function(d){
			    	  if(d.holderno==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.holderno;
			    	  }
			      }},
			      {field:'holdername', title:'姓名', width:100,templet:function(d){
			    	  if(d.holdername==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.holdername;
			    	  }
			      }},
			      {field:'sexname', title:'性别', width:100,sort:true,templet:function(d){
			    	  if(d.sexname==null){
			    		  return  "<div class='redData' style='color:red'>请填写</div>";
			    	  }else{
			    		  return d.sexname;
			    	  }
			      }},
				  {field:'unitname', title:'所属单位', width:150,sort:true,templet:function(d){
					  if(d.unitname==null){
						  return  "<div class='redData' style='color:red'>请填写</div>";
					  }else{
						  return d.unitname;
					  }
				  }},
				  {field:'emptype', title:'人员类别', width:150,sort:true,templet:function(d){
					  if(d.emptype==null){
						  return  "<div class='redData' style='color:red'>请填写</div>";
					  }else{
						  return d.emptype;
					  }
				  }},
				  {field:'idcode', title:'身份证号', width:200,sort:true,templet:function(d){
					  if(d.idcode==null){
						  return  "<div class='redData' style='color:red'>请填写</div>";
					  }else{
						  return d.idcode;
					  }
				  }},
				  {field:'file', title:'照片路径',sort:true}
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
					  if(item.file == undefined){
						  item.file="";
					  }
				  }
			     $.ajax({
			    	 url:url+'/HolderData/addExcel',
			    	 type:'POST',
			    	 data:{"str":JSON.stringify(arr),"state":"1","loginid":window.top.loginid},
			    	 success:function(res){
			    		 console.log(res)
			    		 if(res.flag){
			    			 layer.msg(res.reason,{time:1000},function(){
			    				 parent.layer.closeAll();
				    			 window.parent.location.reload();
			    			 });
			    		 }else{
			    			 layer.msg(res.reason,{time:2000})
			    			 var haveholder=res.haveholder;//重复的编号
		    			     var nohaveunit=res.nohaveunit;//不存在的单位名称
			    			 for(var item of haveholder){
			    				 $("td[data-content="+item+"] div").css("color","red");
			    			 }
			    			 for(var item of nohaveunit){
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

