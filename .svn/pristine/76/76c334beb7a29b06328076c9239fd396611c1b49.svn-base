package com.xr.server.quartz;

import static org.quartz.JobBuilder.newJob;  
import static org.quartz.TriggerBuilder.newTrigger;

import static org.quartz.CronScheduleBuilder.*;  
  
import org.quartz.CronTrigger;  
import org.quartz.JobDetail;  
import org.quartz.JobKey;  
import org.quartz.Scheduler;  
import org.quartz.Trigger;  
import org.quartz.TriggerKey;  
  
/** 
 * Quartz调度管理器 
 *  
 * @author XuJie 
 * @Date 2017年1月21日 
 */  
public class QuartzManager {  
    /** 
     * @Description: 添加一个定时任务
     * @param sched 调度器 
     * @param jobName 任务名 
     * @param cls 任务 
     * @param time 时间设置，参考quartz说明文档 
     * @Title: QuartzManager.java 
     */  
    public static void addJob(Scheduler sched, String jobName,String groupName, Class cls, String time) {  
        try {  
            JobKey jobKey = new JobKey(jobName, groupName);// 任务名，任务组，任务执行类  
            TriggerKey triggerKey = new TriggerKey(jobName, groupName);// 触发器  
            JobDetail jobDetail = newJob(cls).withIdentity(jobKey).build();  
            Trigger trigger = newTrigger().withIdentity(triggerKey).withSchedule(cronSchedule(time)).build();//触发器时间设定  
            sched.scheduleJob(jobDetail, trigger);  
            if (!sched.isShutdown()) {  
                sched.start();// 启动  
            }  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    /** 
     * @Description: 修改一个定时任务
     * @param sched 调度器 
     * @param jobName 任务名 
     * @param cls 任务 
     * @param time 时间设置，参考quartz说明文档 
     * @Title: QuartzManager.java 
     */  
    public static void editJob(Scheduler sched, String jobName,String groupName, Class cls, String time) {  
        try {  
        	removeJob(sched,jobName,groupName);
        	addJob(sched,jobName,groupName,cls,time);
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    /** 
     * @Description: 移除一个任务(使用默认的任务组名，触发器名，触发器组名) 
     * @param sched 调度器 
     * @param jobName 
     * @Title: QuartzManager.java 
     */  
    public static void removeJob(Scheduler sched,String jobName,String groupName) {  
        try {  
            TriggerKey triggerKey = new TriggerKey(jobName, groupName);  
            sched.pauseTrigger(triggerKey);// 停止触发器  
            sched.unscheduleJob(triggerKey);// 移除触发器  
            JobKey jobKey = new JobKey(jobName, groupName);  
            sched.deleteJob(jobKey);// 删除任务  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    /** 
     * @Description:启动所有定时任务 
     * @param sched 调度器 
     * @Title: QuartzManager.java 
     */  
    public static void startJobs(Scheduler sched) {  
        try {  
            sched.start();  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    /** 
     * @Description:关闭所有定时任务 
     * @param sched 调度器 
     */  
    public static void shutdownJobs(Scheduler sched) {  
        try {  
            if (!sched.isShutdown()) {  
                sched.shutdown();  
            }  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
} 