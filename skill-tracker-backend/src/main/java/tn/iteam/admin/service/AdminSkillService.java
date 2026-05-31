package tn.iteam.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.model.Skill;
import tn.iteam.repository.SkillRepository;
import tn.iteam.security.AdminSecurity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminSkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        AdminSecurity.checkAdmin();
        return skillRepository.findAll();
    }

    public Skill create(Skill skill) {
        AdminSecurity.checkAdmin();
        return skillRepository.save(skill);
    }

    public Skill update(String id, Skill skill) {
        AdminSecurity.checkAdmin();

        Skill existing = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill introuvable"));

        existing.setNom(skill.getNom());
        existing.setCategorie(skill.getCategorie());
        existing.setDescription(skill.getDescription());
        existing.setNiveauRequis(skill.getNiveauRequis());
        existing.setTechnologiesAssociees(skill.getTechnologiesAssociees());

        return skillRepository.save(existing);
    }

    public void delete(String id) {
        AdminSecurity.checkAdmin();
        skillRepository.deleteById(id);
    }
}