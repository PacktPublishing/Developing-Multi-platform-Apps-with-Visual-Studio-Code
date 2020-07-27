package com.jobsystem.schedule;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
 
 
public interface ScheduleRepository extends MongoRepository<ScheduleJob, String>{

	public ScheduleJob findByid(String id);
	public List<ScheduleJob> findByjobType(String jobType);
	public List<ScheduleJob> findByagentUser(String agentUser);

}