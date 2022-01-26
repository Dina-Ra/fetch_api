package com.controller;

import com.model.Role;
import com.model.User;
import com.service.RoleService;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api")
public class AdminRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users/name")
    public User getAdminByName(Principal principal) {
        User user = userService.getUser(principal.getName());
        System.out.println(user);
        return user;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") long id) {
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        User newUser = user;
        userService.addUser(newUser);
    }

    @PutMapping("/users/{id}")
    public void updateUser(@RequestBody User user, @PathVariable("id") long id) {
        userService.updateUser(user, id);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.removeUserById(id);
    }


}
