package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.HolderLeaveMapper;
import com.xr.entry.HolderLeave;
import com.xr.service.IHolderLeaveService;

@Service
public class HolderLeaveServiceImpl implements IHolderLeaveService{
	@Autowired
	private HolderLeaveMapper rm;

	@Override
	public int insertSelectiveService(HolderLeave record) {
		// 新增
		return rm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(HolderLeave record) {
		// 修改
		return rm.updateByPrimaryKeySelective(record);
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

	@Override
	public HolderLeave selectByPrimaryKeyService(Integer id) {
		// TODO Auto-generated method stub
		return rm.selectByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getUnauditedService(Map m) {
		// TODO Auto-generated method stub
		return rm.getUnaudited(m);
	}

	@Override
	public int getUnauditedCountService(Map m) {
		// TODO Auto-generated method stub
		return rm.getUnauditedCount(m);
	}

}
