package com.xr.tools;

import javax.xml.bind.DatatypeConverter;


/**
 * byte[]和base64的相互转换
 * @author Administrator
 *
 */
public class ByteAndBase64 {

	/**
	 * import java.util.Base64;
	 * 效率比较：快--->慢  
	 *  javax.xml.bind.DatatypeConverter》
	 * java.util.Base64》
	 * org.apache.commons.codec.binary.Base64
	 * 
	 * 方法一：
	 */
	public void one(){
		//byte[]转base64
		byte[] bytes=null;
		//String base64=Base64.getEncoder().encodeToString(bytes);
		String base64=java.util.Base64.getEncoder().encodeToString(bytes);
		//base64转byte[]
		//byte[] byteArray=Base64.getDecoder().decode(base64);
		byte[] byteArray=java.util.Base64.getDecoder().decode(base64);
		//说明：使用JDK自带的Base64.java类型实现，但是jdk版本必须>=1.8
	}
	
	
	/**
	 * import javax.xml.bind.DatatypeConverter;
	 * 效率比较：快--->慢  
	 *  javax.xml.bind.DatatypeConverter》
	 * java.util.Base64》
	 * org.apache.commons.codec.binary.Base64
	 * 
	 * 方法二：
	 */
	public void two(){
		//byte[]转base64
		byte[] bytes=null;
		String base64=DatatypeConverter.printBase64Binary(bytes);
		//base64转byte[]
		byte[] byteArray=DatatypeConverter.parseBase64Binary(base64);
		//说明：使用JDK自带的DatatypeConverter.java类实现，但是JDK版本必须>=1.6
	}
	
	
	/**
	 * import java.util.Base64;
	 * 方法三：
	 * 效率比较：快--->慢   
	 * javax.xml.bind.DatatypeConverter》
	 * java.util.Base64》
	 * org.apache.commons.codec.binary.Base64
	 * 
	 */
	public void three(){
		//byte[]转base64
		byte[] bytes=null;
		//String base64=Base64.encodeBase64String(bytes).replaceAll("\r\n", "");
		String base64=org.apache.commons.codec.binary.Base64.encodeBase64String(bytes).replaceAll("\r\n", "");
		//base64转byte[]
		//byte[] byteArray=Base64.decodeBase64(base64);
		byte[] byteArray=org.apache.commons.codec.binary.Base64.decodeBase64(base64);
		//说明：所需jar包：commons-codec.jar
	}
}
