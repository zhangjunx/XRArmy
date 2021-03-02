package com.xr.tools;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class BasePDF {
    /**
     *将base64编码内容转pdf
     *base64编码内容，文件的存储路径（含文件名）
     * @param base64
     * @param filepath
     */
	public static void base64ToPDF(String base64,String filepath){
		BASE64Decoder decoder=new BASE64Decoder();
		BufferedInputStream bis=null;
		FileOutputStream fos=null;
		BufferedOutputStream bos=null;
		try{
			byte[] bytes=decoder.decodeBuffer(base64);//base64编码内容转字节数组
			ByteArrayInputStream bais=new ByteArrayInputStream(bytes);
			bis=new BufferedInputStream(bais);
			File file=new File(filepath);
			File path=file.getParentFile();
			if(!path.exists()){
				path.mkdirs();
			}
			fos=new FileOutputStream(file);
			bos=new BufferedOutputStream(fos);
			byte[] b=new byte[1024];
			int len=bis.read(b);
			while(len!=-1){
				bos.write(b, 0, len);
				len=bis.read(b);
			}
			bos.flush();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try {
				if(bis!=null){
					bis.close();
				}
				if(fos!=null){
					fos.close();
				}
				if(bos!=null){
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * pdf转base64
	 * @param file
	 */
	public static String pdfToBase64(File file){
		BASE64Encoder encoder=new BASE64Encoder();
		FileInputStream fis=null;
		BufferedInputStream bis=null;
		ByteArrayOutputStream baos=null;
		BufferedOutputStream bos=null;
		try{
			fis=new FileInputStream(file);
			bis=new BufferedInputStream(fis);
			baos=new ByteArrayOutputStream();
			bos=new BufferedOutputStream(baos);
			byte[] b=new byte[1024];
			int len=bis.read(b);
			while(len!=-1){
				bos.write(b, 0, len);
				len=bis.read(b);
			}
			//刷新此输出流并强制写出所有缓冲的输出字符
			bos.flush();
			byte[] bytes=baos.toByteArray();
			return encoder.encodeBuffer(bytes).trim();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try{
				fis.close();
				bis.close();
				bos.close();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return null;
	}
}
