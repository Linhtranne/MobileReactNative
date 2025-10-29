package com.duong.ss22.dto.response;

import com.duong.ss22.enums.PriorityLevel;
import com.duong.ss22.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisplayTaskDTO {
    private Integer id;
    private String name;
    private PriorityLevel priority;
    private TaskStatus status;
    private String description;
}
