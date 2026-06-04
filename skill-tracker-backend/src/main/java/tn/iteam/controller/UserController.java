package tn.iteam.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.model.User;
import tn.iteam.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User introuvable"));
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        userRepository.deleteById(id);
    }
}