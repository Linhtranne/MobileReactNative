package com.duong.ss22.service;

import com.duong.ss22.dto.request.ChangeStatusDTO;
import com.duong.ss22.dto.request.CreateTaskDTO;
import com.duong.ss22.dto.request.UpdateTaskDTO;
import com.duong.ss22.dto.response.ApiResponse;
import com.duong.ss22.dto.response.DisplayTaskDTO;

import java.util.List;

public interface TaskService {
    ApiResponse<List<DisplayTaskDTO>> getAllTasks();
    ApiResponse<DisplayTaskDTO> getTaskById(Integer id);
    ApiResponse<Void> deleteTask(Integer id);
    ApiResponse<DisplayTaskDTO> createTask(CreateTaskDTO dto);

    ApiResponse<DisplayTaskDTO> updateTask(Integer id, UpdateTaskDTO dto);
    ApiResponse<DisplayTaskDTO> changeStatus(Integer id, ChangeStatusDTO dto);
}
