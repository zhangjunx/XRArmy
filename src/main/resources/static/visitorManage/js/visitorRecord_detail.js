getOneInfo();
//查看时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/VisitorsInfo/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data);
			if(data.flag){
				 var res=data.result[0];
				 $("#idtype").val(res.idtype);
				 $("#idcode").val(res.idcode);
				 $("#visitorsname").val(res.visitorsname);
				 $("#sexname input[value="+res.sexname+"]").attr("checked",true);
				 $("#phone").val(res.phone);
				 $("#carplateno").val(res.carplateno);
				 $("#visitorsreasontext").val(res.visitorsreasontext);
				 $("#groupid").val(res.groupname);
				 $("#startdate").val(res.startdate);
				 $("#enddate").val(res.enddate);
				 $("#unitname").val(res.unitname);
				 $("#receiversname").val(res.receiversname);
			     $("#receiversphone").val(res.receiversphone);
				 var photo=res.photo==undefined?"../img/add_img.png":res.photo;
				 var backphoto=res.backphoto==undefined?"../img/add_img.png":res.backphoto;
				 $("#img").attr("src",backphoto);
				 $("#scenePhoto").attr("src",photo);
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}


//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}