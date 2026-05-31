package tn.iteam.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.model.User;
import tn.iteam.admin.service.AdminUserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public List<User> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        adminUserService.deleteUser(id);
    }

    @PutMapping("/{id}/role")
    public User updateRole(@PathVariable String id,
                           @RequestBody Map<String, String> body) {
        return adminUserService.updateRole(id, body.get("role"));
    }
}