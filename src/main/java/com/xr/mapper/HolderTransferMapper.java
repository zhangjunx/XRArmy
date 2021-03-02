package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.HolderTransfer;

public interface HolderTransferMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(HolderTransfer record);

    int insertSelective(HolderTransfer record);

    HolderTransfer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(HolderTransfer record);

    int updateByPrimaryKeyWithBLOBs(HolderTransfer record);

    int updateByPrimaryKey(HolderTransfer record);

	List<Map<String, Object>> getList(Map m);
	int getListCount(Map m);
	int add(Map m);//人事调动
}