package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.*;

@Component
public class OnStart implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
        user.setFirst_name("user");
        user.setLast_name("user");
        user.setAge(23);
        user.setEmail("user@mail.ru");
        user.setAuthority(userRole);
        userRepository.save(user);

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirst_name("admin");
        admin.setLast_name("admin");
        admin.setAge(29);
        admin.setEmail("admin@mail.ru");
        admin.setAuthority(adminRole);

        System.out.println("this is the ADMIN AAA role ->>>>" + adminRole.getName());
        for (Role role : userRoles) {
            System.out.println(role.getName());
        }
        userRepository.save(admin);

//        Set<Role> someSet = new HashSet<>();
//        someSet.add(roleRepository.getById(0L));
//
//        Long[] wtf = someSet.stream()
//                .map(x -> Long.valueOf(x.getRole_id()))
//                .toArray(Long[]::new);
//        Arrays.stream(wtf).forEach(System.out::println);
//        List<Role> role = roleRepository.findAll();


//        Set<Role> existingRole = new HashSet<>();
//        existingRole.add(role.get(0));
//
//        User user1 = new User();
//        user1.setUsername("admin");
//        user1.setPassword("admin");
//        user1.setFirst_name("admin");
//        user1.setLast_name("admin");
//        user1.setAge(29);
//        user1.setEmail("admin@mail.ru");
//        user1.setAuthority(role.get(0));
//
//        userRepository.save(user1);
    }
}
