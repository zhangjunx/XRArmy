package com.xr.tools;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import sun.misc.BASE64Encoder;

public class FileManager {
	public static void main(String[] args) {
		File file = new File("C:\\Users\\Administrator\\Desktop\\test.amr");
		String byteStr = fileToBinStr("C:\\Users\\Administrator\\Desktop\\test.amr");
	}
	
	/**
	 * 判断文件路径是否存在
	 * @param path
	 * @return
	 */
	public static boolean checkExist(String path){
		File filePath = new File(path);
		if(filePath.exists()){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 创建文件夹路径
	 * @param path
	 */
	public static void createPath(String path){
		File filePath = new File(path);
		filePath.mkdirs();
	}
	
	/**
	 * 上传文件
	 * uploadPath：文件上传路径，不包含文件名
	 * 当前支持上传图片（png，jpg）
	 * size：上传图片最大字节数，若为空，则认为没有大小限制
	 * 返回结果：
	 * 101：图片太大
	 * 102：不支持的图片格式
	 * @param file
	 * @param uploadPath
	 * @return
	 */
	public static String uploadFile(MultipartFile file,String uploadPath,Long size){
		Long len = file.getSize();//文件大小
		if(size != null){//图片大小验证
			if(len>size){
				return "101";
			}
		}
		
		if(!file.isEmpty() && file != null){
			long fileRealName = new Date().getTime();//获取时间戳，以时间戳作为存储名称
			
			int pointIndex = file.getOriginalFilename().indexOf(".");//点号的位置
		    String fileSuffix = file.getOriginalFilename().substring(pointIndex);//截取文件后缀
		    
			File savedFile = new File(uploadPath + "\\" + fileRealName+fileSuffix);//服务器文件存取路径
			try {
				file.transferTo(savedFile);
				return fileRealName+fileSuffix;
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "0";
			}
		}else{
			return "0";
		}
	}
	
	/**
	 * 上传文件
	 * uploadPath：文件上传路径，不包含文件名
	 * uploadPath：文件上传路径不包含文件名
	 * fileName：文件名，包含后缀
	 * @return 
	 */
	public static String uploadFileByByte(byte []bytes,String uploadPath,String fileName,Long size) throws IOException{
		BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            File dir = new File(uploadPath);
            if (!dir.exists() && dir.isDirectory()) {// 判断文件目录是否存在
                dir.mkdirs();
            }
            file = new File(uploadPath + "\\" + fileName);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            fos.write(bytes);
            //bos.write(bytes);
            return uploadPath+"\\"+fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
	}
	
	/**
	 * 删除文件
	 * @param fileName
	 * @return
	 */
	public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
        	boolean b = false;
        	int count = 0;
        	while(!b){
        		if(count<=3){
        			System.gc();
                	b = file.delete();
        		}else{
        			break;
        		}
        	}
            return b;
        } else {
        	System.out.println("文件不存在！");
            return false;
        }
    }
	
	/**
	 * 根据图片路径获取base64
	 * @return
	 */
	public static String getPhotoBase64(String filePath){
		InputStream in = null;
		byte[] data = null;
		try {
			in = new FileInputStream(filePath);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			return "-1";
		}
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(data);
	}
	
	/**
     * 对图片进行缩小
     * @param originalImage 原始图片
     * @param times 缩小倍数
     * @return 缩小后的Image
     */
    public static BufferedImage zoomOutImage(BufferedImage  originalImage, Integer w,Integer h){
        int width = w;
        int height = h;
        BufferedImage newImage = new BufferedImage(width,height,originalImage.getType()==0?5:originalImage.getType());
        Graphics g = newImage.getGraphics();
        g.drawImage(originalImage, 0,0,width,height,null);
        g.dispose();
        return newImage;
    }
    
    /**
     * 根据文件路径获取文件列表
     * @param path
     * @return
     */
    public List getFileList(String path) { 
		List list = new ArrayList(); 
		try { 
			File file = new File(path); 
			String[] filelist = file.list(); 
			for (int i = 0; i < filelist.length; i++) { 
				list.add(path+"\\"+filelist[i]); 
			} 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		return list; 
	} 
    
    /**
     * 二进制转化为图片流
     * @param b
     * @return
     * @throws IOException
     */
    public static BufferedImage byteToImg(byte[] b) throws IOException{
    	ByteArrayInputStream in2 = new ByteArrayInputStream(b);    //将b作为输入流；
		BufferedImage image2 = ImageIO.read(in2);
		return image2;
    }
    
    /**
     * 二进制转化为图片流
     * @param b
     * @return
     * @throws IOException
     */
    public static byte[] imgToByte(BufferedImage img) throws IOException{
    	ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write( img, "jpg", baos );
		baos.flush();
		byte[] imageInByte = baos.toByteArray();
		baos.close();
		return imageInByte;
    }
    
    /**
     * 二进制转base64
     * @param blob
     * @return
     * @throws IOException
     */
	public static String convertBlobToBase64String(Blob blob) throws IOException {
    	String result = "";
    	if(null != blob) {
			try {
				InputStream msgContent = blob.getBinaryStream();
				ByteArrayOutputStream output = new ByteArrayOutputStream();
				byte[] buffer = new byte[100];
				int n = 0;
				while (-1 != (n = msgContent.read(buffer))) {
					output.write(buffer, 0, n);
				}
				result = new BASE64Encoder().encode(output.toByteArray());
				output.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return result;
    	}else {
    		return null;
    	}
	}
	
	/**
	 * 文件转二进制数组
	 * @param fileName
	 * @return
	 */
	public static byte[] fileToBinArray(String fileName) {
		try {
			File file = new File(fileName);
            InputStream fis = new FileInputStream(file);
            byte[] bytes = FileCopyUtils.copyToByteArray(fis);
            return bytes;
        }catch (Exception ex){
            throw new RuntimeException("transform file into bin Array 出错",ex);
        }
	}
	
	/**
     * 文件转为二进制字符串
     * @param string
     * @return
     */
    public static String fileToBinStr(String string){
        try {
            InputStream fis = new FileInputStream(string);
            byte[] bytes = FileCopyUtils.copyToByteArray(fis);
            return new String(bytes,"ISO-8859-1");
        }catch (Exception ex){
            throw new RuntimeException("transform file into bin String 出错",ex);
        }
    }
    
    /**
     * 字节转16进制
     * @param bytes
     * @return
     */
    public static String byteToHex(byte[] bytes){
        String strHex = "";
        StringBuilder sb = new StringBuilder("");
        for (int n = 0; n < bytes.length; n++) {
            strHex = Integer.toHexString(bytes[n] & 0xFF);
            sb.append((strHex.length() == 1) ? "0" + strHex : strHex); // 每个字节由两个字符表示，位数不够，高位补0
        }
        return sb.toString().trim();
    }
    
    /**
     * @Title: byteToFile
     * @Description: 把二进制数据转成指定后缀名的文件，例如PDF，PNG等
     * @param contents 二进制数据
     * @param filePath 文件存放目录，包括文件名及其后缀，如D:\file\bike.jpg
     * @Author: Wiener
     * @Time: 2018-08-26 08:43:36
     */
    public static void byteToFile(byte[] contents, String filePath) {
        BufferedInputStream bis = null;
        FileOutputStream fos = null;
        BufferedOutputStream output = null;
        try {
            ByteArrayInputStream byteInputStream = new ByteArrayInputStream(contents);
            bis = new BufferedInputStream(byteInputStream);
            File file = new File(filePath);
            // 获取文件的父路径字符串
            File path = file.getParentFile();
            if (!path.exists()) {
                boolean isCreated = path.mkdirs();
                if (!isCreated) {
                }
            }
            fos = new FileOutputStream(file);
            // 实例化OutputString 对象
            output = new BufferedOutputStream(fos);
            byte[] buffer = new byte[1024];
            int length = bis.read(buffer);
            while (length != -1) {
                output.write(buffer, 0, length);
                length = bis.read(buffer);
            }
            output.flush();
        } catch (Exception e) {
        	System.out.println(e);
        } finally {
            try {
            	bis.close();
                fos.close();
                output.close();
            } catch (IOException e0) {
                System.out.println(e0);
            }
        }
    }
}
