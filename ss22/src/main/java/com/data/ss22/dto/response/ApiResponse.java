package com.data.ss22.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private List<Object> errors;
    private LocalDateTime timestamp;

    // Constructor cho thành công
    public ApiResponse(T data, String message) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.errors = null;
        this.timestamp = LocalDateTime.now();
    }

    // Constructor cho thất bại
    public ApiResponse(String message, List<Object> errors) {
        this.success = false;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.timestamp = LocalDateTime.now();
    }

    // Static factory
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message);
    }

    public static <T> ApiResponse<T> fail(String message, List<Object> errors) {
        return new ApiResponse<>(message, errors);
    }
}
