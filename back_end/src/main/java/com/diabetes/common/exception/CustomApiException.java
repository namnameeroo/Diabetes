package com.diabetes.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomApiException extends RuntimeException{
    private HttpStatus status;

    // 응답처리에 활용할 상태값을 미리 지정해둔다.
    public CustomApiException(String message, HttpStatus status) {
        super(message);
        this.status= status;
    }
    public CustomApiException(String message) {
        super(message);
    }

    public CustomApiException() {
        super();
    }
    public CustomApiException(String message, Throwable cause) {
        super(message, cause);
    }
    public CustomApiException(Throwable cause) { super(cause); }
}
