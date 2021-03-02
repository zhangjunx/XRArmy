package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.BoxDataMapper;
import com.xr.entry.BoxData;
import com.xr.service.IBoxDataService;

@Service
public class BoxDataServiceImpl implements IBoxDataService{
	@Autowired
	private BoxDataMapper rm;

	@Override
	public int insertSelectiveService(BoxData record) {
		// 新增
		return rm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(BoxData record) {
		// 修改
		return rm.updateByPrimaryKeySelective(record);
	}

	@Override
	public BoxData selectByPrimaryKeyService(Integer id) {
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
