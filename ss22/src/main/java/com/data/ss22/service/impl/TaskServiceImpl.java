package com.data.ss22.service.impl;

import com.data.ss22.dto.request.ChangeStatusDTO;
import com.data.ss22.dto.request.CreateTaskDTO;
import com.data.ss22.dto.request.UpdateTaskDTO;
import com.data.ss22.dto.response.ApiResponse;
import com.data.ss22.dto.response.DisplayTaskDTO;
import com.data.ss22.entity.Task;
import com.data.ss22.enums.TaskStatus;
import com.data.ss22.repository.TaskRepo;
import com.data.ss22.service.TaskService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepo taskRepo;

    private DisplayTaskDTO mapToDTO(Task t) {
        return DisplayTaskDTO.builder()
                .id(t.getId())
                .name(t.getName())
                .priority(t.getPriority())
                .status(t.getStatus())
                .description(t.getDescription())
                .build();
    }

    @Override
    public ApiResponse<List<DisplayTaskDTO>> getAllTasks() {
        List<DisplayTaskDTO> dtos = taskRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();

        return ApiResponse.success(dtos, "Lấy danh sách task thành công");
    }

    @Override
    public ApiResponse<DisplayTaskDTO> getTaskById(Integer id) {
        return taskRepo.findById(id)
                .map(task -> ApiResponse.success(mapToDTO(task), "Lấy chi tiết task thành công"))
                .orElseGet(() -> ApiResponse.fail(
                        "Không tìm thấy task với id = " + id,
                        List.of("TASK_NOT_FOUND")
                ));
    }

    @Override
    @Transactional
    public ApiResponse<Void> deleteTask(Integer id) {
        return taskRepo.findById(id)
                .map(task -> {
                    taskRepo.deleteById(id);

                    return ApiResponse.<Void>success(null, "Xóa task thành công");
                })
                .orElseGet(() -> ApiResponse.fail(
                        "Không tìm thấy task với id = " + id,
                        List.of("TASK_NOT_FOUND")
                ));
    }


    @Override
    @Transactional
    public ApiResponse<DisplayTaskDTO> createTask(CreateTaskDTO dto) {
        Task task = new Task();
        task.setName(dto.getName() != null ? dto.getName().trim() : null);
        task.setPriority(dto.getPriority());
        task.setStatus(TaskStatus.PENDING);
        task.setDescription(StringUtils.hasText(dto.getDescription()) ? dto.getDescription().trim() : null);
        Task saved = taskRepo.save(task);
        return ApiResponse.success(mapToDTO(saved), "Tạo task thành công");
    }

    @Override
    @Transactional
    public ApiResponse<DisplayTaskDTO> updateTask(Integer id, UpdateTaskDTO dto) {
        return taskRepo.findById(id)
                .map(task -> {
                    task.setName(dto.getName().trim());
                    task.setPriority(dto.getPriority());
                    task.setDescription(StringUtils.hasText(dto.getDescription()) ? dto.getDescription().trim() : null);

                    Task saved = taskRepo.save(task);
                    return ApiResponse.success(mapToDTO(saved), "Cập nhật task thành công");
                })
                .orElseGet(() -> ApiResponse.fail(
                        "Không tìm thấy task với id = " + id,
                        List.of("TASK_NOT_FOUND")
                ));
    }

    @Override
    @Transactional
    public ApiResponse<DisplayTaskDTO> changeStatus(Integer id, ChangeStatusDTO dto) {
        return taskRepo.findById(id)
                .map(task -> {
                    task.setStatus(dto.getStatus());
                    Task saved = taskRepo.save(task);
                    return ApiResponse.success(mapToDTO(saved), "Cập nhật trạng thái task thành công");
                })
                .orElseGet(() -> ApiResponse.fail(
                        "Không tìm thấy task với id = " + id,
                        List.of("TASK_NOT_FOUND")
                ));
    }

}
