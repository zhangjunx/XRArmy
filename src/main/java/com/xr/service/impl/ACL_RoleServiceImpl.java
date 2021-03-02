package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.ACL_RoleMapper;
import com.xr.entry.ACL_Role;
import com.xr.service.IACL_RoleService;

@Service
@SuppressWarnings({"deprecation"})
public class ACL_RoleServiceImpl implements IACL_RoleService{
	@Autowired
	private ACL_RoleMapper rm;

	@Override
	public int insertSelectiveService(ACL_Role record) {
		// 新增
		return rm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_Role record) {
		// 修改
		return rm.updateByPrimaryKeySelective(record);
	}

	@Override
	public ACL_Role selectByPrimaryKeyService(Integer id) {
		//查询
		return rm.selectByPrimaryKey(id);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return rm.deleteByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		// 查询
		return rm.getList(m);
	}

	@Override
	public int getListCountService(Map m) {
		return rm.getListCount(m);
	}

}
