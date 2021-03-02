package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.ACL_Menu;

@Service
public interface IACL_MenuService {

	int deleteByPrimaryKeyService(String id);

    int insertSelectiveService(ACL_Menu record);

    ACL_Menu selectByPrimaryKeyService(String id);

    int updateByPrimaryKeySelectiveService(ACL_Menu record);

	List<Map<String, Object>> getListService(Map m);

	List<Map<String, Object>> getTreeService(Map m);

	String getNextidService(Map m);


}
