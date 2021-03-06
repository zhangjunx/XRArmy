package com.xr.entry;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

public class VisitorsInfo {
    private Integer id;

    private String visitorsname;

    private Date visitorsdate;

    private String visitorsreason;

    private String visitorsreasontext;

    private String phone;

    private String sexname;

    private String idtype;

    private String idcode;

    private String nationname;

    private String address;

    private String receiverpeopleid;

    private String receiversname;

    private String receiversphone;

    private String unitno;

    private String unitname;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date startdate;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date enddate;

    private String carplateno;

    private String carbodycolor;

    private String carplatetype;

    private String photostr;

    private String backstr;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date createdate;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date updatedate;

    private Integer groupid;
    
    private byte[] photo;

    private byte[] backphoto;

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public byte[] getBackphoto() {
        return backphoto;
    }

    public void setBackphoto(byte[] backphoto) {
        this.backphoto = backphoto;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVisitorsname() {
        return visitorsname;
    }

    public void setVisitorsname(String visitorsname) {
        this.visitorsname = visitorsname == null ? null : visitorsname.trim();
    }

    public Date getVisitorsdate() {
        return visitorsdate;
    }

    public void setVisitorsdate(Date visitorsdate) {
        this.visitorsdate = visitorsdate;
    }

    public String getVisitorsreason() {
        return visitorsreason;
    }

    public void setVisitorsreason(String visitorsreason) {
        this.visitorsreason = visitorsreason == null ? null : visitorsreason.trim();
    }

    public String getVisitorsreasontext() {
        return visitorsreasontext;
    }

    public void setVisitorsreasontext(String visitorsreasontext) {
        this.visitorsreasontext = visitorsreasontext == null ? null : visitorsreasontext.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getSexname() {
        return sexname;
    }

    public void setSexname(String sexname) {
        this.sexname = sexname == null ? null : sexname.trim();
    }

    public String getIdtype() {
        return idtype;
    }

    public void setIdtype(String idtype) {
        this.idtype = idtype == null ? null : idtype.trim();
    }

    public String getIdcode() {
        return idcode;
    }

    public void setIdcode(String idcode) {
        this.idcode = idcode == null ? null : idcode.trim();
    }

    public String getNationname() {
        return nationname;
    }

    public void setNationname(String nationname) {
        this.nationname = nationname == null ? null : nationname.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getReceiverpeopleid() {
        return receiverpeopleid;
    }

    public void setReceiverpeopleid(String receiverpeopleid) {
        this.receiverpeopleid = receiverpeopleid == null ? null : receiverpeopleid.trim();
    }

    public String getReceiversname() {
        return receiversname;
    }

    public void setReceiversname(String receiversname) {
        this.receiversname = receiversname == null ? null : receiversname.trim();
    }

    public String getReceiversphone() {
        return receiversphone;
    }

    public void setReceiversphone(String receiversphone) {
        this.receiversphone = receiversphone == null ? null : receiversphone.trim();
    }

    public String getUnitno() {
        return unitno;
    }

    public void setUnitno(String unitno) {
        this.unitno = unitno == null ? null : unitno.trim();
    }

    public String getUnitname() {
        return unitname;
    }

    public void setUnitname(String unitname) {
        this.unitname = unitname == null ? null : unitname.trim();
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getCarplateno() {
        return carplateno;
    }

    public void setCarplateno(String carplateno) {
        this.carplateno = carplateno == null ? null : carplateno.trim();
    }

    public String getCarbodycolor() {
        return carbodycolor;
    }

    public void setCarbodycolor(String carbodycolor) {
        this.carbodycolor = carbodycolor == null ? null : carbodycolor.trim();
    }

    public String getCarplatetype() {
        return carplatetype;
    }

    public void setCarplatetype(String carplatetype) {
        this.carplatetype = carplatetype == null ? null : carplatetype.trim();
    }

    public String getPhotostr() {
        return photostr;
    }

    public void setPhotostr(String photostr) {
        this.photostr = photostr == null ? null : photostr.trim();
    }

    public String getBackstr() {
        return backstr;
    }

    public void setBackstr(String backstr) {
        this.backstr = backstr == null ? null : backstr.trim();
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

    public Integer getGroupid() {
        return groupid;
    }

    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
    }
}