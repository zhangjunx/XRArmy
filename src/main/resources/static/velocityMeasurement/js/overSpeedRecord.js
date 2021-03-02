layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  laydate=layui.laydate,
	  table = layui.table;
	
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
				type : 'datetime',//格式
			});
	});
	 
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
		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
			      {field:'channelname', title:'车牌号码', width:180,sort:true},
			      {field:'locatname', title:'车辆类别', width:150,sort:true},
			      {field:'areaname', title:'车辆类型', width:150},
			      {field:'remark', title:'测速时间', width:180,sort:true},
			      {field:'remark', title:'速度', width:150,sort:true},
			      {field:'remark', title:'测速点', width:180,sort:true},
			      {field:'remark', title:'限定最高速度', width:180,sort:true},
			      {field:'remark', title:'现场照',sort:true},
			    ]],
		     page: true,
		     limit:15,
			 limits:[15,20,30,40,50,60,70,80,90]
		  });
})
