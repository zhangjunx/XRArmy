$(function(){
	//getMenu();//获取菜单
	getOneInfo();
})
var loginid=getUrlParam("userid");
//点击退出
$("#exit").click(function(){
 window.location.href="index.html";
})
//获取菜单并生成菜单
function getMenu(){
	$.ajax({
		url:url+"/HolderData/getMyMenu",
		type:"POST",
		data:{"loginid":window.top.loginid},
		success:function(data){
			console.log(data);
			$("#LAY-system-side-menu").empty();
			if(!data.flag){
				return;
			}
			
			layui.use(['tree','layer'],function(){
				layui.tree({
					elem:'#LAY-system-side-menu',//绑定元素
					nodes:convert(d),
				})
			})
			
			//List<Tree>> 对象转nodes对象函数
			function convert(rows){
				function exists(rows,parentid){
					for(var i=0;i<rows.length;i++){
						if(rows[i].id=parentid){
							return true;
						}
					}
					return false;
				}
				
				var nodes=[];
				for(var i=0;i<rows.length;i++){
					var row=rows[i];
					if(!exists(rows,row.parentid)){
						nodes.push({
							id:row.id,
							name:row.text,
							parent:null,
							remark:row.remark
						});
					}
				}
				
				var toDo=[];
				for(var i=0;i<nodes.length;i++){
					toDo.push(nodes[i]);
				}
				/*while(toDo.length){
					var node=toDo.shift();//the parent node
					//get the children nodes
					for(int i=0;i<rows.length;i++){
						var row=rows[i];
						if(row.parentid==node.id){//这里修改自己需要的属性
							var child={id:row.id,name:row.text+(row.remark=='stop'?'<span style="color:darkgray">(停运)</span>':''),parentid:node.id,remark:row.remark,parentname:node.name};
							if(node.children){
								node.children.push(child);
							}else{
								node.children=[child];
							}
							toDo.push(child); 
						}
					}
				}*/
				return nodes;//layui nodes对象
			}
			
			/*var html="";
			var t1="";
			var t2="";
			var t3="";
			$.each(data,function(i,val){
				var id=val.id==undefined?"":val.id;
				var title=val.title==undefined?"":val.title;
				var parent=val.parent==undefined?"":val.parent;
				var iconsrc=val.iconsrc==undefined?"img/icon-system.png":val.iconsrc;
				var menusrc=val.menusrc==undefined?"":val.menusrc;
				var code=val.code==undefined?"":val.code;
				var level=val.level==undefined?"":val.level;
				var ifscreen=val.ifscreen==undefined?"":val.ifscreen;
				var ifshow=val.ifshow==undefined?"":val.ifshow;
				html+="<li class='layui-nav-item layui-nav-itemed'><a href='javascript:;'><i class='layui-icon'><img src='img/icon-work.png' alt='' class='icon-width'></i><cite>个人中心</cite></a><dl class='layui-nav-child'><dd class='layui-this'><a href='user/password.html'  target='mainFrame'>修改密码</a></dd></dl></li>";
				t="<dd><a href=''javascript:;'>视频检测<span class='layui-nav-more'></span></a><dl class='layui-nav-child'><dd><a href='javascript:;'  target="mainFrame">在线监测</a></dd></dl></dd>";
				t1+="<li class='layui-nav-item layui-nav-itemed'><a href='javascript:;'><i class='layui-icon'><img src='img/icon-work.png' alt='' class='icon-width'></i><cite>个人中心</cite></a><dl class='layui-nav-child'></dl></li>";
				t2+="<dd><a href='user/password.html'  target='mainFrame'>修改密码</a></dd>";
				t3+="<dd><a href=''javascript:;'>视频检测<span class='layui-nav-more'></span></a><dl class='layui-nav-child'></dl></dd>";
				t4+="<dd><a href='javascript:;' target='mainFrame'>在线监测</a></dd>";
				
				if(parent=="" && id.length==3){
					var tt="<li class='layui-nav-item layui-nav-itemed'><a href='javascript:;'><i class='layui-icon'><img src='"+iconsrc+"' alt='' class='icon-width'></i><cite>"+title+"</cite></a><dl class='layui-nav-child'>";
				}else if(parent!="" && level==2){
					var tt="<dd class='layui-this'><a href='"+menuurl+"'  target='mainFrame'>"+title+"</a></dd>";
				}else if(parent!="" && level==1){
					var tt=<li class='layui-nav-item layui-nav-itemed'><a href='javascript:;'><i class='layui-icon'><img src='"+iconsrc+"' alt='' class='icon-width'></i><cite>"+title+"</cite></a><dl class='layui-nav-child'>";
				}  
				 
				
			});
			$("#LAY-system-side-menu").append(html);
			layui.use("element",function(){
				var element=layui.element;
				element.init();
			})*/
		/*	if(res.code == 200){
				var data=res.data;
				$.each(data,function(i,obj){
					var content='<li class="layui-nav-item">';
					if(i==0){
						content='<li class="layui-nav-item layui-nav-itemed">';
					}
					if(obj.menu_link == null){//菜单
						content+='<a href="javascript:;"><i class="layui-icon"><img src='+url+"/"+obj.menu_icon+' class="icon-width"></i><cite>'+obj.menu_name+'</cite><span class="layui-nav-more"></span></a>';
					}else{//页面
						content+='<a href='+obj.menu_link+' target="mainFrame"><i class="layui-icon"><img src='+url+"/"+obj.menu_icon+' class="icon-width"></i><cite>'+obj.menu_name+'</cite></a>';
					}
					//这里是添加所有的子菜单
					content+=loadchild(obj,i);
					content+='</li>';
					$("#LAY-system-side-menu").append(content);
				});
				
				layui.use("element",function(){
					var element=layui.element;
					element.init();
				})
			}*/
		}
	})
}

//组装子菜单的方法
function loadchild(obj,index){
	if(obj==null){
		return;
	}
	var content='';
	if(obj.children!=null && obj.children.length>0){
		content+='<dl class="layui-nav-child">';
		$.each(obj.children,function(i,note){
			content+='<dd>';
			if(index==0 && i==0){
				content+='<dd class="layui-this">'
			}
			if(note.menu_link == null){//菜单
				content+='<a href="javascript:;">'+note.menu_name+'<span class="layui-nav-more"></span></a>';
			}else{//页面
				content+='<a href='+note.menu_link+' target="mainFrame">'+note.menu_name+'</a>';
			}
			
			if(note.children==null){
				return;
			}
			content+=loadchild(note);
			content+='</dd>';
		});
		content+='</dl>';
	}
	return content;
}


//获取当前登录用户信息
function getOneInfo(){
	var userid=getUrlParam("userid");
	console.log(userid)
	if(userid=="" || userid=="undefined"){
		window.location.href="index.html";
		return;
	}
	$.ajax({
		url:url+"/UserData/getList",
		type:"POST",
		data:{"userid":userid},
		success:function(data){
			console.log(data);
			if(!data.flag){
				return; 
			}
			$("#logotitle").empty(); 
			var res=data.result[0];
			var title=res.title==undefined?"智慧军营":res.title;
			var username=res.username==undefined?res.userid:res.username;
			var logo=res.logo==undefined?"img/logo3.png":"data:image/png;base64,"+res.logo;
			var html="<img src='"+logo+"' alt='' style='width: 19px;vertical-align: text-top;margin-right: 6px;'>"+title;
			$("#loginUser").html(username);
			$("#logotitle").append(html);
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var paramsString = window.location.search.substring(1);
    var r = window.decodeURIComponent(window.atob(paramsString)).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}


