package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/people")
public class PeopleController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping()
    public String mainPage() {
        return "test";
    }

    @GetMapping(value = "/list")
    @ResponseBody
    public List<User> getPeople() {
        return userServiceImpl.allUsers();
    }

    @GetMapping(value = "/current")
    @ResponseBody
    public User getPrincipal(Principal principal) {
        final String currentUser = principal.getName();
        return userServiceImpl.findByUsername(currentUser);
    }

    @GetMapping("/roles")
    @ResponseBody
    public List<Role> getRoles() {
        return userServiceImpl.findAllRoles();
    }

    @PatchMapping("/update")
    public String update(@ModelAttribute("edit_user") User updatedUser, @RequestParam("rol") String[] roles) {
        User user = userServiceImpl.findUser(updatedUser.getId());
        user.setAuthority(userServiceImpl.getRoleById(Long.valueOf(roles[0])));
        updatedUser.setAuthority(user.getAuthority());
        userServiceImpl.update(user.getId(), updatedUser);
        return "test";
    }

    public void delete() {

    }

    @PostMapping("/create")
    public void addUser(@ModelAttribute("new_user") User user, @RequestParam("rol") Long[] roles) {
        user.setAuthority(userServiceImpl.getRoleById(roles[0]));
        userServiceImpl.saveUser(user);
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public User getPerson(@PathVariable("id") Long id) {
        return userServiceImpl.findUser(id);
    }
}
