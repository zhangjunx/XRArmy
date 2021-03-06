if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
initBox();
layui.use(["layer","form"],function(){
	 var layer = layui.layer;
	 var form = layui.form;
})
function initTable(arr){
	layui.use(["form","table","laydate"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table,
		  laydate = layui.laydate;
		  
		 table.render({
			    elem: '#LAY-user-manage',
			    cellMinWidth: 80,
			    height: "full-205",
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
			    cols:  [[
			    	  {field:'ID', title:'序号', width:100, sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:200,sort:true},
					  {field:'holdername', title:'人员名称', width:200,sort:true},
					  {field:'photostr', title:'人员照片', width:200,sort:true},
					  {field:'boxip', title:'盒子IP'},
					  {field:'synstatus', title:'同步状态', width:200},
				      {fixed: 'right', title:'操作',width:200,templet:function(d){
						  var $a2="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray' >取消同步</a>";
						  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >同步</a>";
						  if(d.synstatus == "更新" || d.synstatus == "删除"){
							  $a3="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >同步</a>";
						  }
						  if(window.top.loginid!="administrator"){
							  for(var item of window.top.arr){
								 if(item=="同步"){
									  $a2="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>取消同步</a>";
									  if(d.synstatus == "更新" || d.synstatus == "删除"){
										  $a3="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='async'>同步</a>";
									  }
								  }
							  }
						  }else{
							  $a2="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>取消同步</a>";
							  $a3="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >同步</a>";
							  if(d.synstatus == "更新" || d.synstatus == "删除"){
								  $a3="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='async'>同步</a>";
							  }
						  }


						  return $a2+$a3;
					  }},
				    ]],
			      page: true,
				  limit:15,
			      limits:[15,20,30,40,50,60,70,80,90],
			      data:arr
			  });
		 
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
		  			var data = obj.data;
				   if(obj.event === 'del'){
			  			  layer.confirm('确定取消?', function(index){
			  				  var obj1={"id":data.id,"state":"0","boxip":data.boxip,"boxid":data.boxid,
			  						"boxname":data.boxname,"holderno":data.holderno,
			  						"type":"dd","loginid":window.top.loginid};
			  				$.ajax({
			  					url:url+'/SynBoxRecord/delete',
			  					type:"POST",
			  					data:obj1,
			  					success:function(res){
			  						layer.close(index);
			  						console.log(res)
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
				   }else if(obj.event === 'async'){
			  			  layer.confirm('确定同步?', function(index){
			  				  var type="";
			  				  if(data.synstatus == "更新"){
			  					type="uu";
			  				  }else if(data.synstatus == "删除"){
			  					type="dd";
			  				  }
			  				  var obj1={"id":data.id,"state":"0","boxid":data.boxid,"boxip":data.boxip,
			  						"holderno":data.holderno,"holdername":data.holdername,"photostr":data.photostr,
			  						"type":type,"loginid":window.top.loginid};
				  				$.ajax({
				  					url:url+'/SynBoxRecord/delete',
				  					type:"POST",
				  					data:obj1,
				  					success:function(res){
				  						console.log(res);
				  						layer.close(index);
				  						if(res.flag){
				  							layer.msg(res.reason,{time:1000},function(){
				  								var id=$("#passList li.curr").attr("data-id");
				  								var synstatus=$("#synstatus").val();
				  								getSynCarList(id,synstatus)
				  							})
				  						}else{
				  							layer.msg(res.reason,{time:2000});
				  						}
				  					}
				  				})
				  			  });
					   }
		  });
	})
}

//获取所有盒子
function initBox(){
	$.ajax({
		url:url+'/BoxData/getList',
		type:"POST",
		success:function(data){
			console.log(data)
			$("#passList").empty();
			if(data.flag){
				for(var item of data.result){
					var $li=$("<li data-id="+item.id+" data-ip="+item.boxip+" data-name="+item.boxname+">"+item.boxname+"</li>");
					$("#passList").append($li);
				}
			}
		}
	})
}
//点击选项卡
$(".main-tab .label").click(function(){
	var index=$(this).index();
	$(this).addClass("curr").siblings().removeClass("curr");
	if(index == 0){//现役军人
		$("#freeCar").show();
		$("#familyCar").hide();
		$("#synblack").hide();
	}else if(index == 1){//其他人员
		$("#freeCar").hide();
		$("#familyCar").show();
		$("#synblack").hide();
	}else if(index == 2){//其他人员
		$("#freeCar").hide();
		$("#familyCar").hide();
		$("#synblack").show();
	}
})
//点击选择人员
$("#selectCar").click(function(){
	var index=$(".main-tab .label.curr").index();
	var id=$("#passList li.curr").attr("data-id");
	var ip=$("#passList li.curr").attr("data-ip");
	 if(index == 0){//现役人员
		 if($("#passList li.curr").length == 0){
				layer.msg("请选择AI数据分析终端!",{time:2000});
				return;
			}
		 layer.open({
			 type:2,
			 title:"现役人员",
			 content:"soldierList.html?ip="+ip+"&id="+id,
			 area:["90%","91%"],
		})
	 }else if(index == 1){//其他人员
		 if($("#familyCar")[0].contentWindow.$("#passList li.curr").length == 0){
				layer.msg("请选择AI数据分析终端!",{time:2000});
				return;
			}
		var id2=$("#familyCar")[0].contentWindow.$("#passList li.curr").attr("data-id");
		var ip2=$("#familyCar")[0].contentWindow.$("#passList li.curr").attr("data-ip");
		 layer.open({
			 type:2,
			 title:"其他人员",
			 content:"otherList.html?ip="+ip2+"&id="+id2,
			 area:["90%","91%"],
		})
	 }else if(index == 2){//黑名单人员
		 if($("#synblack")[0].contentWindow.$("#passList li.curr").length == 0){
				layer.msg("请选择AI数据分析终端!",{time:2000});
				return;
			}
		var id2=$("#synblack")[0].contentWindow.$("#passList li.curr").attr("data-id");
		var ip2=$("#synblack")[0].contentWindow.$("#passList li.curr").attr("data-ip");
		 layer.open({
			 type:2,
			 title:"黑名单人员",
			 content:"blackList.html?ip="+ip2+"&id="+id2,
			 area:["90%","91%"],
		})
	 }
})
//点击搜索
$("#search").click(function(){
	if($("#passList li.curr").length == 0){
		layer.msg("请选择AI数据分析终端!",{time:2000});
		return;
	}
	var id=$("#passList li.curr").attr("data-id");
	var synstatus=$("#synstatus").val();
	getSynCarList(id,synstatus)
})
//点击盒子li
$(document).on("click","#passList li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	var id=$(this).attr("data-id");
	getSynCarList(id,"");
})
//根据盒子获取同步的
function getSynCarList(id,synstatus){
	$.ajax({
		url:url+"/SynBoxRecord/getSynHolder",
		type:"POST",
		data:{"boxid":id,"state":"0","synstatus":synstatus,"loginid":window.top.loginid},
		success:function(res){
			console.log("盒子搜索：");
			console.log(res);
			if(res.flag){
				initTable(res.result);
			}else{
				initTable([]);
			}
		}
	})
}

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}