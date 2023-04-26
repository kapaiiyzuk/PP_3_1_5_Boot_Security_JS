package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/")
public class RootController {


    public final UserService userService;
    public final RoleService roleService;

    @Autowired
    public RootController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @GetMapping("admin")
    public String showAllUsers(Model model, @AuthenticationPrincipal User authUser) {

        model.addAttribute("allRoles", roleService.allRoles());
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("user", authUser);
        return "admin";
    }
    @GetMapping("user")
    public String showUserPage(Model model, Principal principal){

        model.addAttribute("user", userService.getUserByUsername(principal.getName()));
        return "user";
    }
    @GetMapping("login")
    public String login() {
        return "login";
    }
}
