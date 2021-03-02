layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	 //执行一个laydate实例
	  laydate.render({
	    elem: '#createDate' //指定元素
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
		    url:carUrl+'car/carBill/getAproveBillRecord',
		    cellMinWidth: 80,
		    height: "full-232",
		    method:"POST",
		    request:{
		    	 pageName:"curpage",
  			     limitName:"pagesize",
		    },
		    where:{
		    	"thisUserID":window.top.loginid,
		    	"billNo":"",
		    	"createDate":"",
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
				  {field:'billNo', title:'派车单单号', width:200},
			      {field:'carNum', title:'车牌号码', width:120,sort:true},
				  {field:'status', title:'审批状态', width:180,sort:true,templet:function(d){
					  if(d.status == -2){
						  return "已拒绝";
					  }else if(d.status != -2){
						  return "已同意";
					  }
				  }},
			      {field:'driverName', title:'驾驶员名称', width:120,sort:true},
			      {field:'useDeptName', title:'用车单位', width:120,sort:true},
				  {field:'contacts', title:'联系人', width:150,sort:true},
				  {field:'operateDate', title:'申请时间', width:180,sort:true},
				  {field:'outCarTime', title:'出车时间', width:180,sort:true},
				  {field:'billRemark', title:'备注', width:150,sort:true},
				  {fixed: 'right', title:'操作',width:140, templet:function(d){
					  var $a2="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='watch'>查看详情</a>";
					  return $a2;
				  }},
			    ]],
			    page: true,
			    limit:15,
				limits:[15,20,30,40,50,60,70,80,90],
		  });
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
			  var data = obj.data;
		  	  if(obj.event === 'watch'){
	  				 layer.open({
	  					 type:2,
	  					 title:"详情",
	  					 content:"dispatchManage_detail.html?billNo="+data.billNo,
	  					 area:["90%","91%"],
	  				 })
	  			}
		  });
})
