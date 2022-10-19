package com.diabetes.common.exception;

import org.springframework.http.HttpStatus;

public class DuplicatedResoureException extends CustomApiException {

    public DuplicatedResoureException() { super();}

    public DuplicatedResoureException(String message) {
        super(message);
    }
    public DuplicatedResoureException(String message, HttpStatus status) { super(message, status); }

    public DuplicatedResoureException(String message, Throwable cause) {
        super(message, cause);
    }
    public DuplicatedResoureException(Throwable cause) { super(cause); }
}
