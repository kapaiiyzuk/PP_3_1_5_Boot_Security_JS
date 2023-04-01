package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getAllUsers();

    User getUserByUsername(String username);

    // User getUserById(Long id);

    User getByIdService(Long id);

    boolean save(User user);

    void saveTestUser(User user);

    boolean update(User updatedUser);

    void delete(Long id);

}
