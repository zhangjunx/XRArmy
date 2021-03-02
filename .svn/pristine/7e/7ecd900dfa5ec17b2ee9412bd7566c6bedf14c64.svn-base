layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	  
	  lay('.date').each(function() {
	  	laydate.render({
	  		elem : this,//元素
			type:"datetime",
	  		trigger : 'click',//怎么触发
	  	});
	  });
	  //监听搜索
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  table.render({
		    elem: '#LAY-user-manage',
		   url:url+'/AccessRecord/getList',
		   cellMinWidth: 80,
		   height: "full-232",
		   method:"POST",
		   request:{
		   	pageName:"curpage",
		   	limitName:"pagesize",
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
		    cols: [[
		    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'holderno', title:'人员编号', width:200},
				  {field:'id', title:'记录ID', width:200},
				  {field:'holdername', title:'人员姓名', width:200},
				  {field:'photostr', title:'照片名称', width:200},
				  /*{field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
					  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					  if(photo!="../img/add_img.png" && photo.indexOf("data:image/")==-1){
						  photo="data:image/png;base64,"+d.photo;
					  } 
					  return "<img src="+photo+" style='width:100%;height:100%;object-fit:contain'>";
				  }},*/
			      {field:'updatedate', title:'下发时间', width:200,sort:true},
				  {field:'state', title:'下发状态', width:200,sort:true,templet:function(d){
					  if(d.state=="0"){
						  return "未下发";
					  }else if(d.state=="1"){
						  return "已下发";
					  }else if(d.state=="2"){
						  return "待下发";
					  }else{
						  return "";
					  }
				  }},
				  {field:'message', title:'下发状态信息', width:200,sort:true},
				  {field:'type', title:'下发类型', width:150,sort:true,templet:function(d){
					  if(d.type=="aa"){
						  return "新增";
					  }else if(d.type=="uu"){
						  return "修改";
					  }else if(d.type=="dd"){
						  return "删除";
					  }else{
						  return "";
					  }
				  }},
				  {field:'boxip', title:'盒子IP', width:200,sort:true},
				  {field:'ip', title:'设备IP', width:200,sort:true},
				  {field:'port', title:'设备端口', width:200,sort:true},
				  {field:'channelname', title:'通道名称', width:200,sort:true},
				  {field:'doorname', title:'门区位置', width:300,sort:true},
				  {field:'devicesn', title:'设备sn', width:300,sort:true},
				  {field:'devicename', title:'设备名称', width:250,sort:true},
				  {fixed: 'right', title:'操作',width:250, templet:function(d){
					  //var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>下发权限</a>";
					  //var $a2="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					  if(d.type=="aa" ){
						  if(d.state=="1"){
							  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  }else{
							  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>下发权限</a>";
						  }
						  
					  }
					  if(d.type=="dd"){
						  if(d.state=="1"){
							  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>下发权限</a>";
						  }else{
							  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  }
						  
					  }
					  
					  if(window.top.loginid != "administrator"){
						  for(var item of window.top.arr){
							  if(item == "下发权限"){//下发
								  if(d.type=="aa" ){
									  if(d.state=="1"){
										  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs '>移除权限</a>";
									  }else{
										  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs'>下发权限</a>";
									  }
								  }
								  //$a1="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='add'>下发权限</a>";
							  }else if(item == "移除权限"){//移除
								  if(d.type=="dd"){
									  if(d.state=="1"){
										  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs '>下发权限</a>";
									  }else{
										  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs '>移除权限</a>";
									  }
									  
								  }
								  //$a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
							  }else if(item == "删除"){//删除
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
							  }
						  }
					  }else{
						  $a1="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='add'>下发权限</a>";
						  $a2="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
						  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
						  if(d.type=="aa" ){
							  if(d.state=="1"){
								  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs '>移除权限</a>";
							  }else{
								  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs '>下发权限</a>";
							  }
							  
						  }
						  if(d.type=="dd"){
							  if(d.state=="1"){
								  var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs '>下发权限</a>";
							  }else{
								  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs'>移除权限</a>";
							  }
						  }
						  
					  }
					  return $a1+$a3;
				  }},
			    ]],
		     page: true,
		     limit:15,
			 limits:[15,20,30,40,50,60,70,80,90]
		  });
	  
	  
	  //监听工具条
	  table.on('tool(LAY-user-manage)', function(obj){
	  			var data = obj.data;
	      if(obj.event === 'delete'){
			  layer.confirm('确定删除?', function(index){
				$.ajax({
					url:url+'/AccessRecord/delete',
					type:"POST",
					data:{"id":data.id,"loginid":window.top.loginid},
					success:function(res){
						console.log(res)
						layer.close(index);
						layer.msg(res.reason,{time:2000},function(){
							window.location.reload();
						});
					}
				})
			  });
			}else if(obj.event === 'add'){
				layer.confirm('确定下发权限?', function(index){
					$.ajax({
						//url:url+'/PlatBox/faceAdd',
						url:url+'/PlatBox/setFace',
						type:"POST",
						data:{"id":data.id,"type":"aa","loginid":window.top.loginid},
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000});
						}
					})
				  });
			}else if(obj.event === 'del'){
				layer.confirm('确定移除权限?', function(index){
					$.ajax({
						//url:url+'/PlatBox/faceDel',
						url:url+'/PlatBox/setFace',
						type:"POST",
						data:{"id":data.id,"type":"dd","loginid":window.top.loginid},
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000});
						}
					})
				  });
			}
	  });
})

 
