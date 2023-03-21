package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.*;

@Component
public class OnStart implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Role userRole = new Role();
        userRole.setName("ROLE_USER");

        Role adminRole = new Role();
        adminRole.setName("ROLE_ADMIN");

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);



        User user = new User();
        user.setUsername("user");
        user.setPassword("user");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFirst_name("user");
        user.setLast_name("user");
        user.setAge(23);
        user.setEmail("user@mail.ru");
        user.setAuthority(userRole);
        userRepository.save(user);

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setFirst_name("admin");
        admin.setLast_name("admin");
        admin.setAge(29);
        admin.setEmail("admin@mail.ru");
        admin.setAuthority(adminRole);

        userRepository.save(admin);
    }
}
