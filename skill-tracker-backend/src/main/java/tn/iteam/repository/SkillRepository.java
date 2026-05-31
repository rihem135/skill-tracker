package tn.iteam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.iteam.model.Skill;

import java.util.List;

public interface SkillRepository extends MongoRepository<Skill, String> {

    // 🔥 FILTRE PAR CATEGORIE
    List<Skill> findByCategorie(String categorie);

    // 🔥 SEARCH PAR NOM
    List<Skill> findByNomContainingIgnoreCase(String nom);

    // ⭐ COMPÉTENCES PAR UTILISATEUR
    List<Skill> findByUserId(String userId);
}