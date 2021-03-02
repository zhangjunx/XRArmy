package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.UserData;

public interface UserDataMapper {
    int deleteByPrimaryKey(String userid);

    int insert(UserData record);

    int insertSelective(UserData record);

    UserData selectByPrimaryKey(String userid);

    int updateByPrimaryKeySelective(UserData record);

    int updateByPrimaryKeyWithBLOBs(UserData record);

    int updateByPrimaryKey(UserData record);

	Map<String, Object> getLoginCheck(Map m);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	List<Map<String, Object>> getMyMenu(Map m);//获取登录人的菜单权限

	int add(List<Map<String, Object>> list);
}