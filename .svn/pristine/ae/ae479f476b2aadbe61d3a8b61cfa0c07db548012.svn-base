package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.IODataMapper;
import com.xr.service.IIODataService;
@Service
public class IODataServiceImpl implements IIODataService {

	@Autowired
	private IODataMapper dm;

 
	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}

	@Override
	public int getListCountService(Map m) {
		// 统计数量
		return dm.getListCount(m);
	}

	 
	
}
