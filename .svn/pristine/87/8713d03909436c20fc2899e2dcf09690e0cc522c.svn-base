package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.entry.HolderData;
import com.xr.mapper.HolderDataMapper;
import com.xr.service.IHolderDataService;
@Service
public class HolderDataServiceImpl implements IHolderDataService {

	@Autowired
	private HolderDataMapper dm;

	 
	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}

	 

	@Override
	public int addExcel(List<Map<String, Object>> list) {
		// 数据导入 
		return dm.addExcel(list);
	}


	@Override
	public int getListCountService(Map m) {
		return dm.getListCount(m);
	}



	@Override
	public int deleteByPrimaryKeyService(String holderno) {
		// 删除
		return dm.deleteByPrimaryKey(holderno);
	}



	@Override
	public int insertSelectiveService(HolderData record) {
		// 新增
		return dm.insertSelective(record);
	}



	@Override
	public HolderData selectByPrimaryKeyService(String holderno) {
		// 查询
		return dm.selectByPrimaryKey(holderno);
	}



	@Override
	public int updateByPrimaryKeySelectiveService(HolderData record) {
		// 更新
		return dm.updateByPrimaryKeySelective(record);
	}
	
	
}
