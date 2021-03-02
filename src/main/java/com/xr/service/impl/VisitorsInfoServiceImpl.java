package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.VisitorsInfoMapper;
import com.xr.entry.VisitorsInfo;
import com.xr.service.IVisitorsInfoService;
@Service
public class VisitorsInfoServiceImpl implements IVisitorsInfoService {

	@Autowired
	private VisitorsInfoMapper dm;

	@Override
	public int insertSelectiveService(VisitorsInfo record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(VisitorsInfo record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public VisitorsInfo selectByPrimaryKeyService(Integer id) {
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

}
