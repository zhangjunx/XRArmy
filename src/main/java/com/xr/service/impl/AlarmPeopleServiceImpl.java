package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AlarmPeopleMapper;
import com.xr.entry.AlarmPeople;
import com.xr.service.IAlarmPeopleService;
@Service
public class AlarmPeopleServiceImpl implements IAlarmPeopleService {

	@Autowired
	private AlarmPeopleMapper dm;

	@Override
	public int insertSelectiveService(AlarmPeople record) {
		// 新增
		return dm.insertSelective(record);
	}


	@Override
	public AlarmPeople selectByPrimaryKeyService(Integer id) {
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
		// 统计数量
		return dm.getListCount(m);
	}


	@Override
	public int updateByPrimaryKeySelectiveService(AlarmPeople record) {
		// TODO Auto-generated method stub
		return dm.updateByPrimaryKeySelective(record);
	}

	
}
