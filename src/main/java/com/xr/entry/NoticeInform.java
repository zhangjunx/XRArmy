package com.xr.entry;

import java.util.Date;

public class NoticeInform {
    private Integer id;

    private String title;

    private String content;
    
    private String filestr;

    private String informer;

    private Date createdate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getFilestr() {
		return filestr;
	}

	public void setFilestr(String filestr) {
		this.filestr = filestr== null ? null : filestr.trim();
	}

	public String getInformer() {
		return informer;
	}

	public void setInformer(String informer) {
		this.informer = informer== null ? null : informer.trim();
	}


    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }
}