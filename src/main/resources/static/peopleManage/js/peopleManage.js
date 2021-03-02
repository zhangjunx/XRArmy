if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
}
var otherMan;
var exportData;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	 
	 lay('.date').each(function() {
			laydate.render({
				elem : this,// 元素
				trigger : 'click',// 怎么触发
			});
	 });
	// 初始化现役军人列表
	 serviceMan();
	// 点击标题选项卡
	 $(".main-tab .label").click(function(){
	 	$(this).addClass("curr").siblings().removeClass("curr");
	 	var index=$(this).index();
	 	$(".layui-con").eq(index).show().siblings(".layui-con").hide();
	 	if(index == 0){// 现役军人
	 		serviceMan();
	 	}else if(index == 1){// 其他人员
	 		otherMan();
	 	}
	 })
	  // 监听搜索 现役军人
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    field.state=0;
	    // 执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	// 监听搜索 其他人员
	  form.on('submit(otherPeople)', function(data){
	    var field = data.field;
	    field.state=1;
	    // 执行重载
	    table.reload('LAY-other-manage', {
	      where: field
	    });
	  });
	  
	  // 导出
	  $("#export").click(function(){
		  var index=$(".main-tab").find(".label.curr").index();
		  for(var item of exportData){// 解决导出时身份证号变成e+17
			  item.idcode+="\t";
		  }
		  if(index == 0){
			  table.exportFile("LAY-user-manage",exportData, "xls");
		  }else if(index == 1){
			  table.exportFile("LAY-other-manage",exportData, "xls");
		  }
      })
	  // 现役军人列表
	  function serviceMan(){
		  table.render({
			    elem: '#LAY-user-manage',
			    url:url+'/HolderData/getList',
			    cellMinWidth: 80,
			    height: "full-232",
			    title:"现役军人",
			   method:"POST",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":0
			   },
			   parseData: function(res){ // res 即为原始返回的数据
			   	console.log(res);
			       return {
			         "code": res.flag==true?"0":"", // 解析接口状态
			         "msg": res.reason, // 解析提示文本
			         "count": res.count, // 解析数据长度
			         "data": res.result // 解析数据列表
			       };
			     },
			    cols:  [[
			    	  {type:"checkbox"},
			    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'军人证号', width:200,sort:true},
					  {field:'holdername', title:'姓名', width:150},
					  {field:'sexname', title:'性别', width:150,sort:true,templet:function(d){
				    	  if(d.sexname == 1){
				    		  return "男";
				    	  }else if(d.sexname == 2){
				    		  return "女";
				    	  }else{
				    		  return d.sexname;
				    	  }
				      }},
				      {field:'unitname', title:'所属单位', width:150,sort:true},
				      {field:'idcode', title:'身份证号', width:200,sort:true},
				      // {field:'personnel_sex', title:'具体单位',
					  {field:'titleno', title:'职务', width:150,sort:true},
					  {field:'rank', title:'军衔', width:150,sort:true},
					  {field:'startdate', title:'入伍日期', width:200,sort:true},
					  {field:'enddate', title:'退伍日期', width:200,sort:true},
					  {field:'photo', title:'照片', width:200,sort:true,templet:function(d){
					      var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					      return "<img src="+photo+" style='height:60px;object-fit:contain'>";
					  }},
				      {fixed: 'right', title:'操作', width:350,templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >编辑</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray' >退伍</a>";
						  var $a4="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>设置门禁权限组</a>";
						  var $a5="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>调动</a>";
						  
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "编辑"){//编辑
									  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
								  }else if(item == "退伍"){//退伍
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='retire'>退伍</a>";
								  }else if(item == "设置门禁权限组"){//设置门禁权限组
									  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs ' lay-event='setPermission'>设置门禁权限组</a>";
								  }else if(item == "调动"){//调动
									  $a5="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='addTransfer'>调动</a>";
								  }
							  }
						  }else{
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='retire'>退伍</a>";
							  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs ' lay-event='setPermission'>设置门禁权限组</a>";
							  $a5="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='addTransfer'>调动</a>";
						  }
						  
						  return $a1+$a2+$a3+$a5+$a4;
					  }},
				    ]],
			    page: true,
			    limit:15,
				limits:[15,20,30,40,50,60,70,80,90],
				done: function (res, curr, count) {
					exportData=res.data;
					//动态监听表体高度变化，冻结行跟着改变高度
			        $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").resize(function () {
			            $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").each(function (index, val) {
			                $($(".layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			            });
			        });
			        //初始化高度，使得冻结行表体高度一致
			        $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").each(function (index, val) {
			            $($(".layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			        });
				}
			  });
	  }
	  // 其他人员列表
	  otherMan=function(){
		  table.render({
			   elem: '#LAY-other-manage',
			   url:url+'/HolderData/getList',
			   cellMinWidth: 80,
			   height: "full-232",
			   method:"POST",
			   title:"其他人员",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":1
			   },
			   parseData: function(res){ // res 即为原始返回的数据
			   	console.log(res);
			       return {
			         "code": res.flag==true?"0":"", // 解析接口状态
			         "msg": res.reason, // 解析提示文本
			         "count": res.count, // 解析数据长度
			         "data": res.result // 解析数据列表
			       };
			     },
			    cols:  [[
			    	  {type:"checkbox"},
			    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'编号', width:200},
					  {field:'holdername', title:'姓名', width:150},
				      {field:'sexname', title:'性别', width:150,sort:true,templet:function(d){
				    	  if(d.sexname == 1){
				    		  return "男";
				    	  }else if(d.sexname == 2){
				    		  return "女";
				    	  }else{
				    		  return d.sexname;
				    	  }
				      }},
				      {field:'unitname', title:'所属单位', width:200,sort:true},
				      // {field:'personnel_sex', title:'具体单位',
					  {field:'emptype', title:'人员类别', width:150,sort:true},
					  {field:'idcode', title:'身份证号', width:200,sort:true},
					  {field:'photo', title:'照片', width:200,sort:true,templet:function(d){
					      var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					      return "<img src="+photo+" style='height:60px;object-fit:contain'>";
					  }},
					  {field:'createdate', title:'录入日期', width:200,sort:true},
				      {fixed: 'right', title:'操作', width:350,templet:function(){
						  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  var $a4="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>设置门禁权限组</a>";
						  if(window.top.loginid != "administrator"){
							 for(var item of window.top.arr){
								 if(item == "编辑"){//编辑
									 $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
								 }else if(item == "删除"){//删除
									 $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
								 }else if(item == "设置门禁权限组"){//设置门禁权限组
									 $a4="<a class='layui-btn layui-btn-warm layui-btn-xs ' lay-event='setPermission'>设置门禁权限组</a>";
								 }
							 }
						  }else{
							  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
							  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
							  var $a4="<a class='layui-btn layui-btn-warm layui-btn-xs ' lay-event='setPermission'>设置门禁权限组</a>";
						  }
						  return $a1+$a2+$a3+$a4;
					  }},
				    ]],
				page: true,
			    limit:15,
				limits:[15,20,30,40,50,60,70,80,90],
				done: function (res, curr, count) {
					exportData=res.data;
					//动态监听表体高度变化，冻结行跟着改变高度
			        $("div[lay-id='LAY-other-manage'] .layui-table-body  tr").resize(function () {
			            $("div[lay-id='LAY-other-manage'] .layui-table-body  tr").each(function (index, val) {
			                $($("div[lay-id='LAY-other-manage'] .layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			            });
			        });
			        //初始化高度，使得冻结行表体高度一致
			        $("div[lay-id='LAY-other-manage'] .layui-table-body  tr").each(function (index, val) {
			            $($("div[lay-id='LAY-other-manage'] .layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			        });
				}
			  });
	  }
		  // 监听工具条 现役军人
		  table.on('tool(LAY-user-manage)', function(obj){
		  			var data = obj.data;
		   if(obj.event === 'retire'){
			   $("#reason").val("");
			   layer.open({
					type:1,
					title:"退伍",
					content:$("#retireBox"),
					area:["60%","62%"],
					btn:["确定","取消"],
					btnAlign:"c",
					yes:function(index){
						var reason=$("#reason").val();
						if(reason == ""){
							layer.msg("请填写退伍原因!",{time:2000});
							return false;
						}
						layer.close(index);
						$.ajax({
		  					url:url+'/HolderRetire/insert',
		  					type:"POST",
		  					data:{"holderno":data.holderno,"reason":reason,"loginid":window.top.loginid},
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
					}
				})
		  	}else if(obj.event === 'watch'){
  				 layer.open({
  					 type:2,
  					 title:"查看",
  					 content:"soldier_add.html?id="+data.holderno+"&watch=0",
  					 area:["90%","91%"],
  				 })
		  	}else if(obj.event === 'edit'){
  				 layer.open({
  					 type:2,
  					 title:"修改",
  					 content:"soldier_add.html?id="+data.holderno,
  					 area:["90%","91%"],
  				 })
		  	}else if(obj.event === 'setPermission'){
				var person_id=data.holderno;
				initGroup(person_id);
				layer.open({
					 type:1,
					 title:"设置门禁权限组",
					 content:$("#layerBox"),
					 area:["60%","61%"],
					 btn:["确定","取消"],
					 btnAlign:"c",
					 yes:function(index){
						 saveInfo(person_id,index);
					 }
				})
			}else if(obj.event === 'addTransfer'){
				$("#unitno").val("");
				$("#unitname3").html("");
				$("#reason2").val("");
				$("#scenePhoto").attr("src","../img/add_img.png");
				getTree();
				// 人事调动
				var id=data.holderno;
				// 注意：unitno 调动后的单位编号,unitname:调动后的单位名称,
				// file:调动资料，可以是图片，Excel文件，pdf等，先按图片，传base64
				layer.open({
					type:1,
					title:"调动",
					content:$("#peopleTransfer"),
					area:["60%","62%"],
					btn:["确定","取消"],
					btnAlign:"c",
					yes:function(index){
						var unitno=$("#unitno").val();
						var unitname=$("#unitname3").html();
						var reason=$("#reason2").val();
						var src=$("#scenePhoto").attr("src");
						if(src.indexOf("data:image") ==-1){
							src="";
						}
						if(unitname == ""){
							layer.msg("请选择调入单位!",{time:2000});
							return false;
						}
						if(reason == ""){
							layer.msg("请填写调动原因!",{time:2000});
							return false;
						}
						var obj={"holderno":id,"unitno":unitno,"unitname":unitname,"reason":reason,"file":src,"loginid":window.top.loginid};
						$.ajax({
							url:url+'/HolderTransfer/add',
							type:"POST",
							data:obj,
							success:function(res){
								console.log(res);
								layer.close(index);
								if(res.flag){
									layer.msg(res.reason,{time:1000},function(){
										 // obj.del();
										$("#LAY-user-front-search").click();
									})
								}else{
									layer.msg(res.reason,{time:2000});
								}
							}
						})
					}
				})
			} 
		  });
		  
		  // 监听工具条 其他人员
		  table.on('tool(LAY-other-manage)', function(obj){
		  			var data = obj.data;
		if(obj.event === 'del'){
  			     layer.confirm('确定删除?', function(index){
	  				$.ajax({
	  					url:url+'/HolderData/delete?holderno='+data.holderno,
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
  					 content:"otherpeople_add.html?id="+data.holderno+"&watch=0",
  					 area:["90%","91%"],
  				 })
		  	}else if(obj.event === 'edit'){
  				 layer.open({
  					 type:2,
  					 title:"修改",
  					 content:"otherpeople_add.html?id="+data.holderno,
  					 area:["90%","91%"],
  				 })
		  	}else if(obj.event === 'setPermission'){
				var personnel_id=data.holderno;
				initGroup(personnel_id);
				layer.open({
					 type:1,
					 title:"设置门禁权限组",
					 content:$("#layerBox"),
					 area:["60%","61%"],
					 btn:["确定","取消"],
					 btnAlign:"c",
					 yes:function(index){
						 saveInfo(personnel_id,index);
					 }
				})
			}
		  });
})

// 点击新增
 $('#add').click(function(){
	 var id=$(".main-tab .curr").attr("data-id");
	 if(id == 1){// 现役军人
		 layer.open({
			 type:2,
			 title:"添加人员",
			 content:"soldier_add.html",
			 area:["90%","91%"],
		 })
	 }else if(id == 2){// 其他人员
		 layer.open({
			 type:2,
			 title:"添加人员",
			 content:"otherpeople_add.html",
			 area:["90%","91%"],
		 })
	 }
});


//点击同步查询人员
$('#getPeople').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;
	if(id == 1){// 现役军人
		checkArr= layui.table.checkStatus('LAY-user-manage');
	 }else if(id == 2){// 其他人员
		checkArr= layui.table.checkStatus('LAY-other-manage');
	 }
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/getPeople",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});

//点击同步新增人员
$('#addPeople').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;
	if(id == 1){// 现役军人
		checkArr= layui.table.checkStatus('LAY-user-manage');
	 }else if(id == 2){// 其他人员
		checkArr= layui.table.checkStatus('LAY-other-manage');
	 }
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	if(arr.length==0){
		layer.msg("请选择要添加的行！",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/addPeople",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});

//点击同步更新人员
$('#editPeople').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;
	if(id == 1){// 现役军人
		checkArr= layui.table.checkStatus('LAY-user-manage');
	 }else if(id == 2){// 其他人员
		checkArr= layui.table.checkStatus('LAY-other-manage');
	 }
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	if(arr.length==0){
		layer.msg("请选择要更新的行！",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/editPeople",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});

//点击同步删除人员
$('#delPeople').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;
	if(id == 1){// 现役军人
		checkArr= layui.table.checkStatus('LAY-user-manage');
	 }else if(id == 2){// 其他人员
		checkArr= layui.table.checkStatus('LAY-other-manage');
	 }
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	if(arr.length==0){
		layer.msg("请选择要删除的行！",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/delPeople",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});

// 点击下发人脸权限
$('#addFace').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;
	if(id == 1){// 现役军人
		checkArr= layui.table.checkStatus('LAY-user-manage');
	 }else if(id == 2){// 其他人员
		checkArr= layui.table.checkStatus('LAY-other-manage');
	 }
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	if(arr.length==0){
		layer.msg("请选择要下发人脸权限的人员",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"type":"aa","loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/addFace",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});

// 点击删除人脸权限
$('#delFace').click(function(){
	var id=$(".main-tab .curr").attr("data-id");
	var arr=[];
	var checkArr;;
	if(id == 1){
		checkArr= layui.table.checkStatus('LAY-user-manage');
	}else if(id == 2){
		checkArr= layui.table.checkStatus('LAY-other-manage');
	}
	for(var item of checkArr.data){
		arr.push(item.holderno);
	}
	if(arr.length==0){
		layer.msg("请选择要删除人脸权限的人员",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"type":"dd","loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/addFace",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
		}
	})
});



// 点击打印
$("#print").click(function(){
	var index=$(".main-tab").find(".label.curr").index();
	if(index == 0){
		print("LAY-user-manage");
	}else if(index == 1){
		print("LAY-other-manage");
	}
})


// 点击导入
$("#import").click(function(){
	var index=$(".main-tab").find(".label.curr").index();
	if(index == 0){
		layer.open({
			 type:2,
			 title:"批量导入现役军人",
			 content:"soldierImport.html",
			 area:["90%","91%"],
		})
	}else if(index == 1){
		layer.open({
			 type:2,
			 title:"批量导入其他人员",
			 content:"otherImport.html",
			 area:["90%","91%"],
		})
	}
	
})


// 点击权限组
$(document).on("click",".permissionSet li",function(){
	// $(this).addClass("curr").siblings().removeClass("curr");
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr").siblings().removeClass("curr");
	}
})
// 初始化权限组列表
function initGroup(holderno){
	$.ajax({
		url:url+'/AccessGroupHolder/getGroupList',
	    type:"POST",
	    data:{"holderno":holderno,"loginid":window.top.loginid},
		success:function(res){
			console.log(res);
		   $(".permissionSet").empty();
		   if(res.flag){
			  for(var item of res.result){
				  var groupid=item.groupid==undefined?"":item.groupid;
				 var $li=$("<li data-id="+item.id+">"+item.name+"</li>");
				 if(groupid != ""){
					 $li=$("<li data-id="+item.id+" class='curr'>"+item.name+"</li>");
				 }
				 $(".permissionSet").append($li);
			  }
		   }
		 }
	})
}

// 提交数据
function saveInfo(personnel_id,index){
	var permissionId="";
	if($(".permissionSet li.curr").length != 0){
		permissionId=$(".permissionSet li.curr").attr("data-id");
	}
	var arr=[];
	arr.push(personnel_id);
	var obj={"groupid":permissionId,"str":JSON.stringify(arr),"loginid":window.top.loginid}
	$.ajax({
	   url:url+'/AccessGroupHolder/add',
	   type:"POST",
	   data:obj,
	   success:function(res){
		   console.log(res)
			if(res.flag){
				layer.msg(res.reason,{time:2000},function(){
					layer.close(index);
					layui.use('table',function(){
						var table=layui.table;
						var personnel_name=$("#personnel_name").val();
						var personnel_house_number=$("#personnel_house_number").val();
						var field = {"personnel_name":personnel_name,"personnel_house_number":personnel_house_number};
						// 执行重载
						table.reload('LAY-user-manage', {
						  where: field
						});
					})
					
				})
			}else{
				layer.msg(res.reason,{time:2000});
			}
		 }
	})
}
// 获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			console.log(res)
			if(res.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree",
				        data: res.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	$("#unitno").val(node.data.id);
				        	$("#unitname3").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				        }
				    });
			    	$(".downpanel").on("click", ".layui-select-title", function (e) {
				        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
			    	$(document).on("click", function(e) {
			    		$(".layui-form-select").removeClass("layui-form-selected");
			    	});
				});
			}
		}
	})
}

// 调动资料
$("#sceneFile").change(function(e){
	var imgUrl=this.files[0];
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
         var dataURL = reader.result;// base64
         $("#scenePhoto").attr("src",dataURL);
    };
})