package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface IDeviceChannelService {

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);
	
	List<Map<String, Object>> getChannelListService(Map m);

	int getChannelListCountService(Map m);

	List<Map<String, Object>> getDevListService(Map m);

	int getDevListCountService(Map m);

	int addService(List<Map<String, Object>> list);


}
