package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.MonitorDotMapper;
import com.xr.entry.MonitorDot;
import com.xr.service.IMonitorDotService;

@Service
public class MonitorDotServiceImpl implements IMonitorDotService{
	@Autowired
	private MonitorDotMapper rm;

	@Override
	public int insertSelectiveService(MonitorDot record) {
		// 新增
		return rm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(MonitorDot record) {
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

	 

}
