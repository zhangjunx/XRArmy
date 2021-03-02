package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.configure.SysOptLog;
import com.xr.entry.ACL_Role;
import com.xr.service.IACL_RoleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("ACL_Role")
@Api(tags="ACL_Role",description="接口标题：角色类的接口")
public class ACL_RoleController {
    private static Logger logger = LoggerFactory.getLogger(ACL_RoleController.class);
	
	@Autowired
	private HttpServletRequest request;
	 
	@Autowired
	private HttpServletResponse response;
	
	@Autowired
	private IACL_RoleService ics;
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：角色id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：角色名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path")})
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,ACL_Role record,String rolename){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("name", record.getName());
			m.put("rolename", rolename);
			List<Map<String,Object>> list=ics.getListService(m);
			int count = ics.getListCountService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("count", count);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="name",value="参数：角色名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="新增",remark="新增角色")
	@SysOptLog(description="新增角色",optCURD="新增")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(ACL_Role record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("name", record.getName());
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起， 该角色名已存在了！");
				return map;
			}
			int i=ics.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 修改
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：修改接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：角色id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：角色名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="修改",remark="修改角色")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(ACL_Role record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("name", record.getName());
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()==1){
				Integer id=Integer.valueOf(String.valueOf(list.get(0).get("id")));
				if(!id.equals(record.getId())){
					map.put("flag", false);
					map.put("reason", "对不起， 该角色名已存在了！");
					return map;
				}
			}
			int i=ics.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：角色id",required=false,dataType="Integer",paramType="path")})
	@MethodLog(methodName="删除",remark="删除角色")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(Integer id,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ics.deleteByPrimaryKeyService(id); 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	
	
	

}
