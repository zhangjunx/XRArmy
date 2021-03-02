package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.AreaList;

@Service
public interface IAreaListService {

	int insertSelectiveService(AreaList record);

	int updateByPrimaryKeySelectiveService(AreaList record);

	AreaList selectByPrimaryKeyService(String areaid);

	int deleteByPrimaryKeyService(String areaid);

	List<Map<String, Object>> getTreeService(Map m);//根据登录权限获取下拉树
	
	List<Map<String, Object>> getListService(Map m);

	String getNextidService(Map m);//获取下一个区域ID

	int addExcel(List<Map<String, Object>> list);

}
