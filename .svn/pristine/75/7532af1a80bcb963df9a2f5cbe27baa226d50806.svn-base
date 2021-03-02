package com.xr.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.configure.MethodLog;
import com.xr.configure.SysOptLog;
import com.xr.entry.NoticeInform;
import com.xr.service.INoticeInformService;
import com.xr.service.INoticeUserService;
import com.xr.tools.ImagePathConfig;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("NoticeInform")
@Api(tags="NoticeInform",description="接口标题：公告类的接口")
@SuppressWarnings("unchecked")
public class NoticeInformController {
    private static Logger logger = LoggerFactory.getLogger(NoticeInformController.class);
	
	@Autowired
	private HttpServletRequest request;
	 
	@Autowired
	private HttpServletResponse response;
	
	@Autowired
	private INoticeInformService ics;
	@Autowired
	private INoticeUserService iuser;
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="title",value="参数：公告标题",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="informer",value="参数：公告发布者",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")})
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,NoticeInform record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("title", record.getTitle());
			m.put("content", record.getContent());
			m.put("filestr", record.getFilestr());
			m.put("informer", loginid);
			List<Map<String,Object>> list=ics.getListService(m);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String id=String.valueOf(m1.get("id"));
				m.clear();
				m.put("noticeid", id);
				List<Map<String,Object>> exist=iuser.getListService(m);
				if(exist!=null && exist.size()>0){
					m1.put("users", exist);
				}
				result.add(m1);
			}
			int count = ics.getListCountService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", result);
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
		@ApiImplicitParam(name="title",value="参数：公告标题",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="content",value="参数：公告内容",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="informer",value="参数：公告发布者",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="str",value="参数：被通知者：字符串数组：['aaa','bbb']",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")
		})
	@MethodLog(methodName="新增",remark="新增公告")
	@SysOptLog(description="新增公告",optCURD="新增")
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> add(NoticeInform record,String[] str,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("content", record.getContent());
			List<Map<String,Object>> exist=ics.getListService(m);
			if(exist!=null && exist.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，该公告已发布了！");
				return map;
			}
			m.put("title", record.getTitle());
			m.put("informer", loginid);
			m.put("arr", str);
			int i=ics.addService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "发布成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "发布失败！");
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
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(MultipartFile file,String obj,String arr,HttpServletRequest req,HttpServletResponse res,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
 		Map<String,Object> m=new HashMap<String,Object>();
		try{
			JSONObject o=JSONObject.parseObject(obj);
			String content=o.getString("content");
			m.put("content", content);
			if(content!=null && !"".equals(content)){
				List<Map<String,Object>> exist1=ics.getListService(m);
				if(exist1!=null && exist1.size()>0){
					map.put("flag", false);
					map.put("reason", "对不起，上传的通知内容不能重复！");
					return map;
				}
			}
			
 			if(file!=null && !file.isEmpty()){
				String contenttype=req.getContentType();//获取请求类型  multipart/form-data; boundary=----WebKitFormBoundaryuCDrjKSwtyJ0TTOL
				String originname=file.getOriginalFilename();//学习HTML5，最牛逼的10本书！.txt
				m.clear();
				m.put("filestr", originname);
				List<Map<String,Object>> exist=ics.getListService(m);
				if(exist!=null && exist.size()>0){
					map.put("flag", false);
					map.put("reason", "对不起，上传的通知文件名称不能重复！");
					return map;
				}
				o.put("filestr", originname);
				//对文件的全名进行截取然后获取后缀名
				int begin=originname.indexOf("."); 
				int last=originname.length();
				String suff=originname.substring(begin,last);
				String name=file.getName();//file
				InputStream is=file.getInputStream();//java.io.FileInputStream@311e29a8
				long len=file.getSize();//4948
				Resource resource=file.getResource();//MultipartFile resource [file]
				byte[] b=file.getBytes();//
				//String filePath = req.getServletContext().getRealPath("/"); 
				//D:\tools\apache-tomcat-8.5.39\webapps\XRArmy\
				//file.transferTo(new File(filePath));
				OutputStream fos=null;
				try{
					String photostr=ImagePathConfig.noticeinformpic;
					File imgPath=new File(photostr);
					if(!imgPath.exists() && !imgPath.isDirectory()){
						imgPath.mkdirs();
					}
					File imgUrl=new File(imgPath+File.separator+originname);
					fos=new FileOutputStream(imgUrl);
					fos.write(b);
					fos.close();
				}catch(Exception e){
					e.printStackTrace();
				}
				
				System.out.println(suff);
				System.out.println(contenttype);
				System.out.println(originname);
				System.out.println(name);
				System.out.println(is);
				System.out.println(b);
			} 
			
			/**
			 * excel:
			 * multipart/form-data; boundary=----WebKitFormBoundaryhOxkb7TMBYP6aDSk
				其他人员导入摸板.xlsx
				file
				java.io.FileInputStream@38901f50
				[B@1a4c7f58
			 */
 			m=o;
 			System.out.println(arr);
			JSONArray arrs=JSONArray.parseArray(arr);
			String[] str=new String[arrs.size()];
			for(int i=0;i<arrs.size();i++){
				str[i]=arrs.getString(i);
			}
			m.put("arr", str);
			int i=ics.addService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "发布成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "发布失败！");
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
		@ApiImplicitParam(name="id",value="参数：公告id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")	
	})
	@MethodLog(methodName="删除",remark="删除公告")
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
	 * 预览
	 * @param id
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：预览接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")	
	})
	@MethodLog(methodName="预览",remark="预览通知文件")
	@RequestMapping(value="/see",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> see(Integer id,String loginid,HttpServletRequest req,HttpServletResponse resp){
		Map<String,Object> map=new HashMap<String,Object>();
		OutputStream os=null;
		try{
			NoticeInform record=ics.selectByPrimaryKeyService(id);
			String filestr=record.getFilestr();
			if(filestr!=null && !"".equals(filestr)){
				String path=ImagePathConfig.noticeinformpic+"/"+filestr;
				String realpath=req.getServletContext().getRealPath("");//E:/facedata/xrarmy/noticeinformpic/智慧军营需求确认1.pdf
				String serverpath=req.getServletPath();///NoticeInform/see
				String servername=req.getServerName();//192.168.1.191
				int serverport=req.getServerPort();//8080
				ServletContext servercontext=req.getServletContext();//
				String contextpath=servercontext.getContextPath();///XRArmy
				String localaddr=req.getLocalAddr();
				String t=req.getProtocol();
				File file=new File(path);
				if(!file.exists()){
					map.put("flag", true);
					map.put("reason", "对不起，预览的附件不存在！");
					return map;
				}
				String fpath=file.getPath();
				String abspath=file.getAbsolutePath();//E:\facedata\xrarmy\noticeinformpic\智慧军营需求确认1.pdf
				String s=file.getParent();//E:\facedata\xrarmy\noticeinformpic
				//读取文件
				InputStream is=new BufferedInputStream(new FileInputStream(path));
				byte[] bytes=new byte[is.available()];
				is.read(bytes);
				is.close();
				resp.reset();
				//设置下载文件名等
				String showFilename=new String(filestr.replaceAll(" ","").getBytes("utf-8"),"iso8859-1");
				String extName=showFilename.substring(showFilename.lastIndexOf(".")).toLowerCase();
				//resp.addHeader("Content-Disposition", "attachment;filename="+showFilename);
				resp.addHeader("Content-Length", ""+file.length());
				//设置内容编码
				//resp.setCharacterEncoding(WAFConstants.CHARSET_DEFAULT);
				//设置响应MIME
				if(".doc".equals(extName)){
					resp.setContentType("application/msword");
				}else if(".docx".equals(extName)){
					resp.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
				}else if(".pdf".equals(extName)){
					resp.setContentType("application/pdf");
				}else if(".xls".equals(extName)){
					resp.setContentType("application/vnd.ms-excel");
				}else if(".xlsx".equals(extName)){
					resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
				}else if(".ppt".equals(extName)){
					resp.setContentType("application/vnd.ms-powerpoint");
				}else if(".pptx".equals(extName)){
					resp.setContentType("application/vnd.openxmlformats-officedocument.presentationml.presentation");
				}else if(".bmp".equals(extName)){
					resp.setContentType("image/bmp");
				}else if(".gif".equals(extName)){
					resp.setContentType("image/gif");
				}else if(".ief".equals(extName)){
					resp.setContentType("image/ief");
				}else if(".jpeg".equals(extName)){
					resp.setContentType("image/jpeg");
				}else if(".jpg".equals(extName)){
					resp.setContentType("image/jpeg");
				}else if(".png".equals(extName)){
					resp.setContentType("image/png");
				}else if(".tiff".equals(extName)){
					resp.setContentType("image/tiff");
				}else if(".tif".equals(extName)){
					resp.setContentType("image/tif");
				} 
				os=new BufferedOutputStream(resp.getOutputStream());
				os.write(bytes);//输出文件
				os.flush();
				resp.flushBuffer();
			}
		}catch(Exception e){
			 e.printStackTrace();
			 System.out.println(e);
		}finally{
			if(os!=null){
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
					System.out.println(e);
				}
			}
		}
		//map.put("flag", true);
		return map;
	}//end
	
	
	/**
	 * 消息提醒
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：公告id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")})
	@RequestMapping("/getMyNotice")
	@ResponseBody
	public Map<String,Object> getMyNotice(String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("userid", loginid);
			m.put("state", "0");
			int count = iuser.getListCountService(m);
			if(count>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", count);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				map.put("result", 0);
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

}
