if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
}
getCombox();
//websocket接收推送的车辆状态
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket(ws1);
}
else {
    layer.msg('当前浏览器 Not support websocket',{time:2000});
}

//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};
//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
}
//接收到消息的回调方法
websocket.onmessage = function (event) {
    var res=JSON.parse(event.data);
   console.log(res);
   //根据车牌号去修改对应的车辆状态
   if(res != null && res != undefined){
	   var status="";
	   if(res.ifPrivateUse == 0){
			  if(res.STATUS == 1){
				  status= "库内"
			  }else if(d.STATUS == 2){
				  status= "占用"
			  }else if(d.STATUS == 3){
				  status= "营内"
			  }else if(d.STATUS == 4){
				  status= "营外"
			  }
	  }else{
		  status= "";
	  }
	   for(var i=0;i<$("td[data-field='carNum']").length;i++){
			if($("td[data-field='carNum']").eq(i).find("div").html()== res.carNum){
				$("td[data-field='STATUS']").eq(i).find("div").html(status);
			}
		}
   }
}
//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
}
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
	 websocket.close();
}
//发送消息
function send() {
    websocket.send(message);
}



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
	    field.useDept=$("#unitno").val();
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  table.render({
		    elem: '#LAY-user-manage',
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
		    	"ifPrivateUse":0
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
				  {field:'carNum', title:'车牌号', width:150},
			      {field:'useDeptName', title:'使用单位', width:150,sort:true},
			      {field:'parkName', title:'停车场', width:110,sort:true},
				  {field:'purpose', title:'车辆用途', width:250,sort:true},
				  {field:'STATUS', title:'车辆状态', width:120,sort:true,templet:function(d){
					  if(d.ifPrivateUse == 0){
						  if(d.STATUS == 1){
							  return "库内"
						  }else if(d.STATUS == 2){
							  return "占用"
						  }else if(d.STATUS == 3){
							  return "营内"
						  }else if(d.STATUS == 4){
							  return "营外"
						  }
					  }else{
						  return "";
					  }
					  
				  }},
				  {field:'startDate', title:'有效期开始时间', width:170,sort:true},
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
		  table.on('tool(LAY-user-manage)', function(obj){
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
	  					 content:"carManage_add.html?id="+data.fid,
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

//点击新增
 $('#add').click(function(){
	 var index=$(".main-tab .label.curr").index();
	 if(index == 0){//军用车辆
		 layer.open({
			 type:2,
			 title:"添加军用车辆",
			 content:"carManage_add.html",
			 area:["90%","91%"],
		 })
	 }else if(index == 1){//免派车辆
		 layer.open({
			 type:2,
			 title:"添加免派车辆",
			 content:"freeCar_add.html",
			 area:["90%","91%"],
		 })
	 }else if(index == 2){//家属车辆
		 layer.open({
			 type:2,
			 title:"添加家属车辆",
			 content:"carManageFamily_add.html",
			 area:["90%","91%"],
		 })
	 }
	
});
//点击打印
$("#print").click(function(){
	 var index=$(".main-tab .label.curr").index();
	 if(index == 0){//军用车辆
		 print("LAY-user-manage");
	 }else if(index == 1){//免派车辆
		 $("#freeCar")[0].contentWindow.printTable(); 
	 }else if(index == 2){//家属车辆
		 $("#familyCar")[0].contentWindow.printTable(); 
	 }
})
//点击导入
$("#import").click(function(){
	 var index=$(".main-tab .label.curr").index();
	 if(index == 0){//军用车辆
		 layer.open({
			 type:2,
			 title:"批量导入",
			 content:"carImport.html",
			 area:["90%","91%"],
		})
	 }else if(index == 2){//家属车辆
		 layer.open({
			 type:2,
			 title:"批量导入",
			 content:"carImportFamily.html",
			 area:["90%","91%"],
		})
	 }
})
//点击选项卡
$(".main-tab .label").click(function(){
	var index=$(this).index();
	$(this).addClass("curr").siblings().removeClass("curr");
	if(index == 0){//军用车辆
		$("#armyCar").show();
		$("#familyCar").hide();
		$("#freeCar").hide();
		$("#import").show();
		$("#synchro").hide();
	}else if(index == 1){//免派车辆
		$("#armyCar").hide();
		$("#familyCar").hide();
		$("#freeCar").show();
		$("#import").hide();
		$("#synchro").show();
	}else if(index == 2){//家属车辆
		$("#armyCar").hide();
		$("#familyCar").show();
		$("#freeCar").hide();
		$("#import").show();
		$("#synchro").show();
	}
})
//查询同步失败数据
$("#synchro").click(function(){
	var index=$(".main-tab .label.curr").index();
	 if(index == 1){//免派车辆
		 layer.open({
			 type:2,
			 title:"同步失败",
			 content:"freeCar_sync.html",
			 area:["90%","91%"],
		})
	 }else if(index == 2){//家属车辆
		 layer.open({
			 type:2,
			 title:"同步失败",
			 content:"familyCar_sync.html",
			 area:["90%","91%"],
		})
	 }
	
})
//获取用车单位下拉框
function getCombox(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			if(res.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree",
				        data: res.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	$("#unitno").val(node.data.id);
				        	$("#unitname").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				        }
				    });
				    //unbind('click');解绑点击事件，解决点击一次，然后执行两次方法的问题
			    	$(".downpanel").unbind('click').on("click", ".layui-select-title", function (e) {
				        $(".downpanel.layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
				});
			}
		}
	})
}