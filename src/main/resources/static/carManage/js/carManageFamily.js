initTable();
function initTable(){
	layui.use(["form","table"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table;
		
		  //监听搜索
		  form.on('submit(LAY-user-front-search)', function(data){
		    var field = data.field;
		    field.thisUserID = window.top.loginid;
		    //执行重载
		    table.reload('LAY-family-manage', {
		      where: field
		    });
		  });
		  table.render({
			    elem: '#LAY-family-manage',
			    url:carUrl+'car/carManagerFamily/getCarList',
			    cellMinWidth: 80,
			    height: "full-232",
			    method:"POST",
			    request:{
			    	 pageName:"curpage",
	  			     limitName:"pagesize",
			    },
			    where:{
			    	"thisUserID":window.top.loginid,
			    	"carNum":"",
			    	"ownerName":"",
			    	"soldierName":"",
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
			    cols:[[
			    	  {field:'ID', title:'序号', width:80,height:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'parkName', title:'停车场', width:200,sort:true},
					  {field:'carNum', title:'车牌号', width:150},
					  {field:'imgPath', title:'图片', width:150,templet:function(d){
						  if(d.imgPath == null || d.imgPath == ''){
							  return "";
						  }else{
							  return "<image style ='height:60px;object-fit:contain' src='"+carUrl+d.imgPath+"'></image>";
						  }
					  }},
					  {field:'soldierName', title:'服役家属', width:150},
					  {field:'ownerName', title:'车主', width:150},
					  {field:'phoneNum', title:'联系电话', width:120},
					  {field:'carType', title:'车型', width:150},
					  {field:'remark', title:'备注'},
				      {fixed: 'right', title:'操作',width:200,templet:function(){
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "编辑"){//编辑
									  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
								  }else if(item == "删除"){//删除
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
								  }
							  }
						  }else{
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
						  }
						  
						  return $a2+$a3;
					  }},
				    ]],
				    page: true,
				    limit:15,
					limits:[15,20,30,40,50,60,70,80,90],
		  });
		  //监听工具条
		  table.on('tool(LAY-family-manage)', function(obj){
			  var data = obj.data;
			  if(obj.event === 'del'){
	  			  layer.confirm('确定删除?', function(index){
	  				$.ajax({
	  					url:carUrl+'car/carManagerFamily/delOneInfo',
	  					type:"POST",
	  					data:{"fid":data.fid,"thisUserID":window.top.loginid},
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
	  					 content:"carManageFamily_add.html?id="+data.fid,
	  					 area:["90%","91%"],
	  				 })
	  			}
		  });
	})
}


//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加车辆",
		 content:"carManageFamily_add.html",
		 area:["90%","91%"],
	 })
});
//点击打印
$("#print").click(function(){
	printTable();
})
//打印方法
function printTable(){
	print("LAY-family-manage");
}
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"carImportFamily.html",
		 area:["90%","91%"],
	})
})