package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.ACL_Role_Menu;

@Service
public interface IACL_Role_MenuService {
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(ACL_Role_Menu record);

    ACL_Role_Menu selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(ACL_Role_Menu record);
    
    List<Map<String, Object>> getListService(Map m);

	int addBatchService(List<Map<String, Object>> list);//批量添加

	List<Map<String, Object>> getTreeService(Map m);

	List<Map<String, Object>> getMyPermService(Map m);



}
