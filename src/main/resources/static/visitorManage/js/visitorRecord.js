if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
var exportData;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
      laydate = layui.laydate;
	   
		lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				//type:"datetime",
				trigger : 'click',//怎么触发
			});
		});
	//导出	
	$("#export").click(function(){
		console.log(exportData)
		for(var item of exportData){// 解决导出时身份证号变成e+17
			  item.visitorsdate+="\t";
		  }
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
		    url:url+'/VisitorsInfo/getList',
		    cellMinWidth: 80,
		    height: "full-232",
			title:"访客登记记录",
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
		    cols:  [[
		    	  {field:'ID', title:'序号', width:150,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'visitorsname', title:'访客姓名', width:200},
			      {field:'phone', title:'访客联系电话', width:200,sort:true},
			      {field:'carplateno', title:'车牌号码', width:200,sort:true},
				  {field:'visitorsdate', title:'来访时间', width:250,sort:true},
				  {field:'visitorsreasontext', title:'来访事由', width:300,sort:true},
				  {field:'receiversname', title:'被访人姓名', width:200,sort:true},
				  {field:'receiversphone', title:'被访人联系电话', width:200,sort:true},
			      {fixed: 'right', title:'操作', width:200,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
					  return $a1;
				  }},
			    ]],
			    page: true,
				limit:15,
			    limits:[15,20,30,40,50,60,70,80,90],
			done: function (res, curr, count) {
				exportData=res.data;
			}
		  });
		  
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
			var data = obj.data;
		   if(obj.event === 'watch'){
				 layer.open({
					 type:2,
					 title:"查看",
					 content:"visitorRecord_detail.html?id="+data.id,
					 area:["90%","91%"],
				 })
			}
		  });
		  
})
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})