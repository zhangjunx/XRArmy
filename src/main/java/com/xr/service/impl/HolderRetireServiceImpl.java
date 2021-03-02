package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.entry.HolderRetire;
import com.xr.mapper.HolderRetireMapper;
import com.xr.service.IHolderRetireService;
@Service
public class HolderRetireServiceImpl implements IHolderRetireService {

	@Autowired
	private HolderRetireMapper dm;

	 
	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}
  


	@Override
	public int getListCountService(Map m) {
		return dm.getListCount(m);
	}



	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return dm.deleteByPrimaryKey(id);
	}



	@Override
	public int insertSelectiveService(HolderRetire record) {
		// 新增
		return dm.insertSelective(record);
	}



	@Override
	public HolderRetire selectByPrimaryKeyService(Integer id) {
		// 查询
		return dm.selectByPrimaryKey(id);
	}



	@Override
	public int updateByPrimaryKeySelectiveService(HolderRetire record) {
		// 更新
		return dm.updateByPrimaryKeySelective(record);
	}



	@Override
	public int addService(Map m) {
		// 人事退伍
		return dm.add(m);
	}



	 
	
	
}
