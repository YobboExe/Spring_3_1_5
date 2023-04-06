package ru.kata.spring.boot_security.demo.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.awt.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/people", produces = "application/json")
public class PeopleController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping(produces="application/json")
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

    @PatchMapping(value = "/update")
    @ResponseBody
    public void update(@RequestBody User updatedUser) {
        System.out.println("Выполнение update!!!!!fapfaKFJJSGKGLN!!!!!!!!!");
        System.out.println(updatedUser.getEmail()); // пишет admin@mail.com
        System.out.println(updatedUser.getAuthority()); //тут пусто - []


//        System.out.println(updatedUser.getFirst_name());
//        System.out.println(updatedUser.getRole().get().getName());
//        for (Role r : updatedUser.getAuthority()) {
//            System.out.println(r.getName());
//        }
//        User user = userServiceImpl.findUser(updatedUser.getId());
//        user.setAuthority(userServiceImpl.getRoleById(Long.valueOf(updatedUser.getRole().get().getId())));
//        updatedUser.setAuthority(user.getAuthority());
//        userServiceImpl.update(user.getId(), updatedUser);
//        return "test1";
    }

    public void delete() {

    }

    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseBody
    public String addUser(User user, @RequestParam("rol") String role) {
        user.setAuthority(userServiceImpl.getRoleById(Long.valueOf(role)));
        userServiceImpl.saveUser(user);
        return "test123";
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public User getPerson(@PathVariable("id") Long id) {
        return userServiceImpl.findUser(id);
    }
}
