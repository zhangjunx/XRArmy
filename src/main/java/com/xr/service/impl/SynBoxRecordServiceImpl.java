package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.SynBoxRecordMapper;
import com.xr.entry.SynBoxRecord;
import com.xr.service.ISynBoxRecordService;

@Service
public class SynBoxRecordServiceImpl implements ISynBoxRecordService{
	@Autowired
	private SynBoxRecordMapper rm;

	@Override
	public int insertSelectiveService(SynBoxRecord record) {
		// 新增
		return rm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(SynBoxRecord record) {
		// 修改
		return rm.updateByPrimaryKeySelective(record);
	}

	@Override
	public SynBoxRecord selectByPrimaryKeyService(Integer id) {
		//查询
		return rm.selectByPrimaryKey(id);
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
	public List<Map<String, Object>> getHolderService(Map m) {
		// TODO Auto-generated method stub
		return rm.getHolder(m);
	}

	@Override
	public List<Map<String, Object>> getSynHolderService(Map m) {
		// TODO Auto-generated method stub
		return rm.getSynHolder(m);
	}

	@Override
	public int getSynHolderCountService(Map m) {
		// TODO Auto-generated method stub
		return rm.getSynHolderCount(m);
	}

	@Override
	public List<Map<String, Object>> getSynBlackService(Map m) {
		// TODO Auto-generated method stub
		return rm.getSynBlack(m);
	}

	@Override
	public int getSynBlackCountService(Map m) {
		// TODO Auto-generated method stub
		return rm.getSynBlackCount(m);
	}

	@Override
	public List<Map<String, Object>> getBlackService(Map m) {
		// TODO Auto-generated method stub
		return rm.getBlack(m);
	}

}
