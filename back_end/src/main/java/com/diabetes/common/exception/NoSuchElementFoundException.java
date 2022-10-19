package com.diabetes.common.exception;

import org.springframework.http.HttpStatus;

public class NoSuchElementFoundException extends CustomApiException {
    public NoSuchElementFoundException() { super();}
    public NoSuchElementFoundException(String message, HttpStatus status) {
        super(message, status);
    }
    public NoSuchElementFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public NoSuchElementFoundException(String message) {
        super(message);
    }
    public NoSuchElementFoundException(Throwable cause) { super(cause); }
}
