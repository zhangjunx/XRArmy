package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.PlatBoxMapper;
import com.xr.service.IPlatBoxService;
@Service
public class PlatBoxServiceImpl implements IPlatBoxService {

	@Autowired
	private PlatBoxMapper dm;

	@Override
	public int addService(Map m) {
		// 统计数量
		return dm.add(m);
	}

	@Override
	public List<Map<String, Object>> getDevService(Map m) {
		// TODO Auto-generated method stub
		return dm.getDev(m);
	}

	@Override
	public List<Map<String, Object>> getHolderService(Map m) {
		// TODO Auto-generated method stub
		return dm.getHolder(m);
	}

	 
	
}
