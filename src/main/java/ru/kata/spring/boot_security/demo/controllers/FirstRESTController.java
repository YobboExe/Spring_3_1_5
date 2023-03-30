package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.UserInvalid.NoUserException;
import ru.kata.spring.boot_security.demo.UserInvalid.UserError;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FirstRESTController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/users")
    public List<User> allUsers() {
        return userService.allUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") Long id) {
        User foundUser = userService.findUser(id);
        if (foundUser == null) {
            throw new NoUserException("There is no user with ID = " +
            id + " long Database");
        }
        return foundUser;
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @GetMapping("/sayHello")
    public String sayHello() {
        return "Hello world!";
    }
}
