package com.xr.configure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PropertiesConfigure {
	
	private static String url;
	
	private static String appKey;
	
	private static String appSecret;

	@Value("${hkplat.url}")
	public static void setUrl(String url) {
		PropertiesConfigure.url = url;
	}

	@Value("${hkplat.appKey}")
	public static void setAppKey(String appKey) {
		PropertiesConfigure.appKey = appKey;
	}

	@Value("${hkplat.appSecret}")
	public static void setAppSecret(String appSecret) {
		PropertiesConfigure.appSecret = appSecret;
	}

	public static String getUrl() {
		return url;
	}

	public static String getAppKey() {
		return appKey;
	}

	public static String getAppSecret() {
		return appSecret;
	}
	
}
