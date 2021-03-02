var table;
layui.use(["form","table"],function(){
	var $ = layui.$,
		form = layui.form;
	table = layui.table;
	initTable(table);
	//监听搜索
	form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    //执行重载
	    table.reload('LAY-user-manage', {
	    	where: field
	    });
	});
	//监听提交按钮    
	form.on('submit(formBtn)', function(data){
		var arr=layui.table.checkStatus("LAY-user-manage").data;
		console.log(arr);
		var obj=[];
		for(var i=0;i<arr.length;i++){
			obj.push({"userID":arr[i].userid,"userName":arr[i].username});
		}
		parent.setApprover(obj);
		parent.layer.closeAll();
	});
	//监听取消按钮    
	form.on('submit(formCancelBtn)', function(data){
		parent.layer.closeAll();
	});
	
})

//初始化表格
function initTable(){
	table.render({
		elem: '#LAY-user-manage',
		url:url+'/UserData/getList',
		cellMinWidth: 80,
		method:"POST",
		request:{
		    pageName:"curpage",
			limitName:"pagesize",
		},
		where:{
			"state":"0",
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
		cols:[[
			{type:"checkbox"},
		    {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
				return d.LAY_TABLE_INDEX+1
			}},
		    {field:'username', title:'用户名', width:200},
		    {field:'unitname', title:'所属区域', sort:true},
		]],
		page: true
	});
}

