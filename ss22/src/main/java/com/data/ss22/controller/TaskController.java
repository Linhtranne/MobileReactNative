package com.duong.ss22.controller;

import com.duong.ss22.dto.request.ChangeStatusDTO;
import com.duong.ss22.dto.request.CreateTaskDTO;
import com.duong.ss22.dto.request.UpdateTaskDTO;
import com.duong.ss22.dto.response.ApiResponse;
import com.duong.ss22.dto.response.DisplayTaskDTO;
import com.duong.ss22.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;


    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Integer id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DisplayTaskDTO>> createTask(
            @Valid @RequestBody CreateTaskDTO dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DisplayTaskDTO>> updateTask(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateTaskDTO dto) {
        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<DisplayTaskDTO>> changeStatus(
            @PathVariable Integer id,
            @Valid @RequestBody ChangeStatusDTO dto) {
        return ResponseEntity.ok(taskService.changeStatus(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id) {
        return ResponseEntity.ok(taskService.deleteTask(id));
    }
}
