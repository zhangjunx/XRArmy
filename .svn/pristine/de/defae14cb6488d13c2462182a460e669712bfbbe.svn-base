package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AccessGroupHolderMapper;
import com.xr.service.IAccessGroupHolderService;
@Service
public class AccessGroupHolderServiceImpl implements IAccessGroupHolderService {

	@Autowired
	private AccessGroupHolderMapper dm;

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

	@Override
	public List<Map<String, Object>> getGroupListService(Map m) {
		// TODO Auto-generated method stub
		return dm.getGroupList(m);
	}

	@Override
	public int getGroupListCountService(Map m) {
		// TODO Auto-generated method stub
		return dm.getGroupListCount(m);
	}

	@Override
	public List<Map<String, Object>> getListByGroupService(Map m) {
		// TODO Auto-generated method stub
		return dm.getListByGroup(m);
	}

	@Override
	public int getListByGroupCountService(Map m) {
		// TODO Auto-generated method stub
		return dm.getListByGroupCount(m);
	}
	
	
}
