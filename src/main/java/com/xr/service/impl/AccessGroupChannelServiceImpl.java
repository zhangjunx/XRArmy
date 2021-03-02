package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AccessGroupChannelMapper;
import com.xr.entry.AccessGroupChannel;
import com.xr.service.IAccessGroupChannelService;
@Service
public class AccessGroupChannelServiceImpl implements IAccessGroupChannelService {

	@Autowired
	private AccessGroupChannelMapper dm;

	 
	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}

	@Override
	public int getListCountService(Map m) {
		// 统计
		return dm.getListCount(m);
	}

	@Override
	public int addService(List<Map<String, Object>> list) {
		// TODO Auto-generated method stub
		return dm.add(list);
	}
	
	
}
