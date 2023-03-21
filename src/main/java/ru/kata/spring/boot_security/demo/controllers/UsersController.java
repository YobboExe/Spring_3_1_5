package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;
import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UsersController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/user-page")
    public String userPage(Principal principal, Model model) {
        final String currentUser = principal.getName();
        model.addAttribute("authUser", userServiceImpl.findByUsername(currentUser));
        model.addAttribute("roles", roleRepository.findAll());
        return "user-page";
    }



}
