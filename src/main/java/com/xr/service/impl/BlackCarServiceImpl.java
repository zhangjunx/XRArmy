package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.BlackCarMapper;
import com.xr.entry.BlackCar;
import com.xr.service.IBlackCarService;
@Service
public class BlackCarServiceImpl implements IBlackCarService {

	@Autowired
	private BlackCarMapper dm;

	@Override
	public int insertSelectiveService(BlackCar record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(BlackCar record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public BlackCar selectByPrimaryKeyService(Integer id) {
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
	public int addExcel(List<Map<String, Object>> list) {
		// 数据导入 
		return dm.addExcel(list);
	}

	 

	@Override
	public int getListCountService(Map m) {
		// 统计数量
		return dm.getListCount(m);
	}

	@Override
	public Integer getNextidService() {
		// TODO Auto-generated method stub
		return dm.getNextid();
	}

	
}
