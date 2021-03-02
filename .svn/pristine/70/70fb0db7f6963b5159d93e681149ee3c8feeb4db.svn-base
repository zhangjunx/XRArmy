package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AccessGroupMapper;
import com.xr.entry.AccessGroup;
import com.xr.service.IAccessGroupService;
@Service
public class AccessGroupServiceImpl implements IAccessGroupService {

	@Autowired
	private AccessGroupMapper dm;

	@Override
	public int insertSelectiveService(AccessGroup record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(AccessGroup record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public AccessGroup selectByPrimaryKeyService(Integer id) {
		// 查询
		return dm.selectByPrimaryKey(id);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return dm.deleteByPrimaryKey(id);
	}

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
	
	
}
