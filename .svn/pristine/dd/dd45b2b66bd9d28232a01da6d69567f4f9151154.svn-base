package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.NoticeInformMapper;
import com.xr.entry.NoticeInform;
import com.xr.service.INoticeInformService;

@Service
public class NoticeInformServiceImpl implements INoticeInformService{
	@Autowired
	private NoticeInformMapper rm;

	@Override
	public int insertSelectiveService(NoticeInform record) {
		// 新增
		return rm.insertSelective(record);
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


	@Override
	public int addService(Map m) {
		// TODO Auto-generated method stub
		return rm.add(m);
	}


	@Override
	public NoticeInform selectByPrimaryKeyService(Integer id) {
		// TODO Auto-generated method stub
		return rm.selectByPrimaryKey(id);
	}

}
