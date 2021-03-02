package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.UserDataMapper;
import com.xr.entry.UserData;
import com.xr.service.IUserDataService;
@Service
public class UserDataServiceImpl implements IUserDataService {
	@Autowired
	private UserDataMapper um;

	@Override
	public UserData selectByPrimaryKeyService(String userid) {
		// 查询实体类
		return um.selectByPrimaryKey(userid);
	}

	@Override
	public int insertSelectiveService(UserData record) {
		// 添加
		int i=um.insertSelective(record);
		return i;
	}

	@Override
	public int updateByPrimaryKeySelectiveService(UserData record) {
		// 更新
		return um.updateByPrimaryKeySelective(record);
	}

	@Override
	public int deleteByPrimaryKeyService(String userid) {
		// 删除
		return um.deleteByPrimaryKey(userid);
	}

	 
	@Override
	public Map<String, Object> getLoginCheckService(Map m) {
		// 登录接口
		return um.getLoginCheck(m);
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		// 查询用户列表list
		List<Map<String, Object>>  list=um.getList(m);
		return list;
	}

	@Override
	public int getListCountService(Map m) {
		return um.getListCount(m);
	}

	@Override
	public List<Map<String, Object>> getMyMenuService(Map m) {
		// 获取登录人的菜单权限
		return um.getMyMenu(m);
	}

	@Override
	public int addService(List<Map<String, Object>> list) {
		// TODO Auto-generated method stub
		return um.add(list);
	}

	 


}
