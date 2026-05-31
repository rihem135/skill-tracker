package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.model.Skill;
import tn.iteam.model.User;
import tn.iteam.repository.SkillRepository;
import tn.iteam.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    // ⭐ GET ALL
    public List<Skill> findAll() {
        return skillRepository.findAll();
    }

    // ⭐ GET BY ID
    public Skill findById(String id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compétence non trouvée"));
    }

    // ⭐ CREATE
    public Skill create(Skill skill) {
        return skillRepository.save(skill);
    }

    // ⭐ UPDATE
    public Skill update(String id, Skill skill) {

        Skill existing = findById(id);

        existing.setNom(skill.getNom());
        existing.setCategorie(skill.getCategorie());
        existing.setDescription(skill.getDescription());
        existing.setNiveauRequis(skill.getNiveauRequis());
        existing.setTechnologiesAssociees(skill.getTechnologiesAssociees());

        return skillRepository.save(existing);
    }

    // ⭐ DELETE
    public void delete(String id) {
        skillRepository.deleteById(id);
    }

    // ⭐ FILTER
    public List<Skill> findByCategorie(String categorie) {
        return skillRepository.findByCategorie(categorie);
    }

    // ⭐ SEARCH
    public List<Skill> search(String keyword) {
        return skillRepository.findByNomContainingIgnoreCase(keyword);
    }

    // ⭐ SAVE USER SKILLS
    public void saveUserSkills(List<String> skillIds) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User non trouvé"));

        // ✅ CORRECTION ICI
        user.setSelectedSkillIds(skillIds);

        userRepository.save(user);
    }

    // ⭐ GET USER SKILLS
    public List<Skill> getUserSkills() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        return skillRepository.findAllById(user.getSelectedSkillIds());
    }
}