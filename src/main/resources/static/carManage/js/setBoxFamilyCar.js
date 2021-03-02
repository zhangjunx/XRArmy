initBox();
layui.use(["layer","form"],function(){
	 var layer = layui.layer;
	 var form = layui.form;
})
function initTable(arr){
	layui.use(["form","table","laydate","tree"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table,
		  laydate = layui.laydate;
		 var tree = layui.tree;
		  
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
					  {field:'carNum', title:'车牌号', width:350,sort:true},
					  {field:'boxIp', title:'盒子ip', width:250},
					  {field:'synStatus', title:'数据状态', width:250},
				      {fixed: 'right', title:'操作',templet:function(d){
				    	  var $a2="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>取消同步</a>";
				    	  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >同步</a>";
						  if(d.synStatus == "更新" || d.synStatus == "删除"){
							  $a3="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='async'>同步</a>";
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
			  				$.ajax({
			  					url:carUrl+'car/carManagerFamily/synCancleCarInfo',
			  					type:"POST",
			  					data:{"boxID":data.boxID,"thisUserID":window.top.loginid,"boxIp":data.boxIp,"carNum":data.carNum,"fid":data.carID},
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
				   }else if(obj.event === 'async'){
			  			  layer.confirm('确定同步?', function(index){
			  				  var optType="";
			  				  if(data.synStatus == "更新"){
			  					optType=1;
			  				  }else if(data.synStatus == "删除"){
			  					optType=2;
			  				  }
				  				$.ajax({
				  					url:carUrl+'car/carManagerFamily/synEditCarInfo',
				  					type:"POST",
				  					data:{"boxID":data.boxID,"boxIp":data.boxIp,"carNum":data.carNum,"optType":optType,"thisUserID":window.top.loginid,"fid":data.carID},
				  					success:function(res){
				  						layer.close(index);
				  						if(res.result){
				  							layer.msg(res.msg,{time:1000},function(){
				  								var id=$("#passList li.curr").attr("data-id");
				  								var synStatus=$("#synStatus").val();
				  								getSynCarList(id,synStatus)
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
					var $li=$("<li data-id="+item.id+" data-ip="+item.boxip+">"+item.boxname+"</li>");
					$("#passList").append($li);
				}
			}
		}
	})
}
//点击选择车辆
$("#selectCar").click(function(){
	var index=$(".main-tab .label.curr").index();
	var id=$("#passList li.curr").attr("data-id");
	var ip=$("#passList li.curr").attr("data-ip");
	 if(index == 0){//免派车辆
		 layer.open({
			 type:2,
			 title:"免派车辆",
			 content:"freeCarList.html?ip="+ip+"&id="+id,
			 area:["90%","91%"],
		})
	 }else if(index == 1){//家属车辆
		 layer.open({
			 type:2,
			 title:"家属车辆",
			 content:"familyCar_sync.html",
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
	var synStatus=$("#synStatus").val();
	getSynCarList(id,synStatus)
})
//点击盒子li
$(document).on("click","#passList li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	var id=$(this).attr("data-id");
	getSynCarList(id,"");
})
//根据盒子获取同步的
function getSynCarList(id,synStatus){
	$.ajax({
		url:carUrl+"car/carManagerFamily/getSynCarList",
		type:"POST",
		data:{"boxID":id,"thisUserID":window.top.loginid,"synStatus":synStatus},
		success:function(res){
			console.log(res);
			if(res.result){
				initTable(res.data);
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