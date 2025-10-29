package com.data.ss22.dto.request;

import com.data.ss22.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ChangeStatusDTO {
    @NotNull(message = "Status không được để trống")
    private TaskStatus status;
}
