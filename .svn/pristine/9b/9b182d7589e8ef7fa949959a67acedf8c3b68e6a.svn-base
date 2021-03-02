package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.UserData;

@Service
public interface IUserDataService {

	int deleteByPrimaryKeyService(String userid);

	UserData selectByPrimaryKeyService(String userid);

	int insertSelectiveService(UserData record);

	int updateByPrimaryKeySelectiveService(UserData record);

	List<Map<String, Object>> getListService(Map m);

	Map<String, Object> getLoginCheckService(Map m);

	int getListCountService(Map m);

	List<Map<String, Object>> getMyMenuService(Map m);

	int addService(List<Map<String, Object>> list);


}
