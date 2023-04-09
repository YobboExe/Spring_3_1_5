package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found!", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getAuthority()));
    }

    public Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    public User findUser(Long id) {
        return userRepository.findById(id).get();
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public Optional<User> fineOne(int id) {
        return Optional.empty();
    }


    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public void update(Long id, User updatedUser) {
        Optional<User> originalUser = userRepository.findById(id);

        if (originalUser.isPresent()) {
            User user = originalUser.get();
            user.setId(updatedUser.getId());
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setAge(updatedUser.getAge());
            user.setFirst_name(updatedUser.getFirst_name());
            user.setLast_name(updatedUser.getLast_name());
            user.setEmail(updatedUser.getEmail());
            user.setAuthority(updatedUser.getAuthority());
            userRepository.save(user);
        }
    }
    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
