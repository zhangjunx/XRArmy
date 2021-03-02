var table;
layui.use(["form","table","laydate"],function(){
	var $ = layui.$,
		form = layui.form,
		laydate = layui.laydate;;
	table = layui.table;
	initTable(table);
	
	lay('.date').each(function() {
		laydate.render({
			elem : this,//元素
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
	
	////点击参议人员查看
	form.on('submit(appendUser)', function(data){
		$.ajax({
	    	url:meetUrl+"meet/meeting/getAppendUserList",
	    	type:"POST",
	    	data:{"fid":$(this).attr("data-fid"),"thisUserID":window.top.loginid},
	    	success:function(res){
	    		$("#appendList").empty();
	    		var data = res.data;
	    		var appendList="";
	    		for(var i=0;i<data.length;i++){
	    			var tmpl ="<a class='layui-btn layui-btn-primary' href='javascript:;'>"+data[i].HolderName+"</a>"; 
	    			appendList = appendList+"\n"+tmpl;
	    		}
	    		$("#appendList").append(appendList);
	    		layer.open({
	    			type: 1,
	    			area:["90%","92%"],
	    			title:"参议人员",
	    			content: $('#appendListDiv'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	    		});
	    	},
		})
	});
	
	//监听工具条
	table.on('tool(LAY-user-manage)', function(obj){
		var data = obj.data;
		if(obj.event === 'cancel'){
			layer.confirm('确定取消当前会议?', function(index){
		  		$.ajax({
		  			url:meetUrl+'meet/meeting/delMeeting',
		  			type:"POST",
		  			data:{"fid":data.fid,"thisUserID":window.top.loginid},
		  			success:function(res){
			  			layer.close(index);
			  			layer.msg(res.msg,{time:2000});
			  			initTable();
		  			}
		  		})
			});
		}else if(obj.event === 'edit'){
			layer.open({
				type:2,
				title:"编辑会议室",
				content:"meeting_add.html?type=edit&id="+data.fid,
				area:["90%","91%"],
			})
		}else if(obj.event === 'detail'){
			layer.open({
				type:2,
				title:"编辑会议室",
				content:"meeting_add.html?type=view&id="+data.fid,
				area:["90%","91%"],
			})
		}
	});
})

//初始化表格
function initTable(){
	table.render({
		elem: '#LAY-user-manage',
		url:meetUrl+'meet/meeting/getMeetingList',
		cellMinWidth: 80,
		method:"POST",
		request:{
		    pageName:"curpage",
			limitName:"pageSize",
		},
		where:{
			"thisUserID":window.top.loginid,
			"mettingTitle":"",
			"promoter":"",
			"roomPlace":"",
			"meetingDate":"",
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
		cols:[[
		    {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
				return d.LAY_TABLE_INDEX+1
			}},
			{field:'mettingTitle', title:'会议主题', width:200},
			{field:'roomName', title:'会议室', width:200,sort:true},
			{field:'appendList', title:'参议人员', width:120,sort:true,templet:function(d){
				return "<a class='layui-btn layui-btn-normal layui-btn-xs' data-fid="+d.fid+" lay-submit lay-filter='appendUser'>参议人员</a>";
			}},
			{field:'approveStatus', title:'审批状态', width:150,sort:true,templet:function(d){
				if (d.approveStatus == '1') {
                    return '已审批';
                }else{
                	return '待审批';
                }
			}},
			{field:'approverName', title:'审批人', width:120,sort:true},
			{field:'startDate', title:'会议起始日期', width:180,sort:true},
			{field:'endDate', title:'会议结束日期',width:180,sort:true},
			{fixed: 'right', title:'操作',width:500, templet:function(d){
				if(d.approveStatus == 1){
					var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='detail'>详情</a>";
					var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>会议取消</a>";
					var $a5="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='signInDetail'>会议签到</a>";
					var $a6="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='signBackDetail'>会议签退</a>";
					if(getNowDate() >= d.endDate){
						var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='summaryDetail'>会议纪要</a>";
					}else{
						var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>会议纪要</a>";
					}
					return $a1+$a2+$a3+$a4+$a5+$a6;
				}else{
					var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='detail'>详情</a>";
					var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
					var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='cancel'>会议取消</a>";
					var $a4="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>会议纪要</a>";
					var $a5="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>会议签到</a>";
					var $a6="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>会议签退</a>";
					return $a1+$a2+$a3+$a4+$a5+$a6;
				}
				
			}},
		]],
		page: true
	});
}

//点击新增
$('#add').click(function(){
	layer.open({
		type:2,
		title:"新建会议室",
		content:"meeting_add.html",
		area:["90%","91%"],
	})
});
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"carImport.html",
		 area:["90%","91%"],
	})
})
//获取复选框的值
function getChecked(){
	var obj = document.getElementsByName("carStatus");
	var check_val = "";
	for (k in obj) {
		if (obj[k].checked){
			if(check_val == ""){
				check_val = obj[k].value;
			}else{
				check_val = check_val+","+obj[k].value;
			}
		}
	}
	return check_val;
}

//获取当前日期
function getNowDate(){
	var myDate = new Date();
	var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var m = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	var d = myDate.getDate();        //获取当前日(1-31)
	var h = myDate.getHours();       //获取当前小时数(0-23)
	var mi = myDate.getMinutes()+1;     //获取当前分钟数(0-59)
	var s = myDate.getSeconds()+1;     //获取当前秒数(0-59)
	if(m<10){
		m="0"+m;
	}
	if(d<10){
		d="0"+d;
	}
	if(h<10){
		h="0"+h;
	}
	if(mi<10){
		mi="0"+mi;
	}
	if(s<10){
		s="0"+s;
	}
	return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;
}