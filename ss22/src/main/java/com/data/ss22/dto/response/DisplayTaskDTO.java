package com.data.ss22.dto.response;

import com.data.ss22.enums.PriorityLevel;
import com.data.ss22.enums.TaskStatus;
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
