package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.configure.MethodLog;
import com.xr.entry.ACL_Role_Menu;
import com.xr.service.IACL_Role_MenuService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("ACL_Role_Menu")
@Api(tags="ACL_Role_Menu",description="接口标题：角色权限设置层接口")
public class ACL_Role_MenuController {
	@Autowired
	private IACL_Role_MenuService ics;
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：给角色分配权限接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：封装的json字符串：{[{'roleid':1,'menuid':'001'},{'roleid':1,'menuid':'001001'},...]}",required=true,dataType="String",paramType="path"),
		})
	@MethodLog(methodName="保存",remark="角色权限设置的保存")
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> add(String str,String loginid,Integer roleid,String type){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			JSONArray arr=JSONArray.parseArray(str);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<arr.size();i++){
				Map<String,Object> m1=new HashMap<String,Object>();
				Map<String,Object> m=new HashMap<String,Object>();
				String menuid=arr.getString(i);
				if(!menuid.equals("0")){
					m.put("roleid", roleid);  
					m.put("menuid", menuid);  
					List<Map<String,Object>> exist=ics.getListService(m);
					if(exist==null || exist.size()==0){
						if(type.equals("aa")){
							m1.put("type", "aa");
							m1.put("roleid", roleid);
							m1.put("menuid", menuid);
							result.add(m1);
						}
						
					}else if(exist!=null && exist.size()>0){
						for(int j=0;j<exist.size();j++){
							Map<String,Object> m2=exist.get(j);
							Integer id=Integer.valueOf(String.valueOf(m2.get("id")));
							if("dd".equals(type)){
								m2.put("type", "dd");
								result.add(m2);
							}
						}
						
					}
				}
				
			}
			
			//分批次操作
			List<Map<String,Object>> pici=new ArrayList<Map<String,Object>>();
			for(int i=0;i<result.size();i++){
				pici.add(result.get(i));
				if(pici.size()==100 || i==result.size()-1){
					ics.addBatchService(pici);
					pici.clear();
				}
			}
			
			if(result!=null && result.size()>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：给角色分配权限接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：封装的json字符串：{[{'roleid':1,'menuid':'001'},{'roleid':1,'menuid':'001001'},...]}",required=true,dataType="String",paramType="path"),
		})
	@MethodLog(methodName="保存",remark="角色权限设置的保存")
	@RequestMapping(value="/addBatch",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addBatch(String str,String loginid,Integer roleids){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			JSONArray arr=JSONArray.parseArray(str);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<arr.size();i++){
				Map<String,Object> m1=new HashMap<String,Object>();
				Map<String,Object> m=new HashMap<String,Object>();
				JSONObject obj=arr.getJSONObject(i);
				String type=String.valueOf(obj.get("type"));
				String roleid=String.valueOf(obj.get("roleid"));
				String menuid=String.valueOf(obj.get("menuid"));
				m1.put("roleid", roleid);
				m1.put("menuid", menuid);
				m.put("roleid", roleid);  
				m.put("menuid", menuid);  
				List<Map<String,Object>> exist=ics.getListService(m);
				if(exist==null || exist.size()==0){
					m1.put("type", "aa");
					result.add(m1);
				}else{
					Integer id=Integer.valueOf(String.valueOf(exist.get(0).get("id")));
					if("dd".equals(type)){
						m1.put("type", "dd");
						m1.put("id", id);
						result.add(m1);
					}
				}
			}
			int i=0;
			if(result!=null && result.size()>0){
				i=ics.addBatchService(result);
			}
			if(i>=0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
  
	
	/**
	 * 查询列表
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：主键id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="roleid",value="参数：角色id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="menuid",value="参数：菜单id",required=true,dataType="String",paramType="path")
		})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(ACL_Role_Menu record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("roleid", record.getRoleid());
			m.put("menuid", record.getMenuid());
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	 
	
	@ApiOperation(httpMethod="POST",value="接口说明：查询下拉树接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="roleid",value="参数：角色id",required=true,dataType="Integer",paramType="path")
		})
	@RequestMapping(value="/getTree",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getTree(Integer roleid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("roleid", roleid);
			List<Map<String,Object>> list=ics.getTreeService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 获取登录人的权限
	 * getMyPerm
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询登录人的权限接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="loginid",value="参数：登录人账号id",required=true,dataType="String",paramType="path")
		})
	@RequestMapping(value="/getMyPerm",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getMyPerm(String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("loginid", loginid);
			List<Map<String,Object>> list=ics.getMyPermService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	 
}
