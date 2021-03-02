package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.MonitorDotDeviceMapper;
import com.xr.entry.MonitorDotDevice;
import com.xr.service.IMonitorDotDeviceService;

@Service
public class MonitorDotDeviceServiceImpl implements IMonitorDotDeviceService{
	@Autowired
	private MonitorDotDeviceMapper rm;


	@Override
	public List<Map<String, Object>> getListService(Map m) {
		// 查询
		return rm.getList(m);
	}

	@Override
	public int getListCountService(Map m) {
		return rm.getListCount(m);
	}

	@Override
	public int addService(List<Map<String, Object>> list) {
		// 批量添加
		return rm.add(list);
	}

	@Override
	public List<Map<String, Object>> getDevListService(Map m) {
		// TODO Auto-generated method stub
		return rm.getDevList(m);
	}

	@Override
	public int getDevListCountService(Map m) {
		// TODO Auto-generated method stub
		return rm.getDevListCount(m);
	}

}
