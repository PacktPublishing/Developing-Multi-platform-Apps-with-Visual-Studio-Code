package com.jobsystem.schedule;

import org.springframework.data.annotation.Id;

public class ScheduleJob {

	@Id
	public String id;
	public String jobType;
	public String jobDescription;
	public String agentUser;  
	public String requestDate;
	public String contactNo;
	public String address;
	public String city;
	public String status;
	public String requestedBy;
	public String completedDate;
	public String completedBy;
	public String agentRemarks;


	public ScheduleJob() {}

	public ScheduleJob( String jobType, String jobDescription, String agentUser, String requestDate, String contactNo, 
	String address, String city, String status, String requestedBy, String completedDate, String completedBy,
	String agentRemarks) {
	 	this.jobType= jobType;
		this.jobDescription = jobDescription;
		this.agentUser = agentUser; 

		this.requestDate = requestDate;
		this.contactNo = contactNo;
		this.address = address;
		this.city  = city;
		this.status = status;
		this.requestedBy = requestedBy;
		this.completedDate = completedDate;
		this.completedBy  = completedBy;
		this.agentRemarks = agentRemarks;
		
	}

}

