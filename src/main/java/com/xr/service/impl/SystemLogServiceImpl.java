package com.xr.service.impl;

import java.util.List;

import java.util.Map;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.mapper.SystemLogMapper;
import com.xr.entry.PageInfo;
import com.xr.entry.SystemLog;
import com.xr.service.ISystemLogService;
@Service
public class SystemLogServiceImpl  implements ISystemLogService{

	@Autowired
	private SystemLogMapper lm;

	@Override
	public int insertSelectiveService(SystemLog record) {
		// 新增
		return lm.insertSelective(record);
	}

	 
 

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return lm.deleteByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		// 查询列表
		return lm.getList(m);
	}

	@Override
	public int getListCountService(Map m) {
		// 分页查询
		int i=lm.getListCount(m);
		return i;
	}
	
	
	
}
