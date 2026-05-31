package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.dto.SaveSkillsRequest;
import tn.iteam.model.User;
import tn.iteam.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserSkillService {

    private final UserRepository userRepository;

    private String getCurrentUserEmail() {

        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    // ✅ sauvegarder compétences utilisateur
    public void saveSkills(SaveSkillsRequest request) {

        String email = getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        user.setSelectedSkillIds(request.getSkillIds());

        userRepository.save(user);
    }
}