if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
var exportData;
layui.use(["form","table"],function(){
	  var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	
	  //导出
	  $("#export").click(function(){
		  table.exportFile("LAY-user-manage",exportData, "xls");
	  })
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
		    url:carUrl+'car/search/carPassRecord',
		    cellMinWidth: 80,
		    height: "full-232",
		    method:"POST",
		    title:"车辆进出记录",
		    request:{
		    	 pageName:"curpage",
  			     limitName:"pagesize",
		    },
		    where:{
		    	"thisUserID":window.top.loginid,
		    	"carNum":"",
		    	"channelName":"",
		    	"startDate":"",
		    	"endDate":"",
		    },
		    parseData: function(res){ //res 即为原始返回的数据
		    	console.log(res);
		        return {
		          "code": res.code==200?"0":"", //解析接口状态
		          "msg": res.message, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.data //解析数据列表
		        };
		    },
		    cols:[[
		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'carNum', title:'车牌号', width:150},
			      {field:'useDeptName', title:'使用单位', width:180,sort:true},
			      {field:'driverName', title:'驾驶员', width:150,sort:true},
				  {field:'channelName', title:'进出通道', width:180,sort:true},
				  {field:'passStatus', title:'进出状态', width:150,sort:true},
				  {field:'passDate', title:'进出时间', width:180,sort:true},
				  {field:'imageBack', title:'现场照', sort:true,templet:function(d){
					  if(d.images == null || d.images == ''){
						  return "";
					  }else{
						  var paths = (d.images).split(",");
						  return "<image src="+carUrl+paths[0]+"></image>";
					  }
				  }},
			    ]],
			  page: true,
			  limit:15,
			  limits:[15,20,30,40,50,60,70,80,90],
			  done: function (res, curr, count) {
					exportData=res.data;
				}
		  });
})

//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
