package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminsController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping()
    public String userList(Model model, Principal principal) {
        final String currentUser = principal.getName();
        model.addAttribute("users", userServiceImpl.allUsers());
        model.addAttribute("authUser", userServiceImpl.findByUsername(currentUser));
        model.addAttribute("new_user", new User());
        model.addAttribute("edit_user", new User());
        model.addAttribute("roles", roleRepository.findAll());
        return "admin-page";
    }

    @PostMapping("/create")
    public String addUser(@ModelAttribute("new_user") User user, @RequestParam("rol") Long[] roles) {
        user.setAuthority(roleRepository.getById(roles[0]));
        userServiceImpl.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/update")
    public String update(@ModelAttribute("edit_user") User updatedUser, @RequestParam("rol") Long[] roles, @RequestParam("id") Long id) {
        updatedUser.setAuthority(roleRepository.getById(roles[0]));
        System.out.println(updatedUser.getId());
        userServiceImpl.update(id, updatedUser);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userServiceImpl.deleteUser(id);
        return "redirect:/admin";
    }


}
