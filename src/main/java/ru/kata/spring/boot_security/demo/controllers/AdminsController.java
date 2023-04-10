package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminsController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping()
    public String userList(Model model, Principal principal) {
        final String currentUser = principal.getName();
        model.addAttribute("users", userServiceImpl.allUsers());
        model.addAttribute("authUser", userServiceImpl.findByUsername(currentUser));
        model.addAttribute("new_user", new User());
        model.addAttribute("edit_user", new User());
        model.addAttribute("roles", userServiceImpl.findAllRoles());
        return "admin-page";
    }


}
