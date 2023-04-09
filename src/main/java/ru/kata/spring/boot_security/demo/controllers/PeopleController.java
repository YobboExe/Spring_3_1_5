package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping(value = "/people")
public class PeopleController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping()
    public String mainPage() {
        return "admin-page-new";
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
    public User update(User updatedUser, @RequestParam("roles") String roles) {
        System.out.println("Выполнение update!!!!!fapfaKFJJSGKGLN!!!!!!!!!");
        System.out.println(updatedUser.getEmail() + updatedUser.getId());
        System.out.println(roles);

        User user = userServiceImpl.findUser(updatedUser.getId());
        user.setAuthority(userServiceImpl.getRoleById(Long.valueOf(roles)));
        updatedUser.setAuthority(user.getAuthority());
        userServiceImpl.update(user.getId(), updatedUser);
        return user;
    }

    @DeleteMapping(value = "/delete")
    @ResponseBody
    public ResponseEntity<?> delete(@RequestParam("id") String id) {
        userServiceImpl.deleteUser(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public User addUser(User user, @RequestParam("roles") String role) {
        System.out.println(user.getFirst_name());
        user.setAuthority(userServiceImpl.getRoleById(Long.valueOf(role)));
        userServiceImpl.saveUser(user);
        return user;
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public User getPerson(@PathVariable("id") Long id) {
        return userServiceImpl.findUser(id);
    }
}
