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
			obj.push({"holderNo":arr[i].holderno,"holderName":arr[i].holdername});
		}
		parent.setAppenders(obj);
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
		url:url+'/HolderData/getList',
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
			{field:'holderno', title:'军人证号', width:200},
			{field:'holdername', title:'名称', width:120,sort:true},
			{field:'sexname', title:'性别', width:100,sort:true,templet:function(d){
				if(d.sexname == '1'){
					return "男";
				}else{
					return "女";
				}
			}},
			{field:'unitname', title:'所属单位',width:200,sort:true},
			{field:'rank', title:'职务', sort:true},
		]],
		page: true
	});
}

