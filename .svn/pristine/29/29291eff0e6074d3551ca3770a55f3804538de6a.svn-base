package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.NoticeUserMapper;
import com.xr.entry.NoticeUser;
import com.xr.service.INoticeUserService;

@Service
public class NoticeUserServiceImpl implements INoticeUserService{
	@Autowired
	private NoticeUserMapper rm;

	@Override
	public int insertSelectiveService(NoticeUser record) {
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
	public int updateByPrimaryKeySelectiveService(NoticeUser record) {
		// TODO Auto-generated method stub
		return rm.updateByPrimaryKeySelective(record);
	}

}
