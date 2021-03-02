package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.ACL_MenuMapper;
import com.xr.entry.ACL_Menu;
import com.xr.service.IACL_MenuService;
import com.xr.tools.TreeToolUtils;
@Service
public class ACL_MenuServiceImpl implements IACL_MenuService {

	@Autowired
	private ACL_MenuMapper dm;

	@Override
	public int insertSelectiveService(ACL_Menu record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_Menu record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public ACL_Menu selectByPrimaryKeyService(String id) {
		// 查询
		ACL_Menu record=dm.selectByPrimaryKey(id);
		return record;
	}

	@Override
	public int deleteByPrimaryKeyService(String id) {
		// 删除
		int i=dm.deleteByPrimaryKey(id);
		return i;
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}

	@Override
	public List<Map<String, Object>> getTreeService(Map m) {
		// 权限树
		List<Map<String, Object>> list=dm.getTree(m);
		List<Map<String, Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}

	@Override
	public String getNextidService(Map m) {
		// 获取下一个菜单id
		return dm.getNextid(m);
	}
	
	
}
