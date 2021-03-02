package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.ACL_Role_MenuMapper;
import com.xr.entry.ACL_Role_Menu;
import com.xr.service.IACL_Role_MenuService;
import com.xr.tools.TreeToolUtils;
@Service
public class ACL_Role_MenuServiceImpl implements IACL_Role_MenuService {
	@Autowired
	private ACL_Role_MenuMapper dm;

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return dm.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(ACL_Role_Menu record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public ACL_Role_Menu selectByPrimaryKeyService(Integer id) {
		// 查询
		return dm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_Role_Menu record) {
		//更新
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}

	 

	@Override
	public int addBatchService(List<Map<String, Object>> list) {
		// 批量添加
		return dm.addBatch(list);
	}

	@Override
	public List<Map<String, Object>> getTreeService(Map m) {
		// 获取角色菜单
		List<Map<String, Object>> list=dm.getTree(m);
		List<Map<String, Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}

	@Override
	public List<Map<String, Object>> getMyPermService(Map m) {
		// 获取登录人的权限
		return dm.getMyPerm(m);
	}

}
