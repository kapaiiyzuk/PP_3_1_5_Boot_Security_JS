package ru.kata.spring.boot_security.demo.repository;

import ru.kata.spring.boot_security.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);

    Role getById (Long id);

    List<Role> findAll();
}
