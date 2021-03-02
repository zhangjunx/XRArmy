layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	  
	  lay('.date').each(function() {
	  	laydate.render({
	  		elem : this,//元素
			type:"datetime",
	  		trigger : 'click',//怎么触发
	  	});
	  });
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
		   url:url+'/SystemLog/getList',
		   cellMinWidth: 80,
		   height: "full-232",
		   method:"POST",
		   request:{
		   	pageName:"curpage",
		   	limitName:"pagesize",
		   },
		   parseData: function(res){ //res 即为原始返回的数据
		       return {
		         "code": res.false==true?"0":"", //解析接口状态
		         "msg": res.reason, //解析提示文本
		         "count": res.count, //解析数据长度
		         "data": res.result //解析数据列表
		       };
		     },
		    cols:  [[
		    	  {field:'ID', title:'序号', width:150,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'username', title:'操作用户', width:200},
			      {field:'type', title:'操作类别', width:200,sort:true},
			      {field:'content', title:'操作内容', width:650,sort:true},
			      {field:'netip', title:'登录IP', width:200,sort:true},
				  {field:'createdate', title:'操作时间', width:250,sort:true},
			    ]],
		     page: true,
			 limit:15,
		     limits:[15,20,30,40,50,60,70,80,90]
		  });
})
