package com.xr.tools;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MultipartFilter;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import net.coobird.thumbnailator.Thumbnails;

/*获取图片尺寸和截图工具*/
public class ImageSizeUtil {
    private final static Logger logger=LoggerFactory.getLogger(ImageSizeUtil.class);
    
    public static byte[] getFileBytes(MultipartFile params){
    	//MultipartFile oldFile=params;
    	byte[] imageBytes=null;
    	try {
    		//获取图片最长边长度
        	int lengthSize=62;//getImageLengthOfSide(params);62.96*1024=64479
        	//int lenSize=getImageLengthOfSide(params);
			byte[] photo=params.getBytes();
			imageBytes=compressPicForScale(photo,lengthSize);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return imageBytes;
    }
    
    public static byte[] byteToPress(byte[] photo){
    	byte[] imageBytes=null;
    	try {
    		//获取图片最长边长度
        	int lengthSize=62;//getImageLengthOfSide(params);62.96*1024=64479
			imageBytes=compressPicForScale(photo,lengthSize);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return imageBytes;
    }
    
    
    /*获取图片最长边长度*/
    public static int getImageLengthOfSide(MultipartFile params){
    	int lengthSize=0;
    	Map<String,Integer> result=new HashMap<String,Integer>();
    	long beginTime=new Date().getTime();
    	//获取图片格式
    	String suffixName=getSuffixNameInfo(params);
		try {
			Iterator<ImageReader> readers=ImageIO.getImageReadersByFormatName(suffixName);
	    	ImageReader reader=readers.next();
	    	ImageInputStream iis = ImageIO.createImageInputStream(params.getInputStream());
	    	reader.setInput(iis,true);
	    	result.put("width", reader.getWidth(0));
	    	result.put("height", reader.getHeight(0));
	    	if(reader.getWidth(0)>reader.getHeight(0)){
	    		lengthSize=reader.getWidth(0);
	    	}else{
	    		lengthSize=reader.getHeight(0);
	    	}
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	return lengthSize;
    }//end

    /*获取图片格式*/
    public static String getSuffixNameInfo(MultipartFile params) {
		String result="";
		// 图片后缀
		String suffixName=params.getOriginalFilename().substring(params.getOriginalFilename().lastIndexOf("."));
		if(suffixName.indexOf("png")>0){
			result="png";
		}else if(suffixName.indexOf("jpg")>0){
			result ="jpg";
		}else if(suffixName.indexOf("jpeg")>0){
			result="jpeg";
		}
		return result;
	}//end
	
	/*
	 * 根据指定大小压缩图片 
	 * @param imageBytes 源图片字节数组
	 * @param desFileSize 指定图片大小，单位kb
	 * @return 压缩质量后的图片字节数组
	 * */
	public static byte[] compressPicForScale(byte[] imageBytes,long desFileSize){
		System.out.println("imageBytes=="+imageBytes);
		System.out.println("imageBytes.length=="+imageBytes.length);
		System.out.println("desFileSize*1024=="+desFileSize*1024);
	    if(imageBytes==null || imageBytes.length<=0 || imageBytes.length<desFileSize*1024){
			return imageBytes;
		}
		long srcSize=imageBytes.length;
		long srcsize=srcSize/1024;
		//double accuracy=getAccuracy(srcSize/1024);//0.85
		double accuracy=getAccuracy(srcsize);//0.85
		try {
			while(imageBytes.length>desFileSize*1024){
				ByteArrayInputStream bis=new ByteArrayInputStream(imageBytes);
				ByteArrayOutputStream bos=new ByteArrayOutputStream(imageBytes.length);
				//按比例压缩
				Thumbnails.of(bis).scale(accuracy).outputQuality(accuracy).toOutputStream(bos);
				imageBytes=bos.toByteArray();
			}
			logger.info("图片压缩imageId={} | 图片原大小={}kb | 压缩后大小={}kb","",srcSize/1024,imageBytes.length/1024);
		} catch (IOException e) {
			logger.error("图片压缩msg=图片压缩失败！",e);
		}
		return imageBytes;
	}//end

	/*
	 * 自动调节精度（经验数值）
	 * @param size 原图片大小，单位KB
	 * @return 图片压缩质量比*/
	public static double getAccuracy(long size) {
		double accuracy;
		if(size<900){
			accuracy=0.6;//0.85;
		}else if(size<2047){
			accuracy=0.25;//0.8;
		}else if(size<3275){
			accuracy=0.2;//0.7
		}else{
			accuracy=0.1;//0.4;
		}
		return accuracy;
	}//end
	
	/*base64  转Multipartfile
	 * @param base64
	 * @return
	 * */
	@SuppressWarnings("restriction")
	public static MultipartFile base64ToMultipart(String base64){
		//注意base64是否有头信息，如：data:image/jpeg;base64,...
		try {
			String[] baseStrs=base64.split(",");
			if(baseStrs.length==2){
				base64=baseStrs[1];
			} 
			BASE64Decoder decoder=new BASE64Decoder();
			byte[] b=new byte[0];
			b=decoder.decodeBuffer(base64);
			for(int i=0;i<b.length;++i){
				if(b[i]<0){
					b[i]+=256;
				}
			}
			return new BASE64DecodedMultipartFile(b,baseStrs[0]);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}//end
	
	/*压缩图片
	 * @return
	 * */
	public static MultipartFile[] byte2Base64StringFun(MultipartFile[] fileImg){
		MultipartFile[] result=fileImg;
		//获取图片最长边
		int imageLengthSize=ImageSizeUtil.getImageLengthOfSide(fileImg[0]);
		Long swd=fileImg[0].getSize();
		if(imageLengthSize>4096 || swd>2500000){
			BASE64Encoder encoder=new BASE64Encoder();
			String imgData1=null;
			try{
				InputStream is=fileImg[0].getInputStream();
				byte[] imgData=ImageSizeUtil.compressPicForScale(getByteArray(is), 2000);
				imgData1="data:"+fileImg[0].getContentType()+";base64,"+encoder.encode(imgData);
				MultipartFile def=ImageSizeUtil.base64ToMultipart(imgData1);
				result[0]=def;
			}catch(IOException e){
				e.printStackTrace();
			}
		}
		return result;
	}//end
	
	/**
	 * 将base64转化为图片 并存到指定路径 
	 */
	public static String base64ToFilePath(String base64){
		String rgex="data:image/(.*?);base64";
		String type=getSubUtilSimple(base64,rgex);
		String[] arr=base64.split(",");
		String str=arr[1];
		OutputStream os=null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		String nowdate=sdf.format(new Date());
		//把图片转为二进制
		Base64.Encoder encoder=Base64.getEncoder();
		Base64.Decoder decoder=Base64.getDecoder();
		byte[] b=decoder.decode(str);

		//生成路径
		String path="C:"+File.separator+"XYRK"+File.separator+nowdate+File.separator;
		
		//随机生成图片的名字，同时根据类型结尾
		long time=new Date().getTime();
		//生成随机数
		int random=new Random().nextInt(900)+100;
     	String filename=String.valueOf(random)+"."+type;
		File file=new File(path);
		if(!file.exists() && !file.isDirectory()){
			file.mkdirs();
		}
		File imageFile=new File(path+File.separator+filename);
		//保存
		byte[] bs=null;
		try {
			bs=decoder.decode(encoder.encodeToString(b));
			os=new FileOutputStream(imageFile);
			os.write(bs);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(os!=null){
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		String strpath=path+filename;
		return strpath;
	}
	
	/**
	 * 将base64转化为图片 并存到指定路径 
	 */
	public static String base64ToPath(String base64,String storagepath){
		String rgex="data:image/(.*?);base64";
		String type=getSubUtilSimple(base64,rgex);
		String[] arr=base64.split(",");
		String str=arr[1];
		OutputStream os=null;
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		String nowdate=sdf.format(new Date());
		//把图片转为二进制
		Base64.Encoder encoder=Base64.getEncoder();
		Base64.Decoder decoder=Base64.getDecoder();
		byte[] b=decoder.decode(str);

		File storagefilepath=new File(storagepath);
		//生成路径
		String path=storagefilepath+File.separator+nowdate+File.separator;
		
		//随机生成图片的名字，同时根据类型结尾
		long time=new Date().getTime();
		//生成随机数
		int random=new Random().nextInt(900)+100;
     	String filename=String.valueOf(random)+"."+type;
		File file=new File(path);
		if(!file.exists() && !file.isDirectory()){
			file.mkdirs();
		}
		File imageFile=new File(path+File.separator+filename);
		//保存
		byte[] bs=null;
		try {
			bs=decoder.decode(encoder.encodeToString(b));
			os=new FileOutputStream(imageFile);
			os.write(bs);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(os!=null){
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		String strpath=path+filename;
		return strpath;
	}
	
	/**
	 * 定义一个正则表达式的帅选规则，为了获取图片的类型
	 * @param base64
	 * @param rgex
	 * @return
	 */
	private static String getSubUtilSimple(String base64, String rgex) {
		Pattern pattern=Pattern.compile(rgex);
		Matcher m=pattern.matcher(base64);
		while(m.find()){
			return m.group(1);
		}
		return "";
	}
	
	
	/**
	 * 将图片路径转化为base64字符串
	 * d:/img/a.png
	 */
	public static String pathToBase64Str(String imgURL){
		String base64=null;
		File file=new File(imgURL);
		InputStream is=null;
		byte[] bytes=null;
		Base64.Encoder encoder=Base64.getEncoder();
		int index=imgURL.lastIndexOf(".");
		String str=imgURL.substring(index+1);
		String sup="data:image/"+str+";base64,";
		try {
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
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(is!=null){
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return base64;
	}
	
	//遍历文件夹下的所有目录和文件 并将所有的人脸图片返回
	public static List<String> getImgPathlist(File file){
		//File file=new File(path);//获取file对象
		File[] files=file.listFiles();//遍历path下的目录和文件，放在File数组中
		List<String> arrlist=new ArrayList<String>();
		for(File f:files){
			if(!f.isDirectory()){
				 String name=f.getName();
				 String[]  arr=name.replaceAll("(.jpg|.png|.bmp|.gif)", "").split("_");
				 int len=arr.length;  
				 if(len>3){
					 arrlist.add(f.toString());
					 //System.out.println(f);
				 }else{
					 //System.out.println("len="+len+";"+f);
				 }
			}else{
				getImgPathlist(f);
			}
		}
		return arrlist;
	}
	
	
	/**
	 * 根据文件夹目录删除文件下的图片
	 * 
	 */
	public static void deleteImgFile(String path){
		File file=new File(path);
		if(file.isDirectory()){//判断file是否是文件目录 若是返回true
			String[] name=file.list();//name存储file文件夹中的文件名
			for(int i=0;i<name.length;i++){
				File f=new File(path,name[i]);//此时就得到文件夹中的文件
				f.delete();//删除文件
			}
		}else{
			file.delete();//如果是文件直接删除
		}
	}
	
	/**
	 * 将图片数据转成base64字符串
	 */
	public static String byteToString(String imgUrl){
		try {
			FileInputStream fis=new FileInputStream(imgUrl);
			byte[] bytes=new byte[fis.available()];
			fis.read(bytes);
			fis.close();
			String base64=new BASE64Encoder().encode(bytes);
			return base64;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 将一个base64字符串转成一个字节数组
	 */
	public static byte[] stringToBytes(String base64){
		try {
			BASE64Decoder decoder=new BASE64Decoder();
			byte[] bytes= decoder.decodeBuffer(base64);
			return bytes;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * @param front 拼接后在前面的数组
	 * @param after  拼接后在后面的数组
	 * @return 拼接后的数组
	 */
	public static byte[] connectBytes(byte[] front,byte[] after){
		byte[] result=new byte[front.length+after.length];
		System.arraycopy(front, 0, result, 0, after.length);
		System.arraycopy(after, 0, result, front.length, after.length);
		return result;
	}
	
	
	
	/**
	   *  参数为照片的目录路径+文件名称+文件后缀
	   * @param imgFile
	   * @return
	   */
	  public static String GetImageStr(String imgFile) {//将图片文件转化为字节数组字符串，并对其进行Base64编码处理
	    InputStream in = null;
	    byte[] data = null;
	    String base64=null;
	    //读取图片字节数组
	    try {
	      in = new FileInputStream(imgFile);
	      data = new byte[in.available()];
	      in.read(data);
	      in.close();
	    } catch (IOException e) {
	      e.printStackTrace();
	    }
	   //对字节数组Base64编码
	    if(data!=null && data.length>0){
	    	base64=DatatypeConverter.printBase64Binary(data);
	    }
	    return base64;//返回Base64编码过的字节数组字符串
	  }
	
	public static void main(String[] args) {
		//图片数据转base64字符串
		String path="D:\\facedata\\historypic\\4M01F7BPAK02F17_4M01F7BPAK02F17\\FD_19_219214_39_33551592.jpg";
		
		String base64=byteToString(path);
		//base64字符串转byte[]数据
		byte[] bytes=stringToBytes(base64);
		
		//生成图片
		FileOutputStream fos;
		try {
			fos = new FileOutputStream("D:\\facedata\\controlpeople\\FD_19_219214_39_33551592.jpg");
			fos.write(bytes);
			fos.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/*InputStream 转换为byte[]
	 * @param instream
	 * @return
	 * @throw IOException
	 * */
	public static final byte[] getByteArray(InputStream is) throws IOException{
		ByteArrayOutputStream bos=new ByteArrayOutputStream();
		byte[] buff=new byte[100];
		int rc=0;
		while((rc=is.read(buff, 0, 100))>0){
			bos.write(buff,0,rc);
		}
		byte[] in2b=bos.toByteArray();
		return in2b;
	}//end
	
	
}
