package tn.iteam.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.model.User;
import tn.iteam.repository.UserRepository;
import tn.iteam.security.AdminSecurity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        AdminSecurity.checkAdmin();
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        AdminSecurity.checkAdmin();
        userRepository.deleteById(id);
    }

    public User updateRole(String id, String role) {
        AdminSecurity.checkAdmin();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        user.setRole(role.toUpperCase());
        return userRepository.save(user);
    }
}