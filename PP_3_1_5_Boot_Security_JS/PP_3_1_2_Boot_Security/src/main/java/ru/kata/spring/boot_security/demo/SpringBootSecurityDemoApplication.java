package ru.kata.spring.boot_security.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	private final RoleService roleService;
	private final UserService userService;

	@Autowired
	public SpringBootSecurityDemoApplication(RoleService roleService, UserService userService) {
		this.roleService = roleService;
		this.userService = userService;
	}

	@PostConstruct
	public void fillDataBase() throws Exception {

		Role role_admin = new Role("ROLE_ADMIN");
		Role role_user = new Role("ROLE_USER");
		Role role_guest = new Role("ROLE_VIP");

		roleService.save(role_admin);
		roleService.save(role_user);
		roleService.save(role_guest);

		HashSet<Role> rolesForAdmin = new HashSet<>();
		rolesForAdmin.add(role_admin);
		rolesForAdmin.add(role_user);

		HashSet<Role> rolesForUser = new HashSet<>();
		rolesForUser.add(role_user);
		rolesForUser.add(role_guest);

		userService.saveTestUser(new User("Michael", "Jordan",(byte)20, "admin@mail.ru", "admin", "admin", rolesForAdmin));
		userService.saveTestUser(new User("Harry", "Potter",(byte)20, "user@mail.ru", "user", "user", rolesForUser));
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
	}
}

