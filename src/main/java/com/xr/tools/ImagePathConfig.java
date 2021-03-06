package com.xr.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ImagePathConfig {
	
	public final static String URL="E:/facedata/xrarmy";
	public final static String peoplepic=URL+"/peoplepic";//人员照片
	public final static String peopletransferpic=URL+"/peopletransferpic";//人员调动照片
	public final static String visitorpic=URL+"/visitorpic";//访客照片
	public final static String peopleiopic=URL+"/peopleiopic";//人员进出记录照片
	public final static String blackpeoplepic=URL+"/blackpeoplepic";//黑名单人员照片
	public final static String blackcarpic=URL+"/blackcarpic";//黑名单车辆照片
	public final static String alarmpeoplepic=URL+"/alarmpeoplepic";//人员报警照片
	public final static String alarmcarpic=URL+"/alarmcarpic";//车辆报警照片
	public final static String carpic=URL+"/carpic";//车辆照片
	public final static String cariopic=URL+"/cariopic";//车辆进出记录照片
	public final static String noticeinformpic=URL+"/noticeinformpic";//通知公告上传word，pdf,excel,图片等存储路径
	
	private final static SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
	
	public static void main(String[] args) {
		 
	}
	
	/**
	 * 将base64转图片，并存到指定文件夹下，
	 */
	public static String base64ToPath(String base64,String path,String holderno){
		String filename="";
		String rgex="data:image/(.*?);base";
		String type=getSubUtilSimple(base64, rgex);
		if(type.equals("") || type=="" || type==null){
			type="jpg";
		}
		String[] arr=base64.split(",");
		String str=base64;
		if(arr.length>1){
			str=arr[1];
		}
		OutputStream os=null;
		try{
			//判断文件夹是否存在，如果不存在创建文件夹
			File file=new File(path);
			if(!file.exists() && !file.isDirectory()){
				file.mkdirs();
			}
			filename=holderno+"."+type;//sdf.format(new Date())+"_"+holderno+"."+type;
			//把图片转二进制
			Base64.Encoder encoder=Base64.getEncoder();
			Base64.Decoder decoder=Base64.getDecoder();
			byte[] b=decoder.decode(str);
			File imgfile=new File(file+File.separator+filename);
			//图片保存到文件夹
			byte[] bytes=decoder.decode(encoder.encodeToString(b));
			os=new FileOutputStream(imgfile);
			os.write(bytes);
		}catch(Exception ex){
			System.out.println(ex);
		}finally{
			if(os!=null){
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return filename;
	}
	
	
	
	/**
	 * 根据图片文件夹路径：读取图片
	 */
	public static String  readPicPath(String imgUrl){
		String base64="";
		FileInputStream is=null;
		try{
			File file=new File(imgUrl);
			byte[] bytes=null;
			Base64.Encoder encoder=Base64.getEncoder();
			int index=imgUrl.lastIndexOf(".");
			String str=imgUrl.substring(index+1);
			String sup="data:image/"+str+";base64,";
			if(!file.exists()){
				return null;
			}
			is=new FileInputStream(file);
			bytes=new byte[is.available()];
			is.read(bytes);
			is.close();
			//读取图片字节数组
			if(bytes==null || bytes.length==0){
				return null;
			}
			base64=encoder.encodeToString(bytes);
			if(base64==null || "".equals(base64)){
				return null;
			}
			base64=sup+base64;
		}catch(Exception ex){
			System.out.println(ex);
		}
		return base64;
	}
	
	/**
	 * 定义一个正则表达式的帅选规则，为了获取图片的类型
	 * 
	 */
	private static String getSubUtilSimple(String base64,String rgex){
		Pattern pattern=Pattern.compile(rgex);
		Matcher m=pattern.matcher(base64);
		while(m.find()){
			return m.group(1);
		}
		return "";
	}
	
	
	
	

}
