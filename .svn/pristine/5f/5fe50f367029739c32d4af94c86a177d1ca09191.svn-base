package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.AreaListMapper;
import com.xr.entry.AreaList;
import com.xr.service.IAreaListService;
import com.xr.tools.TreeToolUtils;
@Service
public class AreaListServiceImpl implements IAreaListService {

	@Autowired
	private AreaListMapper am;
	 
	@Override
	public int insertSelectiveService(AreaList record) {
		// 新增
		return am.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(AreaList record) {
		//更新
		return am.updateByPrimaryKeySelective(record);
	}

	@Override
	public AreaList selectByPrimaryKeyService(String areaid) {
		// 查询
		return am.selectByPrimaryKey(areaid);
	}

	@Override
	public int deleteByPrimaryKeyService(String areaid) {
		// 删除
		return am.deleteByPrimaryKey(areaid);
	}

	@Override
	public List<Map<String, Object>> getTreeService(Map m) {
	    //  查询区域楼层树
		List<Map<String, Object>> list=am.getTree(m);
		List<Map<String, Object>> treeList=new ArrayList<Map<String, Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treeList=tree.menuList(list, true);
		return treeList;	
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return am.getList(m);
	}

	@Override
	public String getNextidService(Map m) {
		// 获取下一个机构编号
		return am.getNextid(m);
	}

	@Override
	public int addExcel(List<Map<String, Object>> list) {
		// 批量添加
		return am.addExcel(list);
		
	}

	 
	 

	
	
}
