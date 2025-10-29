package com.duong.ss22.dto.request;

import com.duong.ss22.enums.PriorityLevel;
import com.duong.ss22.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateTaskDTO {
    @NotBlank(message = "Tên task không được để trống")
    @Size(max = 250, message = "Tên task tối đa 250 ký tự")
    private String name;

    @NotNull(message = "Mức độ ưu tiên không được để trống")
    private PriorityLevel priority;

    @Size(max = 500, message = "Mô tả tối đa 500 ký tự")
    private String description;
}