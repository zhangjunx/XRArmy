var exportData;
var getBusiness;
var getHoliday;
var getOvertime;
var getOther;
layui.use(["form","table"],function(){
	 var $ = layui.$;
	 var form = layui.form;
	 var table = layui.table;
	 getLeave();//请假申请
	 
	  //导出
	  $("#export").click(function(){
		  var index=$(".main-tab").find(".label.curr").index();
		  for(var item of exportData){//解决导出时身份证号变成e+17
			  item.idcode+="\t";
		  }
		  if(index == 0){//请假申请
			  table.exportFile("LAY-leave-manage",exportData, "xls");
		  }else if(index == 1){//出差申请
			  table.exportFile("LAY-business-manage",exportData, "xls");
		  }else if(index == 2){//休假申请
			  table.exportFile("LAY-holiday-manage",exportData, "xls");
		  }else if(index == 3){//加班申请
			  table.exportFile("LAY-overtime-manage",exportData, "xls");
		  }else if(index == 4){//其它申请
			  table.exportFile("LAY-other-manage",exportData, "xls");
		  }
     })
	 
	  //监听搜索 
	  form.on('submit(carStatistics)', function(data){
	    var field = data.field;
	   
	    var index=$(".main-tab .label.curr").index();
	    if(index == 0){//请假申请
	    	 field.state="QJ";
	    	//执行重载
		    table.reload('LAY-leave-manage', {
		      where: field
		    });
	    }else if(index == 1){//出差申请
	    	 field.state="CC";
	    	//执行重载
		    table.reload('LAY-business-manage', {
		      where: field
		    });
	    }else if(index ==2){//休假申请
	    	 field.state="XJ";
	    	//执行重载
		    table.reload('LAY-holiday-manage', {
		      where: field
		    });
	    }else if(index == 3){//加班申请
	    	 field.state="JB";
	    	//执行重载
		    table.reload('LAY-overtime-manage', {
		      where: field
		    });
	    }else if(index == 4){//其它申请
	    	 field.state="QT";
	    	//执行重载
		    table.reload('LAY-other-manage', {
		      where: field
		    });
	    }
	    
	  });
	 
	//请假申请
	function getLeave(){
	  	 table.render({
	  		    elem: '#LAY-leave-manage',
	  		    url:url+'/HolderLeave/getList',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"curpage",
	  		    	limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	state:"QJ"
	  		    },
	  		    parseData: function(res){ //res 即为原始返回的数据
	  		    	console.log(res);
	  		        return {
	  		          "code": res.flag==true?"0":"", //解析接口状态
	  		          "msg": res.reason, //解析提示文本
	  		          "count": res.count, //解析数据长度
	  		          "data": res.result //解析数据列表
	  		        };
	  		      },
	  		    cols:  [[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'holderno', title:'军人证号', width:120,sort:true},
	  			      {field:'holdername', title:'姓名', width:120,sort:true},
	  			      {field:'unitname', title:'所属单位', width:120,sort:true},
	  				  {field:'type', title:'请假类型', width:150,sort:true},
	  				  {field:'reason', title:'请假事由', width:150,sort:true},
	  				  {field:'createdate', title:'申请时间', width:150,sort:true},
	  				  {field:'startdate', title:'开始时间', width:150,sort:true},
	  				  {field:'enddate', title:'结束时间', width:150,sort:true},
	  				  {field:'approverone', title:'一级审批人', width:150,sort:true},
	  				  {field:'approvertwo', title:'二级审批人', width:150,sort:true},
	  				  {field:'applystatus', title:'状态', width:150,sort:true,templet:function(d){
				    	  if(d.applystatus == "10"){
				    		  return "已申请";
				    	  }else if(d.applystatus =="20" ){
				    		  return "一级审批同意";
				    	  }else if(d.applystatus =="21" ){
				    		  return "一级审批驳回";
				    	  }else if(d.applystatus =="30" ){
				    		  return "审批成功";
				    	  }else if(d.applystatus =="31" ){
				    		  return "二级审批驳回";
				    	  }else{
				    		  return "";
				    	  }
				      }},
	  				  //{field:'remark', title:'备注', width:150,sort:true},
	  				  //{field:'flowtracing', title:'流程追踪', width:150,sort:true},
	  				  {fixed: 'right', title:'操作',width:250, templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='agree'>同意</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='refuse'>驳回</a>";
						  var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
						  return $a1+$a2+$a3+$a4;
					  }},
	  			    ]],
	  			    page: true,
		  		  done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //出差申请
	 getBusiness=function (){
	  	 table.render({
	  		    elem: '#LAY-business-manage',
	  		    url:url+'/HolderLeave/getList',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"curpage",
	  		    	limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	state:"CC"
	  		    },
	  		    parseData: function(res){ //res 即为原始返回的数据
	  		    	console.log(res);
	  		        return {
	  		          "code": res.flag==true?"0":"", //解析接口状态
	  		          "msg": res.reason, //解析提示文本
	  		          "count": res.count, //解析数据长度
	  		          "data": res.result //解析数据列表
	  		        };
	  		      },
	  		    cols:  [[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  				  {field:'holderno', title:'军人证号', width:120,sort:true},
	  			      {field:'holdername', title:'姓名', width:120,sort:true},
	  			      {field:'unitname', title:'所属单位', width:120,sort:true},
	  			      {field:'type', title:'出差地点', width:150,sort:true},
	  				  {field:'reason', title:'详细地址', width:150,sort:true},
	  				  {field:'createdate', title:'申请时间', width:150,sort:true},
	  				  {field:'startdate', title:'开始时间', width:150,sort:true},
	  				  {field:'enddate', title:'结束时间', width:150,sort:true},
	  				  {field:'approverone', title:'一级审批人', width:150,sort:true},
	  				  {field:'approvertwo', title:'二级审批人', width:150,sort:true},
	  				  {field:'applystatus', title:'状态', width:150,sort:true,templet:function(d){
				    	  if(d.applystatus == '10'){
				    		  return "已申请";
				    	  }else if(d.applystatus =="20" ){
				    		  return "一级审批同意";
				    	  }else if(d.applystatus =="21" ){
				    		  return "一级审批驳回";
				    	  }else if(d.applystatus =="30" ){
				    		  return "审批成功";
				    	  }else if(d.applystatus =="31" ){
				    		  return "二级审批驳回";
				    	  }else{
				    		  return "";
				    	  }
				      }},
	  				  //{field:'remark', title:'备注', width:150,sort:true},
	  				  //{field:'flowtracing', title:'流程追踪', width:150,sort:true},
	  				  {fixed: 'right', title:'操作',width:250, templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='agree'>同意</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='refuse'>驳回</a>";
						  var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
						  return $a1+$a2+$a3+$a4;
					  }},
	  			    ]],
	  			    page: true,
	  			  done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //休假申请
	 getHoliday=function (){
	  	 table.render({
	  		    elem: '#LAY-holiday-manage',
	  		    url:url+'/HolderLeave/getList',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"curpage",
	  		    	limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	state:"XJ"
	  		    },
	  		    parseData: function(res){ //res 即为原始返回的数据
	  		    	console.log(res);
	  		        return {
	  		          "code": res.flag==true?"0":"", //解析接口状态
	  		          "msg": res.reason, //解析提示文本
	  		          "count": res.count, //解析数据长度
	  		          "data": res.result //解析数据列表
	  		        };
	  		      },
	  		    cols:  [[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  				  {field:'holderno', title:'军人证号', width:120,sort:true},
	  			      {field:'holdername', title:'姓名', width:120,sort:true},
	  			      {field:'unitname', title:'所属单位', width:120,sort:true},
	  			      
	  				  {field:'type', title:'休假类型', width:150,sort:true},
	  				  {field:'createdate', title:'申请时间', width:150,sort:true},
	  				  {field:'statedate', title:'开始时间', width:150,sort:true},
	  				  {field:'enddate', title:'结束时间', width:150,sort:true},
	  				  {field:'approverone', title:'一级审批人', width:150,sort:true},
	  				  {field:'approvertwo', title:'二级审批人', width:150,sort:true},
	  				  {field:'applystatus', title:'状态', width:150,sort:true,templet:function(d){
				    	  if(d.applystatus == '10'){
				    		  return "已申请";
				    	  }else if(d.applystatus =="20" ){
				    		  return "一级审批同意";
				    	  }else if(d.applystatus =="21" ){
				    		  return "一级审批驳回";
				    	  }else if(d.applystatus =="30" ){
				    		  return "审批成功";
				    	  }else if(d.applystatus =="31" ){
				    		  return "二级审批驳回";
				    	  }else{
				    		  return "";
				    	  }
				      }},
	  				  //{field:'remark', title:'备注', width:150,sort:true},
	  				  //{field:'flowtracing', title:'流程追踪', width:150,sort:true},
	  				  {fixed: 'right', title:'操作',width:250, templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='agree'>同意</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='refuse'>驳回</a>";
						  var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
						  return $a1+$a2+$a3+$a4;
					  }},
	  			    ]],
	  			    page: true,
	  			  done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //加班申请
	 getOvertime=function (){
	  	 table.render({
	  		    elem: '#LAY-overtime-manage',
	  		    url:url+'/HolderLeave/getList',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"curpage",
	  		    	limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	state:"JB"
	  		    },
	  		    parseData: function(res){ //res 即为原始返回的数据
	  		    	console.log(res);
	  		        return {
	  		          "code": res.flag==true?"0":"", //解析接口状态
	  		          "msg": res.reason, //解析提示文本
	  		          "count": res.count, //解析数据长度
	  		          "data": res.result //解析数据列表
	  		        };
	  		      },
	  		    cols:  [[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  				  {field:'holderno', title:'军人证号', width:120,sort:true},
	  			      {field:'holdername', title:'姓名', width:120,sort:true},
	  			      {field:'unitname', title:'所属单位', width:120,sort:true},
	  				  {field:'type', title:'加班事由', width:150,sort:true},
	  				  {field:'reason', title:'具体原因', width:150,sort:true},
	  				  {field:'createdate', title:'申请时间', width:150,sort:true},
	  				  {field:'startdate', title:'开始时间', width:150,sort:true},
	  				  {field:'enddate', title:'结束时间', width:150,sort:true},
	  				  {field:'approverone', title:'一级审批人', width:150,sort:true},
	  				  {field:'approvertwo', title:'二级审批人', width:150,sort:true},
	  				  {field:'applystatus', title:'状态', width:150,sort:true,templet:function(d){
				    	  if(d.applystatus == '10'){
				    		  return "已申请";
				    	  }else if(d.applystatus =="20" ){
				    		  return "一级审批同意";
				    	  }else if(d.applystatus =="21" ){
				    		  return "一级审批驳回";
				    	  }else if(d.applystatus =="30" ){
				    		  return "审批成功";
				    	  }else if(d.applystatus =="31" ){
				    		  return "二级审批驳回";
				    	  }else{
				    		  return "";
				    	  }
				      }},
	  				  //{field:'remark', title:'备注', width:150,sort:true},
	  				  //{field:'flowtracing', title:'流程追踪', width:150,sort:true},
	  				  {fixed: 'right', title:'操作',width:250, templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='agree'>同意</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='refuse'>驳回</a>";
						  var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
						  return $a1+$a2+$a3+$a4;
					  }},
	  			    ]],
	  			    page: true,
	  			  done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //其他申请
	 getOther=function (){
	  	 table.render({
	  		    elem: '#LAY-other-manage',
	  		    url:url+'/HolderLeave/getList',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"curpage",
	  		    	limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	state:"QT"
	  		    },
	  		    parseData: function(res){ //res 即为原始返回的数据
	  		    	console.log(res);
	  		        return {
	  		          "code": res.flag==true?"0":"", //解析接口状态
	  		          "msg": res.reason, //解析提示文本
	  		          "count": res.count, //解析数据长度
	  		          "data": res.result //解析数据列表
	  		        };
	  		      },
	  		    cols:  [[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'holderno', title:'军人证号', width:120,sort:true},
	  			      {field:'holdername', title:'姓名', width:120,sort:true},
	  			      {field:'unitname', title:'所属单位', width:120,sort:true},
	  				  {field:'reason', title:'申请内容', width:150,sort:true},
	  				  {field:'createdate', title:'申请时间', width:150,sort:true},
	  				  {field:'startdate', title:'开始时间', width:150,sort:true},
	  				  {field:'enddate', title:'结束时间', width:150,sort:true},
	  				  {field:'approverone', title:'一级审批人', width:150,sort:true},
	  				  {field:'approvertwo', title:'二级审批人', width:150,sort:true},
	  				  {field:'applystatus', title:'状态', width:150,sort:true,templet:function(d){
				    	  if(d.applystatus == '10'){
				    		  return "已申请";
				    	  }else if(d.applystatus =="20" ){
				    		  return "一级审批同意";
				    	  }else if(d.applystatus =="21" ){
				    		  return "一级审批驳回";
				    	  }else if(d.applystatus =="30" ){
				    		  return "审批成功";
				    	  }else if(d.applystatus =="31" ){
				    		  return "二级审批驳回";
				    	  }else{
				    		  return "";
				    	  }
				      }},
	  				  //{field:'remark', title:'备注', width:150,sort:true},
	  				  //{field:'flowtracing', title:'流程追踪', width:150,sort:true},
	  				  {fixed: 'right', title:'操作',width:250, templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='agree'>同意</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='refuse'>驳回</a>";
						  var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
						  return $a1+$a2+$a3+$a4;
					  }},
	  			    ]],
	  			    page: true,
	  			  done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  
	  //监听工具条  请假申请
	  table.on('tool(LAY-leave-manage)', function(obj){
	  		var data = obj.data;
	        if(obj.event === 'del'){
			    layer.confirm('确定删除?', function(index){
  				$.ajax({
  					url:url+'/HolderLeave/delete?id='+data.id,
  					type:"POST",
  					success:function(res){
  						layer.close(index);
  						if(res.flag){
  							layer.msg(res.reason,{time:1000},function(){
  								 obj.del();
  							})
  						}else{
  							layer.msg(res.reason,{time:2000});
  						}
  					}
  				})
  			  });
		 }else if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"leave_add.html?id="+data.id+"&watch=0",
					 area:["90%","91%"],
				 })
	  	 }else if(obj.event === 'agree'){
	  		 var obj={"id":data.id,"apply":"agree","loginid":window.top.loginid};
	  		 layer.confirm('确定同意?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }else if(obj.event === 'refuse'){
	  		 var obj={"id":data.id,"apply":"refuse","loginid":window.top.loginid};
	  		 layer.confirm('确定拒绝?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }
	  });
	  
	  
	//监听工具条  出差申请
	  table.on('tool(LAY-business-manage)', function(obj){
	  		var data = obj.data;
	        if(obj.event === 'del'){
			    layer.confirm('确定删除?', function(index){
  				$.ajax({
  					url:url+'/HolderLeave/delete?id='+data.id,
  					type:"POST",
  					success:function(res){
  						layer.close(index);
  						if(res.flag){
  							layer.msg(res.reason,{time:1000},function(){
  								 obj.del();
  							})
  						}else{
  							layer.msg(res.reason,{time:2000});
  						}
  					}
  				})
  			  });
		 }else if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"business_add.html?id="+data.id+"&watch=0",
					 area:["90%","91%"],
				 })
	  	 }else if(obj.event === 'agree'){
	  		 var obj={"id":data.id,"apply":"agree","loginid":window.top.loginid};
	  		 layer.confirm('确定同意?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }else if(obj.event === 'refuse'){
	  		 var obj={"id":data.id,"apply":"refuse","loginid":window.top.loginid};
	  		 layer.confirm('确定拒绝?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }
	  });
	  
	  
	//监听工具条  休假申请
	  table.on('tool(LAY-holiday-manage)', function(obj){
	  		var data = obj.data;
	        if(obj.event === 'del'){
			    layer.confirm('确定删除?', function(index){
  				$.ajax({
  					url:url+'/HolderLeave/delete?id='+data.id,
  					type:"POST",
  					success:function(res){
  						layer.close(index);
  						if(res.flag){
  							layer.msg(res.reason,{time:1000},function(){
  								 obj.del();
  							})
  						}else{
  							layer.msg(res.reason,{time:2000});
  						}
  					}
  				})
  			  });
		 }else if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"holiday_add.html?id="+data.id+"&watch=0",
					 area:["90%","91%"],
				 })
	  	 }else if(obj.event === 'agree'){
	  		 var obj={"id":data.id,"apply":"agree","loginid":window.top.loginid};
	  		 layer.confirm('确定同意?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }else if(obj.event === 'refuse'){
	  		 var obj={"id":data.id,"apply":"refuse","loginid":window.top.loginid};
	  		 layer.confirm('确定拒绝?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }
	  });
	  
	  //监听工具条  加班申请
	  table.on('tool(LAY-overtime-manage)', function(obj){
	  		var data = obj.data;
	        if(obj.event === 'del'){
			    layer.confirm('确定删除?', function(index){
  				$.ajax({
  					url:url+'/HolderLeave/delete?id='+data.id,
  					type:"POST",
  					success:function(res){
  						layer.close(index);
  						if(res.flag){
  							layer.msg(res.reason,{time:1000},function(){
  								 obj.del();
  							})
  						}else{
  							layer.msg(res.reason,{time:2000});
  						}
  					}
  				})
  			  });
		 }else if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"overtime_add.html?id="+data.id+"&watch=0",
					 area:["90%","91%"],
				 })
	  	 }else if(obj.event === 'agree'){
	  		 var obj={"id":data.id,"apply":"agree","loginid":window.top.loginid};
	  		 layer.confirm('确定同意?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }else if(obj.event === 'refuse'){
	  		 var obj={"id":data.id,"apply":"refuse","loginid":window.top.loginid};
	  		 layer.confirm('确定拒绝?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }
	  });
	  
	//监听工具条  其他申请
	  table.on('tool(LAY-other-manage)', function(obj){
	  		var data = obj.data;
	        if(obj.event === 'del'){
			    layer.confirm('确定删除?', function(index){
  				$.ajax({
  					url:url+'/HolderLeave/delete?id='+data.id,
  					type:"POST",
  					success:function(res){
  						layer.close(index);
  						if(res.flag){
  							layer.msg(res.reason,{time:1000},function(){
  								 obj.del();
  							})
  						}else{
  							layer.msg(res.reason,{time:2000});
  						}
  					}
  				})
  			  });
		 }else if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"other_add.html?id="+data.id+"&watch=0",
					 area:["90%","91%"],
				 })
	  	 }else if(obj.event === 'agree'){
	  		 var obj={"id":data.id,"apply":"agree","loginid":window.top.loginid};
	  		 layer.confirm('确定同意?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }else if(obj.event === 'refuse'){
	  		 var obj={"id":data.id,"apply":"refuse","loginid":window.top.loginid};
	  		 layer.confirm('确定拒绝?', function(index){
 				$.ajax({
 					url:url+'/HolderLeave/update',
 					type:"POST",
 					data:obj,
 					success:function(res){
 						layer.close(index);
 						if(res.flag){
 							layer.msg(res.reason,{time:1000},function(){
 								 obj.del();
 							})
 						}else{
 							layer.msg(res.reason,{time:2000});
 						}
 					}
 				})
 			  });
	  	 }
	  });
	  

	//点击选项卡
	  $(".main-tab .label").click(function(){
		  	$(this).addClass("curr").siblings().removeClass("curr");
		  	var index=$(this).index();
		  	$(".layui-card-body").eq(index).show().siblings(".layui-card-body").hide();
		  	if(index == 0){//请假申请
		  		getLeave();
		  	}else if(index == 1){//出差申请
		  		getBusiness();
		  	}else if(index == 2){//休假申请
		  		getHoliday();
		  	}else if(index == 3){//加班申请
		  		getOvertime();
		  	}else if(index == 4){//其它申请
		  		getOther();
		  	}
	  })
	  
})
//点击新增
$("#add").click(function(){
	 var index=$(".main-tab .label.curr").index();
    if(index == 0){//请假申请
    	layer.open({
    		type:2,
    		title:"请假申请",
    		content:"leave_add.html",
    		area:["90%","92%"]
    	})
    }else if(index == 1){//出差申请
    	layer.open({
    		type:2,
    		title:"出差申请",
    		content:"business_add.html",
    		area:["90%","92%"]
    	})
    }else if(index ==2){//休假申请
    	layer.open({
    		type:2,
    		title:"休假申请",
    		content:"holiday_add.html",
    		area:["90%","92%"]
    	})
    }else if(index == 3){//加班申请
    	layer.open({
    		type:2,
    		title:"加班申请",
    		content:"overtime_add.html",
    		area:["90%","92%"]
    	})
    }else if(index == 4){//其它申请
    	layer.open({
    		type:2,
    		title:"其它申请",
    		content:"other_add.html",
    		area:["90%","92%"]
    	})
    }
})

//点击打印
$("#print").click(function(){
	var index=$(".main-tab").find(".label.curr").index();
	if(index == 0){//请假申请
		print("LAY-leave-manage");
	}else if(index == 1){//出差申请
		print("LAY-business-manage");
	}else if(index == 2){//休假申请
		print("LAY-holiday-manage");
	}else if(index == 3){//加班申请
		print("LAY-overtime-manage");
	}else if(index == 4){//其它申请
		print("LAY-other-manage");
	}
})
