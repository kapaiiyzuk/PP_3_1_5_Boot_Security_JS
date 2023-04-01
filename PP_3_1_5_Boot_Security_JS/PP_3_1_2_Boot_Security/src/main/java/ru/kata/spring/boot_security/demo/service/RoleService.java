package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
//    void addDefaultRole();

    Role getRoleByName(String name);

    Role getRoleById(Long id);

    List<Role> allRoles();

    Role getDefaultRole();

    void save(Role role);

    Set<Role> getRoleSet(String[] role);
}
