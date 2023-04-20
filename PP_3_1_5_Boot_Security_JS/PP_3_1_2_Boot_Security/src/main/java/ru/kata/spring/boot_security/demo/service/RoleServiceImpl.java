package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.getById(id);
    }

    @Override
    public List<Role> allRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getDefaultRole() {
        return getRoleByName("ROLE_USER");
    }

    @Override
    public void save(Role role) {
        roleRepository.save(role);
    }

    @Override
    public Set<Role> getRoleSet(String[] role) {
        Set<Role> roleSet = new HashSet<>();
        for (String roles : role) {
            roleSet.add(getRoleByName(roles));
        }
        return roleSet;
    }

//    @Override
//    @PostConstruct
//    public void addDefaultRole() {
//        roleRepository.save(new Role("ROLE_USER"));
//        roleRepository.save(new Role("ROLE_ADMIN"));
//    }
}
