package ru.kata.spring.boot_security.demo.UserInvalid;

public class NoUserException extends RuntimeException{
    public NoUserException(String message) {
        super(message);
    }
}
