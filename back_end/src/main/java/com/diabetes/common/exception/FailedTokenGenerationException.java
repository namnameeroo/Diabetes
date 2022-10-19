package com.diabetes.common.exception;

public class FailedTokenGenerationException extends RuntimeException {

    public FailedTokenGenerationException() {
        super("Failed to generate Token.");
    }

    private FailedTokenGenerationException(String message) {
        super(message);
    }
}
