package tn.iteam.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.model.Training;
import tn.iteam.repository.TrainingRepository;
import tn.iteam.security.AdminSecurity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminTrainingService {

    private final TrainingRepository trainingRepository;

    public List<Training> getAll() {
        AdminSecurity.checkAdmin();
        return trainingRepository.findAll();
    }

    public Training create(Training training) {
        AdminSecurity.checkAdmin();
        return trainingRepository.save(training);
    }

    public Training update(String id, Training training) {
        AdminSecurity.checkAdmin();

        Training existing = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training introuvable"));

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

    public void delete(String id) {
        AdminSecurity.checkAdmin();
        trainingRepository.deleteById(id);
    }
}