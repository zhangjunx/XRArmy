package com.xr.controller;

import java.util.ArrayList;
import java.util.Date;
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
import com.xr.entry.HolderData;
import com.xr.entry.SynBoxRecord;
import com.xr.service.IBoxDataService;
import com.xr.service.IHolderDataService;
import com.xr.service.ISynBoxRecordService;
import com.xr.tools.ImagePathConfig;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("SynBoxRecord")
@Api(tags="SynBoxRecord",description="接口标题：同步记录类的接口")
public class SynBoxRecordController {
    private static Logger logger = LoggerFactory.getLogger(SynBoxRecordController.class);
	
	private HttpServletRequest request;
	 
	private HttpServletResponse response;
	
	@Autowired
	private ISynBoxRecordService ics;
	@Autowired
	private IHolderDataService ihds;
	@Autowired
	private IBoxDataService ibds;
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,SynBoxRecord record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", record.getBoxid());
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
	 * getSynHolder
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getSynHolder")
	@ResponseBody
	public Map<String,Object> getSynHolder(Integer curpage,Integer pagesize,String boxid,String synstatus,String state,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("state", state);
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", boxid);
			m.put("synstatus", synstatus);
			List<Map<String,Object>> list=ics.getSynHolderService(m);
			int count = ics.getSynHolderCountService(m);
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+str;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				data.add(m1);
			}
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", data);
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
	 * getSynHolder
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getSynBlack")
	@ResponseBody
	public Map<String,Object> getSynBlack(Integer curpage,Integer pagesize,String boxid,String synstatus,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", boxid);
			m.put("synstatus", synstatus);
			List<Map<String,Object>> list=ics.getSynBlackService(m);
			int count = ics.getSynBlackCountService(m);
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.blackpeoplepic+"/"+str;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				data.add(m1);
			}
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", data);
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
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getBlack")
	@ResponseBody
	public Map<String,Object> getBlack(HolderData record,String loginid,String boxid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			m.put("boxid", boxid);
			List<Map<String,Object>> list=ics.getBlackService(m);
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.blackpeoplepic+"/"+str;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				data.add(m1);
			}
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", data);
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
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getHolder")
	@ResponseBody
	public Map<String,Object> getHolder(HolderData record,String loginid,String boxid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			m.put("state", record.getState());
			m.put("boxid", boxid);
			List<Map<String,Object>> list=ics.getHolderService(m);
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+str;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				data.add(m1);
			}
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", data);
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
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@MethodLog(methodName="新增",remark="新增同步记录")
	@SysOptLog(description="新增同步记录",optCURD="新增")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(String photostr,String state,String boxid,String boxip,String holderno,String holdername,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(photostr!=null && !"".equals(photostr)){
				String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
				if("B".equals(state)){
					imgUrl=ImagePathConfig.blackpeoplepic+"/"+photostr;
				}
				String base64=ImagePathConfig.readPicPath(imgUrl);
				if(base64!=null && !"".equals(base64)){
					int res=PlatBoxSyn.addSyn(holderno,holdername,boxip,base64);
					if(res==1){
						SynBoxRecord record=new SynBoxRecord();
						record.setState(state);
						record.setMessage("同步成功！");
						record.setBoxid(boxid);
						record.setBoxip(boxip);
						record.setPhotostr(photostr);
						record.setHolderno(holderno);
						record.setHoldername(holdername);
						ics.insertSelectiveService(record);
						map.put("reason", "同步成功！");
						map.put("flag", true);
					}else{
						map.put("flag", false);
						map.put("reason", "同步失败！");
					}
				}else{
					map.put("flag", false);
					map.put("reason", "同步失败！");
				}
				
			}else{
				map.put("flag", false);
				map.put("reason", "同步失败！");
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
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path")})
	@MethodLog(methodName="删除",remark="删除同步记录")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(Integer id,String boxip,String boxid,String state,String holderno,String holdername,String photostr,String type,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(type.equals("uu")){
				if(photostr!=null && !"".equals(photostr)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
					if("B".equals(state)){
						imgUrl=ImagePathConfig.blackpeoplepic+"/"+photostr;
					}
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						int res=PlatBoxSyn.editSyn(holderno, holdername, boxip, base64);
						if(res==1){
							SynBoxRecord record=new SynBoxRecord();
							record.setId(id);
							record.setBoxid(boxid);
							record.setBoxip(boxip);
							record.setHoldername(holdername);
							record.setPhotostr(photostr);
							record.setUpdatedate(new Date());
							ics.updateByPrimaryKeySelectiveService(record);
							map.put("reason", "同步成功！");
							map.put("flag", true);
						}else if(res==2){
							ics.deleteByPrimaryKeyService(id);
							map.put("reason", "同步成功！");
							map.put("flag", true);
						}else{
							map.put("reason", "同步失败！");
							map.put("flag", false);
						}
					}
				}
			}else if(type.equals("dd")){
				int res=PlatBoxSyn.delSyn(holderno, boxip);
				if(res==1){
					ics.deleteByPrimaryKeyService(id);
					map.put("reason", "取消同步成功！");
					map.put("flag", true);
				}else{
					map.put("reason", "取消同步失败！");
					map.put("flag", false);
				}
			}
			
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	
	
	

}
