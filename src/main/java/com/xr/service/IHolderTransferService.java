package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.HolderTransfer;

@Service
public interface IHolderTransferService {
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(HolderTransfer record);

    HolderTransfer selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(HolderTransfer record);


	List<Map<String, Object>> getListService(Map m);
	int getListCountService(Map m);

	int addService(Map m);


}
