package com.xr.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xr.tools.FileHandleUtils;

@Controller
@RequestMapping("FileHandleUtilsController")
public class FileHandleUtilsController {

	
	/**
	 * 文件在线预览 
	 */
	/*@RequestMapping(value = "view", method = RequestMethod.GET)
	public void view(String fileId,HttpServletResponse response){
		try{
			//根据文件id查找文件信息
			FileUpload fileUpload=null;//fileService.findFile(fileId);
			if(fileUpload!=null){
				response.setContentType("text/html;charset=utf-8");
				PrintWriter out=response.getWriter();
				String message="<div style='width:100%;text-align:center;color:red;'>文件不存在</div>";
				out.write(message);
				out.close();
				return;
			}
			String fileExtension=fileUpload.getFileEntity().getFileExtension();
			String path=fileUpload.getFileEntity().getFilePath();
			String filename=path+fileUpload.getFileEntity().getFileId()+fileExtension;
			String outputfile=path+"sample.html";
			//判断文件类型
			if(".doc".equals(fileExtension)){
				FileHandleUtils.docToHtml(path, filename, outputfile);
			}else if(".docx".equals(fileExtension)){
				FileHandleUtils.docxToHtml(path, filename, outputfile);
			}else if(".xls".equals(fileExtension)){
				FileHandleUtils.HSSFToHtml(path, filename, outputfile);
			}else if(".pdf".equals(fileExtension)){
				FileCopyUtils.copy(new FileInputStream(filename), response.getOutputStream());
			}else{
				response.setContentType("text/html;charset=utf-8");
				PrintWriter out=response.getWriter();
				String message="<div style='width:100%;text-align:center;color:red;'>抱歉！当前文件格式不支持预览</div>";
				out.write(message);
				out.close();
				return;
			}
			//将生成的html文件返回给前端页面
			FileCopyUtils.copy(new FileInputStream(outputfile),response.getOutputStream());
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}*/
	 
	
	
	 
}
