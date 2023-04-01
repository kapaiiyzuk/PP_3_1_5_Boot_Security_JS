package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    @Lazy
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByUsername(String username) {

        User user = null;
        try {
            user = userRepository.findByUsername(username);
        } catch (Exception e) {
            System.err.println("Error search user in database .....");
            System.err.println("User with name -> " + username + "not found in database");
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public User getByIdService(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public boolean save(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            System.err.println("Error create new user .....");
            System.err.println("An account already exists for this username -> " + user.getUsername());
            System.err.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(User updatedUser) {
        try {
            // выполняем проверку - если пароль был изменен шифруем новый пароль и обновляем запись в базе
            if (!updatedUser.getPassword().equals(getByIdService(updatedUser.getId()).getPassword())) {
                updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            userRepository.save(updatedUser);
            return true;
        } catch (Exception e) {
            System.err.println("Error edit user .....");
            System.err.println("User with username -> " + updatedUser.getUsername() + " <- already exist in db");
            System.err.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void delete(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            System.err.println("Error delete user .....");
            System.err.println(e.getMessage());
        }
    }

    @Override
    public void saveTestUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }
}
