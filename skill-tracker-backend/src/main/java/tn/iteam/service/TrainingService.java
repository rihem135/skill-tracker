package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.model.Training;
import tn.iteam.repository.TrainingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingService {

    private final TrainingRepository trainingRepository;

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    // 🔥 GET ALL (USER + ADMIN)
    public List<Training> findAll() {
        return trainingRepository.findAll();
    }

    // CREATE (ADMIN)
    public Training create(Training training) {

        training.setUserId(getCurrentUserEmail());

        return trainingRepository.save(training);
    }

    // UPDATE
    public Training update(String id, Training training) {

        Training existing = findById(id);

        if (!existing.getUserId().equals(getCurrentUserEmail())) {
            throw new RuntimeException("Accès refusé");
        }

        existing.setTitre(training.getTitre());
        existing.setDescription(training.getDescription());
        existing.setPlateforme(training.getPlateforme());
        existing.setUrl(training.getUrl());
        existing.setNiveau(training.getNiveau());
        existing.setDureeHeures(training.getDureeHeures());
        existing.setRating(training.getRating());
        existing.setGratuit(training.isGratuit());
        existing.setSkillsCiblesIds(training.getSkillsCiblesIds());

        return trainingRepository.save(existing);
    }

    // DELETE
    public void delete(String id) {

        Training existing = findById(id);

        if (!existing.getUserId().equals(getCurrentUserEmail())) {
            throw new RuntimeException("Accès refusé");
        }

        trainingRepository.deleteById(id);
    }

    // FIND BY ID
    public Training findById(String id) {
        return trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));
    }

    // SKILL FILTER
    public List<Training> findBySkill(String skillId) {
        return trainingRepository.findBySkillsCiblesIdsContaining(skillId);
    }

    // GRATUITES
    public List<Training> findGratuites() {
        return trainingRepository.findByGratuit(true);
    }
}