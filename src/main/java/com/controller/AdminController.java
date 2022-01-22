package com.controller;

import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String getAdminByName(Principal principal, Model model) {
        model.addAttribute("user", userService.getUser(principal.getName()));
        return "admin";
    }

//    @GetMapping("/{id}")
//    public String showUser(@PathVariable("id") int id, ModelMap model) {
//        User user = userService.getUser(id);
//        model.addAttribute("user", user);
//        List<Role> roles = user.getRoles().stream().collect(Collectors.toList());
//        model.addAttribute("roles", roles);
//        return "show";
//    }
//
//    @PostMapping("/add")
//    public String addUser(@ModelAttribute("user") User user, @ModelAttribute("listRoles") String[] roles) {
//        System.out.println(user);
//        System.out.println(roles);
//        Set<Role> userRoles = new HashSet<>();
//        for (String role: roles) {
//            userRoles.add(roleService.getRole("ROLE_" + role));
//            if (role.equals("ADMIN")) {
//                userRoles.add(roleService.getRole("ROLE_USER"));
//            }
//        }
//        user.setRoles(userRoles);
//        userService.addUser(user);
//        return "redirect:/admin/";
//    }
//
//    @PatchMapping("/{id}/patch")
//    public String updateUser(@ModelAttribute("user") User user, @ModelAttribute(
//            "listRoles") String[] roles) {
//        Set<Role> userRoles = new HashSet<>();
//        for (String role: roles) {
//            userRoles.add(roleService.getRole("ROLE_" + role));
//            if (role.equals("ADMIN")) {
//                userRoles.add(roleService.getRole("ROLE_USER"));
//            }
//        }
//        user.setRoles(userRoles);
//        userService.addUser(user);
//        return "redirect:/admin/";
//    }
//
//    @DeleteMapping("/{id}/delete")
//    public String delete(@PathVariable("id") int id) {
//        userService.removeUserById(id);
//        return "redirect:/admin/";
//    }








    //    @GetMapping("/new")
//    public String newUser(Model model) {
//        User user = new User();
//        model.addAttribute("user", user);
//        return "new";
//    }
    //    @GetMapping("/")
//    public String getUsers(ModelMap model, Principal principal) {
//        model.addAttribute("users", userService.getAllUsers());
//        User user = userService.getUser(principal.getName());
//        model.addAttribute("user", user);
//        return "admin";
//    }

//    @GetMapping("/{id}/delete")
//    public String deleteUser(ModelMap modelMap, @PathVariable("id") long id) {
//        modelMap.addAttribute("user", userService.getUser(id));
//        return "delete";
//    }

//    @GetMapping("/{id}")
//    public String editUser(ModelMap modelMap, @PathVariable("id") long id) {
//        modelMap.addAttribute("user", userService.getUser(id));
//        return "redirect:/admin/";
//    }
}

