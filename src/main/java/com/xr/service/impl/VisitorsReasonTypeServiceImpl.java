package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.VisitorsReasonTypeMapper;
import com.xr.entry.VisitorsReasonType;
import com.xr.service.IVisitorsReasonTypeService;
@Service
public class VisitorsReasonTypeServiceImpl implements IVisitorsReasonTypeService {

	@Autowired
	private VisitorsReasonTypeMapper dm;

	@Override
	public int insertSelectiveService(VisitorsReasonType record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(VisitorsReasonType record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	 

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return dm.deleteByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getListService(Map<String, Object> m) {
		//查询列表
		return dm.getList(m);
	}

	  

	@Override
	public int getListCountService(Map m) {
		// 统计数量
		return dm.getListCount(m);
	}
 
	
	
}
