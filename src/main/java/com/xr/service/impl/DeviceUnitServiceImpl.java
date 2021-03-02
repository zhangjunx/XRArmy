package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.mapper.DeviceUnitMapper;
import com.xr.entry.PageInfo;
import com.xr.entry.DeviceUnit;
import com.xr.service.IDeviceUnitService;
@Service
public class DeviceUnitServiceImpl implements IDeviceUnitService {

	@Autowired
	private DeviceUnitMapper dm;

	@Override
	public int insertSelectiveService(DeviceUnit record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(DeviceUnit record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public DeviceUnit selectByPrimaryKeyService(Integer deviceno) {
		// 查询
		return dm.selectByPrimaryKey(deviceno);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer deviceno) {
		// 删除
		return dm.deleteByPrimaryKey(deviceno);
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

	@Override
	public Integer getNextidService() {
		// TODO Auto-generated method stub
		return dm.getNextid();
	}
	
	
}
