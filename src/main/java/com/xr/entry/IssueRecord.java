package com.xr.entry;

import java.util.Date;

public class IssueRecord {
    private Integer id;

    private String holderno;

    private String holdername;

    private String photostr;

    private Integer groupid;

    private Integer deviceno;

    private String devicename;

    private String devicesn;

    private String boxid;

    private String boxip;

    private String state;

    private Date createdate;

    private Date updatedate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHolderno() {
        return holderno;
    }

    public void setHolderno(String holderno) {
        this.holderno = holderno == null ? null : holderno.trim();
    }

    public String getHoldername() {
        return holdername;
    }

    public void setHoldername(String holdername) {
        this.holdername = holdername == null ? null : holdername.trim();
    }

    public String getPhotostr() {
        return photostr;
    }

    public void setPhotostr(String photostr) {
        this.photostr = photostr == null ? null : photostr.trim();
    }

    public Integer getGroupid() {
        return groupid;
    }

    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
    }

    public Integer getDeviceno() {
        return deviceno;
    }

    public void setDeviceno(Integer deviceno) {
        this.deviceno = deviceno;
    }

    public String getDevicename() {
        return devicename;
    }

    public void setDevicename(String devicename) {
        this.devicename = devicename == null ? null : devicename.trim();
    }

    public String getDevicesn() {
        return devicesn;
    }

    public void setDevicesn(String devicesn) {
        this.devicesn = devicesn == null ? null : devicesn.trim();
    }

    

    public String getBoxid() {
		return boxid;
	}

	public void setBoxid(String boxid) {
		this.boxid = boxid== null ? null : boxid.trim();
	}

	public String getBoxip() {
		return boxip;
	}

	public void setBoxip(String boxip) {
		this.boxip = boxip== null ? null : boxip.trim();
	}

	 
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }
}