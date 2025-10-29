package com.duong.ss22.repository;

import com.duong.ss22.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task,Integer> {

}
