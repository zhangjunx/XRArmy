if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$(".add[data-id="+item+"]").show();
	}
}
initModel();
layui.use("layer",function(){
	var layer=layui.layer;
	
})
function initTable(id){
	layui.use(["form","table"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table;
		
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
			    url:carUrl+'car/approveModel/getModelListMem',
			    cellMinWidth: 80,
			    height: "full-140",
			    method:"POST",
			    request:{
			    	 pageName:"curpage",
	  			     limitName:"pagesize",
			    },
			    where:{
			    	"modelID":id,
			    	"approverName":""
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
					  {field:'modelName', title:'模板名称', width:200},
				      {field:'approverName', title:'审批人名称', width:200,sort:true},
				      {field:'approveLevel', title:'审批级别', width:200,sort:true},
				      {field:'remark', title:'备注', sort:true},
				      {fixed: 'right', title:'操作',width:200, templet:function(d){
				    	  var  $a3="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>编辑</a>";
						  var  $a4="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  if(window.top.loginid!="administrator"){
							  for(var item of window.top.arr){
								  if(item=="编辑"){
									  $a3="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='edit'>编辑</a>";
								  }else if(item=="删除"){
									  $a4="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
								  }
							  }
						  }else{
							  $a3="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='edit'>编辑</a>";
							  $a4="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
						  }
						  
						  return $a3+$a4;
					  }},
				    ]],
				    page: true,
				    limit:15,
					limits:[15,20,30,40,50,60,70,80,90],
			  });
			  //监听工具条
			  table.on('tool(LAY-user-manage)', function(obj){
				  var data = obj.data;
			  if(obj.event === 'del'){
	  				layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:carUrl+'car/approveModel/delModelInfoMem',
		  					type:"POST",
		  					data:{"fid":data.fid,},
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
		  		}else if(obj.event === 'edit'){
		  			layer.open({
		  				type:2,
		  				title:"修改审批人",
		  				area:["90%","92%"],
		  				content:"model_add.html?id="+data.modelID+"&fid="+data.fid,
		  			})
		  		}
			  });
	})
}


//点击新增模板
 $('#addModel').click(function(){
	 layer.open({
		 type:1,
		 title:"添加模板",
		 content:$("#modelBox"),
		 area:["50%","51%"],
		 btn:["确定","取消"],
		 btnAlign:'c',
		 yes:function(index){
			 if($("#modelName").val() == ""){
				 layer.msg("填填写模板名称!",{time:2000});
				 return;
			 }
			 saveModelInfo(index);
		 }
	 })
});
//点击编辑模板
$("#editModel").click(function(){
	if($("#passList li.curr").length == 0){
		layer.msg("请选择模板!",{time:2000});
		return;
	}
	var id=$("#passList li.curr").attr("data-id");
	getOneModel(id);
	 layer.open({
		 type:1,
		 title:"修改模板",
		 content:$("#modelBox"),
		 area:["50%","51%"],
		 btn:["确定","取消"],
		 btnAlign:'c',
		 yes:function(index){
			 saveModelInfo(index);
		 }
	 })
})
//提交模板数据
function saveModelInfo(index){
	 var fid=$("#fid").val();
	 var modelName=$("#modelName").val();
	 var remark=$("#remark").val();
	 $.ajax({
		 url:carUrl+"car/approveModel/addModelInfo",
		 type:"POST",
		 data:{"fid":fid,"modelName":modelName,"remark":remark},
		 success:function(res){
			 layer.close(index);
			 $("#fid").val("");
			 $("#modelName").val("");
			 $("#remark").val("");
			if(res.result){
				layer.msg(res.msg,{time:1000},function(){
					initModel();
				})
			}else{
				layer.msg(res.msg,{time:2000})
			}
		 }
	 })
}
//获取一条模板数据
function getOneModel(fid){
	$.ajax({
		url:carUrl+"car/approveModel/getOneModel",
		type:"POST",
		data:{"fid":fid},
		success:function(res){
			console.log(res);
			if(res.result){
				$("#fid").val(res.data.fid);
				$("#modelName").val(res.data.modelName);
				$("#remark").val(res.data.remark);
			}
		}
	})
}

//点击模板
$(document).on("click","#passList li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	var id=$(this).attr("data-id");
	initTable(id);
})
//双击模板删除
$(document).on("dblclick","#passList li",function(){
	var id=$(this).attr("data-id");
	layer.confirm("确定删除?",function(index){
			$.ajax({
				url:carUrl+'car/approveModel/delModelInfo',
				type:"POST",
				data:{"fid":id,},
				success:function(res){
					layer.close(index);
					if(res.result){
						layer.msg(res.msg,{time:1000},function(){
							initModel();
						})
					}else{
						layer.msg(res.msg,{time:2000});
					}
				}
			})
	})
})
//点击添加审批人
$("#add").click(function(){
	if($("#passList li.curr").length == 0){
		layer.msg("请选择模板!",{time:2000});
		return;
	}
	var id=$("#passList li.curr").attr("data-id");
	 layer.open({
		 type:2,
		 title:"添加审批人",
		 content:"model_add.html?id="+id,
		 area:["90%","91%"],
	 })
})

//获取模板列表
function initModel(){
	$.ajax({
		url:carUrl+"car/approveModel/getModelList",
		type:"POST",
		data:{"modelName":""},
		success:function(res){
			console.log(res);
			$("#passList").empty();
			if(res.result){
				for(var item of res.data){
					var $li=$("<li data-id="+item.fid+">"+item.modelName+"</li>");
					$("#passList").append($li);
				}
			}
		}
	})
}
