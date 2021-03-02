layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	
	  //监听搜索
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    field.type="P";
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  table.render({
		    elem: '#LAY-user-manage',
		    url:url+'/ChannelData/getList',
		    cellMinWidth: 80,
		    height: "full-232",
		    method:"POST",
		    request:{
		   	pageName:"curpage",
		   	limitName:"pagesize",
		   },
		   where:{
			   "type":"P"
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
			      {field:'channelname', title:'监控点名称', width:200,sort:true},
			      {field:'locatname', title:'所属区域', width:200,sort:true},
			      {field:'areaname', title:'IP地址', width:200},
			      {field:'remark', title:'在线状态', width:300,sort:true},
			      {field:'remark', title:'录制状态', width:300,sort:true},
			      {field:'remark', title:'预览状态', width:300,sort:true},
			      {field:'remark', title:'状态持续时长', width:300,sort:true},
			      {field:'remark', title:'巡检时间', width:300,sort:true},
			      {fixed:'right', title:'操作', width:300,sort:true,templet:function(){
			    	  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='setDevice'>复核</a>";
			    	  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>查看</a>";
					  var $a3="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='del'>编辑</a>";
					 return $a1+$a2+$a3;
			      }}
			    ]],
		     page: true,
		     limit:15,
			 limits:[15,20,30,40,50,60,70,80,90]
		  });
})
