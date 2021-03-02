package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.ACL_Role;

@Service
public interface IACL_RoleService {

	int insertSelectiveService(ACL_Role record);

	int updateByPrimaryKeySelectiveService(ACL_Role record);

	ACL_Role selectByPrimaryKeyService(Integer id);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

	 

}
