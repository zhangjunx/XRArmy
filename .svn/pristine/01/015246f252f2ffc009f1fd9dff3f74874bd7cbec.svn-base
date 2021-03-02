initTable();
function initTable(){
	layui.use(["form","table","laydate"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table,
		  laydate=layui.laydate;
		
		 //执行一个laydate实例
		  laydate.render({
		    elem: '#startDate' //指定元素
		  });
		  laydate.render({
		    elem: '#endDate' //指定元素
		  });
		 
		  //监听搜索
		  form.on('submit(LAY-user-front-search)', function(data){
		    var field = data.field;
		    field.thisUserID = window.top.loginid;
		    //执行重载
		    table.reload('LAY-freeCar-manage', {
		      where: field
		    });
		  });
		  table.render({
			    elem: '#LAY-freeCar-manage',
			    url:carUrl+'car/carManager/getCarList',
			    cellMinWidth: 80,
			    height: "full-232",
			    method:"POST",
			    request:{
			    	 pageName:"curpage",
	  			     limitName:"pagesize",
			    },
			    where:{
			    	"thisUserID":window.top.loginid,
			    	"carStatus":$("#carNum").val(),
			    	"carNum":"",
			    	"useDept":"",
			    	"startDate":"",
			    	"endDate":"",
			    	"ifPrivateUse":1
			    },
			    parseData: function(res){ //res 即为原始返回的数据
			    	console.log(res);
			        return {
			          "code": res.result==true?"0":"", //解析接口状态
			          "msg": res.msg, //解析提示文本
			          "count": res.count, //解析数据长度
			          "data": res.data //解析数据列表
			        };
			      },
			    cols:  [[
			    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'carNum', title:'车牌号', width:250},
				      {field:'parkName', title:'停车场', width:250,sort:true},
					  {field:'purpose', title:'车辆用途', width:250,sort:true},
					  {field:'startDate', title:'有效期开始时间', width:250,sort:true},
					  {field:'endDate', title:'有效期结束时间', sort:true},
				      {fixed: 'right', title:'操作',width:200,templet:function(){
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  var $a4="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>报废</a>";
						  
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "编辑"){//编辑
									  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
								  }else if(item == "删除"){//删除
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
								  }else if(item == "报废"){//报废
									  $a4="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='dumping'>报废</a>";
								  }
							  }
						  }else{
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
							  $a4="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='dumping'>报废</a>";
						  }
						  
						  return $a2+$a4+$a3;
					  }},
				    ]],
				    page: true,
				    limit:15,
					limits:[15,20,30,40,50,60,70,80,90],
				
			  });
			  //监听工具条
			  table.on('tool(LAY-freeCar-manage)', function(obj){
			  			var data = obj.data;
			   if(obj.event === 'del'){
		  			  layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:carUrl+'car/carManager/delOneInfo',
		  					type:"POST",
		  					data:{"fid":data.fid,"ifPrivateUse":data.ifPrivateUse,"thisUserID":window.top.loginid},
		  					success:function(res){
		  						layer.close(index);
		  						if(res.result){
		  							layer.msg(res.msg,{time:1000},function(){
		  								 obj.del();
		  							})
		  						}else{
		  							layer.msg(res.msg,{time:2000});
		  						}
		  					}
		  				})
		  			  });
		  			} else if(obj.event === 'edit'){
		  				 layer.open({
		  					 type:2,
		  					 title:"修改",
		  					 content:"freeCar_add.html?id="+data.fid,
		  					 area:["90%","91%"],
		  				 })
		  			}else if(obj.event === 'dumping'){
		  				layer.confirm('确定报废?', function(index){
			  				$.ajax({
			  					url:carUrl+'car/carManager/carScrap',
			  					type:"POST",
			  					data:{"fid":data.fid,"ifPrivateUse":data.ifPrivateUse,"status":-1,"thisUserID":window.top.loginid},
			  					success:function(res){
			  						layer.close(index);
			  						if(res.result){
			  							layer.msg(res.msg,{time:1000},function(){
			  								obj.del();
			  							})
			  						}else{
			  							layer.msg(res.msg,{time:2000});
			  						}
			  					}
			  				})
			  			  });
		  			}
			  });
	})
}



//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加免派车辆",
		 content:"freeCar_add.html",
		 area:["90%","91%"],
	 })
});
//点击打印
$("#print").click(function(){
	printTable();
})
//打印方法
function printTable(){
	print("LAY-freeCar-manage");
}
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"carImportFree.html",
		 area:["90%","91%"],
	})
})
