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
import com.xr.entry.HolderLeave;
import com.xr.entry.IssueRecord;
import com.xr.entry.VisitorsInfo;
import com.xr.service.IBoxDataService;
import com.xr.service.IDeviceUnitService;
import com.xr.service.IHolderDataService;
import com.xr.service.IIssueRecordService;
import com.xr.tools.ImagePathConfig;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("IssueRecord")
@Api(tags="IssueRecord",description="接口标题：权限下发记录类的接口")
public class IssueRecordController {
    private static Logger logger = LoggerFactory.getLogger(IssueRecordController.class);
	
	private HttpServletRequest request;
	 
	private HttpServletResponse response;
	
	@Autowired
	private IIssueRecordService ics;
	@Autowired
	private IHolderDataService ihds;
	@Autowired
	private IBoxDataService ibds;
	@Autowired
	private IDeviceUnitService idus;
	

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
	public Map<String,Object> getList(Integer curpage,Integer pagesize,IssueRecord record,String loginid){
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
	@RequestMapping("/getSynHolder")
	@ResponseBody
	public Map<String,Object> getSynHolder(Integer curpage,Integer pagesize,IssueRecord record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", record.getBoxid());
			m.put("state", record.getState());
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			List<Map<String,Object>> list=ics.getSynHolderService(m);
			int count = ics.getSynHolderCountService(m);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 请假人员
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
	@RequestMapping("/getSynLeave")
	@ResponseBody
	public Map<String,Object> getSynLeave(Integer curpage,Integer pagesize,IssueRecord record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", record.getBoxid());
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			List<Map<String,Object>> list=ics.getSynLeaveService(m);
			int count = ics.getSynLeaveCountService(m);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 请假人员
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
	@RequestMapping("/getSynVisit")
	@ResponseBody
	public Map<String,Object> getSynVisit(Integer curpage,Integer pagesize,IssueRecord record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("boxid", record.getBoxid());
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			List<Map<String,Object>> list=ics.getSynVisitService(m);
			int count = ics.getSynVisitCountService(m);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 人员
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getHolder")
	@ResponseBody
	public Map<String,Object> getHolder(HolderData record,String state,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("state", state);
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
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getVisit")
	@ResponseBody
	public Map<String,Object> getVisit(VisitorsInfo record,String loginid,String boxid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", record.getVisitorsname());
			m.put("holdername", record.getVisitorsreasontext());
			m.put("boxid", boxid);
			List<Map<String,Object>> list=ics.getVisitService(m);
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.visitorpic+"/"+str;
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
		@ApiImplicitParam(name="id",value="参数：同步记录id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="boxip",value="参数：同步记录ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getLeave")
	@ResponseBody
	public Map<String,Object> getLeave(HolderLeave record,String loginid,String boxid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			m.put("state", record.getState());
			m.put("boxid", boxid);
			List<Map<String,Object>> list=ics.getLeaveService(m);
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
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(String photostr,String state,String groupid,String holderno,String holdername,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			if(photostr!=null && !"".equals(photostr)){
				String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
				if("V".equals(state)){
					imgUrl=ImagePathConfig.visitorpic+"/"+photostr;
				}
				String base64=ImagePathConfig.readPicPath(imgUrl);
				if(base64!=null && !"".equals(base64)){
					base64=base64.split(",")[1];
					m.clear();
					m.put("groupid", groupid);
					List<Map<String,Object>> list=ics.getGroupDevService(m);
					if(list!=null){
						for(int i=0;i<list.size();i++){
							Map<String,Object> m1=list.get(i);
							String ip=String.valueOf(m1.get("ip"));
							String user=String.valueOf(m1.get("username"));
							String pass=String.valueOf(m1.get("userpass"));
							String devicetype=String.valueOf(m1.get("devicetype"));
							String devicevender=String.valueOf(m1.get("devicevender"));
							String port=String.valueOf(m1.get("port"));
							String boxip=String.valueOf(m1.get("boxid"));
							m1.put("holderno", holderno);
							m1.put("holdername", holdername);
							m1.put("photostr", photostr);
							m1.put("state", state);
							m1.put("boxid", 1);
							//表示不存在  调用下发接口
							int t=PlatBoxSyn.setFace(boxip, ip, user, pass, holderno, holdername, base64, devicetype, devicevender, port);
							if(t==1){
								m1.put("type", "aa");
								data.add(m1);
								ics.addService(data);
							}else if(t==3){
								//信息存在，照片不存在
								t=PlatBoxSyn.delFace(boxip, ip, user, pass, holderno, devicetype, devicevender, port);
								if(t==1){
									m1.put("type", "dd");
									data.add(m1);
									ics.addService(data);
								}
							}
							map.put("reason", "下发成功！");
							
						}
					}else{
						map.put("reason", "下发失败，权限组下面未绑定设备！");
					}
					 
					 
				}else{
					map.put("flag", false);
					map.put("reason", "下发失败，照片不能为空！");
				}
				
			}else{
				map.put("flag", false);
				map.put("reason", "下发失败，照片不能为空！");
			}
			
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		map.put("data", data);
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
	public Map<String,Object> delete(Integer id,String state,String type,String holderno,String holdername,String photostr,String deviceno,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			m.put("deviceno", deviceno);
			List<Map<String, Object>> list=idus.getListService(m);
			if(list!=null && list.size()==1){
				Map<String,Object> m1=list.get(0);
				if(state.equals("V")){
					holderno=holderno.substring(2);
				}else if(state.equals("L")){
					System.out.println("请假人员");
				}
				String ip=String.valueOf(m1.get("ip"));
				String user=String.valueOf(m1.get("username"));
				String pass=String.valueOf(m1.get("userpass"));
				String devicetype=String.valueOf(m1.get("devicetype"));
				String devicevender=String.valueOf(m1.get("devicevender"));
				String port=String.valueOf(m1.get("port"));
				String boxip=String.valueOf(m1.get("boxid"));
				if(type.equals("dd")){
					int t=PlatBoxSyn.delFace(boxip, ip, user, pass, holderno, devicetype, devicevender, port);
					if(t==1){
						m1.put("id", id);
						m1.put("state", state);
						m1.put("type", "dd");
						data.add(m1);
						ics.addService(data);
						map.put("reason", "移除成功");
					}
				}else if(type.equals("uu")){
					int t=PlatBoxSyn.delFace(boxip, ip, user, pass, holderno, devicetype, devicevender, port);
					if(t==1){
						m1.put("id", id);
						m1.put("state", state);
						m1.put("type", "dd");
						data.add(m1);
						int tt=ics.addService(data);
						if(tt>0){
							if(photostr!=null && !"".equals(photostr)){
								String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
								if("V".equals(state)){
									imgUrl=ImagePathConfig.visitorpic+"/"+photostr;
								}
								String base64=ImagePathConfig.readPicPath(imgUrl);
								if(base64!=null && !"".equals(base64)){
									base64=base64.split(",")[1];
							      t=PlatBoxSyn.setFace(boxip, ip, user, pass, holderno, holdername, base64, devicetype, devicevender, port);
							      if(t==1){
							    	  ics.addService(data);
							      }
								}
							}
						}
						map.put("reason", "移除成功");
					}
				}
			}else{
				map.put("reason", "操作失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	/**
	 * 根据权限组id查询设备权限
	 * getGroupDev
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：根据权限组id查询设备权限接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="groupid",value="参数：通行权限组id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录id",required=true,dataType="String",paramType="path")
		})
	@MethodLog(methodName="查询",remark="根据权限组id查询设备权限")
	@RequestMapping(value="/getGroupDev",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getGroupDev(Integer groupid,String state,String holderno,String holdername,String photostr,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(photostr!=null && !"".equals(photostr)){
				String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
				if(state.equals("V")){
					imgUrl=ImagePathConfig.visitorpic+"/"+photostr;
				}
				String base64=ImagePathConfig.readPicPath(imgUrl);
				if(base64!=null && !"".equals(base64)){
					List<Map<String,Object>> list=ics.getGroupDevService(m);
					int res=0;//PlatBoxSyn.addFace(holderno, holdername, boxip, base64);
					if(res==1){
						IssueRecord record=new IssueRecord();
						record.setHoldername(holdername);
						record.setPhotostr(photostr);
						record.setUpdatedate(new Date());
						ics.updateByPrimaryKeySelectiveService(record);
						map.put("reason", "同步成功！");
						map.put("flag", true);
					}
				}
			}
			
			/*if(state.equals("uu")){
				if(photostr!=null && !"".equals(photostr)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
					if("B".equals(state)){
						imgUrl=ImagePathConfig.blackpeoplepic+"/"+photostr;
					}
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						int res=PlatBoxSyn.editSyn(holderno, holdername, boxip, base64);
						if(res==1){
							IssueRecord record=new IssueRecord();
							record.setId(id);
							//record.setBoxid(boxid);
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
			}*/
			
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	

}
