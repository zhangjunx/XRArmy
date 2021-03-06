package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AccessRecordMapper;
import com.xr.entry.AccessRecord;
import com.xr.service.IAccessRecordService;
@Service
public class AccessRecordServiceImpl implements IAccessRecordService {

	@Autowired
	private AccessRecordMapper dm;

	 

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
	public int addService(List<Map<String, Object>> list) {
		return dm.add(list);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(AccessRecord record) {
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public AccessRecord selectByPrimaryKeyService(Integer id) {
		// TODO Auto-generated method stub
		return dm.selectByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(AccessRecord record) {
		// TODO Auto-generated method stub
		return dm.insertSelective(record);
	}

	@Override
	public Integer getNextidService() {
		// TODO Auto-generated method stub
		return dm.getNextid();
	}

	@Override
	public List<Map<String, Object>> getHolderService(Map m) {
		// TODO Auto-generated method stub
		return dm.getHolder(m);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// TODO Auto-generated method stub
		return dm.deleteByPrimaryKey(id);
	}
	
	
}
