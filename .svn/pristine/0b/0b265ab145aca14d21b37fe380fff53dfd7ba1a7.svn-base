package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.entry.AreaList;
import com.xr.service.IAreaListService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("AreaList")
@Api(tags="AreaList",description="接口标题：区域层接口")
public class AreaListController {
	@Autowired
	private IAreaListService ics;
	
	@ApiOperation(httpMethod="POST",value="接口说明：修改接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="areaid",value="参数：主键id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="areaname",value="参数：区域名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="新增机构")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(AreaList record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			AreaList area=ics.selectByPrimaryKeyService(record.getAreaid());
			if(area!=null && !"".equals(area)){
				map.put("flag", false);
				map.put("reason", "对不起，该编码已存在！");
				return map;
			}
			m.put("areaname", record.getAreaname());
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，区域名称不能重复！");
				return map;
			}
			String areaid=record.getAreaid();
			String d=areaid.substring(areaid.length()-3);
			Integer tt=Integer.parseInt(d);
			record.setSort(String.valueOf(tt));
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
	
	 
	@ApiOperation(httpMethod="POST",value="接口说明：修改接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="areaid",value="参数：主键id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="areaname",value="参数：区域名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="修改机构")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(AreaList record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("areaname", record.getAreaname());
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()>0){
				String id=String.valueOf(list.get(0).get("areaid"));
				if(!id.equals(record.getAreaid())){
					map.put("flag", false);
					map.put("reason", "对不起，区域名称不能重复！");
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
	
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="areaid",value="参数：主键id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
	})
	@MethodLog(methodName="删除",remark="删除机构")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(String areaid,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("parentid", areaid);
			List<Map<String,Object>> list=ics.getListService(m);
			if(list!=null && list.size()>0){
				map.put("flag", false);
				map.put("reason", "该机构存在下一级，不能删除！");
				return map;
			}
			int i=ics.deleteByPrimaryKeyService(areaid); 
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
	
	/**
	 * 查询列表
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="areaid",value="参数：主键id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="areaname",value="参数：区域名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
	})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(AreaList record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			//m.put("loginid", loginid);
			m.put("areaid", record.getAreaid());
			m.put("areaname",record.getAreaname());
			m.put("parentid", record.getParentid());
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
	
	
	 
	
	/**
	 * 获取下一个区域id
	 * @param parentno
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：获取下一个id接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="parentid",value="参数：父级id",required=false,dataType="String",paramType="path")
	})
	@RequestMapping(value="/getNextid",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getNextid(String parentid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("parentid", parentid);
			String maxid=ics.getNextidService(m);
			String nextid="";
			if((parentid==null || "".equals(parentid) || "0".equals(parentid)) && (maxid==null || "".equals(maxid))){
				nextid="001";
			}else if((parentid==null || "".equals(parentid) || "0".equals(parentid)) && (maxid!=null && !"".equals(maxid))){
				String s=maxid.substring(maxid.length()-3);
				Integer t=Integer.valueOf(s)+1;
				if(t<10){
					nextid="00"+t;
				}else if(t>=10 && t<100){
					nextid="0"+t;
				}else if(t>=100 && t<1000){
					nextid=String.valueOf(t);
				}else{
					map.put("flag", false);
					map.put("reason", "对不起，子区域已达到最大值999！");
					map.put("result", maxid);
					return map;
				}
			}else if((parentid!=null && !"".equals(parentid) && !"0".equals(parentid)) && (maxid!=null && !"".equals(maxid))){
				String s=maxid.substring(maxid.length()-3);
				Integer t=Integer.valueOf(s)+1;
				if(t<10){
					nextid=parentid+"00"+t;
				}else if(t>=10 && t<100){
					nextid=parentid+"0"+t;
				}else if(t>=100 && t<1000){
					nextid=parentid+t;
				}else{
					map.put("flag", false);
					map.put("reason", "对不起，子区域已达到最大值999！");
					map.put("result", maxid);
					return map;
				}
			}else if((parentid!=null && !"".equals(parentid) && !"0".equals(parentid)) && (maxid==null || "".equals(maxid))){
				nextid=parentid+"001";
			}
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", nextid);
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	
	/**
	 * 获取区域树
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：下拉树接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
	})
	@RequestMapping(value="/getTree",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getTree(String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
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

	 
}
