package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.UnitList;

@Service
public interface IUnitListService {

	int insertSelectiveService(UnitList record);

	int updateByPrimaryKeySelectiveService(UnitList record);

	UnitList selectByPrimaryKeyService(String unitno);

	int deleteByPrimaryKeyService(String unitno);

	List<Map<String, Object>> getTreeService(Map m);//根据登录权限获取下拉树
	
	List<Map<String, Object>> getListService(Map m);

	String getNextUnitnoService(Map m);//获取下一个区域ID

	int insertExcel(List<Map<String, Object>> list);

	List<Map<String, Object>> getExistService(Map m);//删除机构时 判断是否有绑定小区存在

	

}
