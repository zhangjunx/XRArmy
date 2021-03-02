package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.DeviceChannelMapper;
import com.xr.service.IDeviceChannelService;
@Service
public class DeviceChannelServiceImpl implements IDeviceChannelService {

	@Autowired
	private DeviceChannelMapper dm;


	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}
	 
	@Override
	public int getListCountService(Map m) {
		return dm.getListCount(m);
	}

	@Override
	public List<Map<String, Object>> getChannelListService(Map m) {
		// TODO Auto-generated method stub
		return dm.getChannelList(m);
	}

	@Override
	public int getChannelListCountService(Map m) {
		// TODO Auto-generated method stub
		return dm.getChannelListCount(m);
	}

	@Override
	public List<Map<String, Object>> getDevListService(Map m) {
		// TODO Auto-generated method stub
		return dm.getDevList(m);
	}

	@Override
	public int getDevListCountService(Map m) {
		// TODO Auto-generated method stub
		return dm.getDevListCount(m);
	}

	@Override
	public int addService(List<Map<String, Object>> list) {
		// TODO Auto-generated method stub
		return dm.add(list);
	}

	
	
	
}
