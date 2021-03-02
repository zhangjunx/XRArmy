package com.xr.tools;

public class StringUtil {
	public static String utf8Togb2312(String gb) throws Exception {
		byte[] bytes = gb.getBytes("gb2312");// 先把字符串按gb2312转成byte数组
		StringBuilder gbString = new StringBuilder();
		for (byte b : bytes){
			String temp = Integer.toHexString(b);// 再用Integer中的方法，把每个byte转换成16进制输出
			temp = temp.substring(6, 8); // 截取
			gbString.append("%" + temp);
		}
		return gbString.toString().replaceAll("%", "");
	}

	public static void main(String[] args) throws Exception {
		String str = utf8Togb2312("晴天");
		System.out.println(str);
	}
}
