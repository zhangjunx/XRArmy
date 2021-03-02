package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.mapper.TitleDataMapper;
import com.xr.entry.PageInfo;
import com.xr.entry.TitleData;
import com.xr.service.ITitleDataService;
@Service
public class TitleDataServiceImpl implements ITitleDataService {

	@Autowired
	private TitleDataMapper dm;

	@Override
	public int insertSelectiveService(TitleData record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(TitleData record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public TitleData selectByPrimaryKeyService(Integer id) {
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
		return dm.getListCount(m);
	}
	
	
}
