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
import com.xr.entry.NoticeUser;
import com.xr.service.INoticeUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("NoticeUser")
@Api(tags="NoticeUser",description="接口标题：公告接收者类的接口")
public class NoticeUserController {
    private static Logger logger = LoggerFactory.getLogger(NoticeUserController.class);
	
	@Autowired
	private HttpServletRequest request;
	 
	@Autowired
	private HttpServletResponse response;
	
	@Autowired
	private INoticeUserService ics;
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告接收表id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="noticeid",value="参数：公告id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="userid",value="参数：公告接收者",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="state",value="参数：状态：已读1，未读0",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")})
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,NoticeUser record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("state", record.getState());
			m.put("userid", loginid);
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
		@ApiImplicitParam(name="id",value="参数：公告接收者id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="title",value="参数：公告接收者标题",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="content",value="参数：公告接收者内容",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="userid",value="参数：公告接收者发布者",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@MethodLog(methodName="新增",remark="新增公告接收者")
	@SysOptLog(description="新增公告接收者",optCURD="新增")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(NoticeUser record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
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
	 * 删除
	 * @param id
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告接收者id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")	
	})
	@MethodLog(methodName="删除",remark="删除公告接收者")
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
	
	 
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告接收者id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")	
	})
	@MethodLog(methodName="修改",remark="修改公告状态")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(Integer id,String state,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			NoticeUser record=new NoticeUser();
			record.setId(id);
			record.setState(state);
			int i=ics.updateByPrimaryKeySelectiveService(record); 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	

}
