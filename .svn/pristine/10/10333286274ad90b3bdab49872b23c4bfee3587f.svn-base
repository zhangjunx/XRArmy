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
			      {field:'channelname', title:'监控点名称', width:200,sort:true},
			      {field:'locatname', title:'所属区域', width:200,sort:true},
			      {field:'areaname', title:'IP地址', width:200},
			      {field:'remark', title:'巡检结果', width:300,sort:true},
			      {field:'remark', title:'断续频次', width:300,sort:true},
			      {field:'remark', title:'未录像时长', width:300,sort:true},
			      {field:'remark', title:'录像保存天数', width:300,sort:true},
			      {field:'remark', title:'存储类型', width:300,sort:true},
			      {field:'remark', title:'录制状态', width:300,sort:true},
			      {fixed:'right', title:'操作', width:300,sort:true,templet:function(){
			    	  var $a1="<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-normal' lay-event='play'>播放录像</a>";
			    	  return $a1;
			      }},
			    ]]
		    ,page: true
		  });
})
