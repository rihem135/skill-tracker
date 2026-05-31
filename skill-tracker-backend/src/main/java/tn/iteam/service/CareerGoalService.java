package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.dto.CareerGoalDTO;
import tn.iteam.model.CareerGoal;
import tn.iteam.repository.CareerGoalRepository;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerGoalService {
    private final CareerGoalRepository careerGoalRepository;

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    public List<CareerGoal> findMyGoals() {

        String email = getCurrentUserEmail();

        return careerGoalRepository.findByUserId(email);
    }

    public CareerGoal create(CareerGoalDTO dto) {

        String email = getCurrentUserEmail();

        CareerGoal goal = CareerGoal.builder()
                .userId(email)
                .titre(dto.getTitre())
                .description(dto.getDescription())
                .statut(dto.getStatut() != null ? dto.getStatut() : "en_cours")
                .dateEcheance(dto.getDateEcheance())
                .progression(dto.getProgression())
                .skillsCibleesIds(dto.getSkillsCibleesIds())
                .build();

        return careerGoalRepository.save(goal);
    }

    public CareerGoal updateProgression(String id, int progression) {

        String email = getCurrentUserEmail();

        CareerGoal goal = careerGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Objectif non trouvé"));

        if (!goal.getUserId().equals(email)) {
            throw new RuntimeException("Accès refusé");
        }

        goal.setProgression(progression);
        if (progression >= 100) goal.setStatut("atteint");

        return careerGoalRepository.save(goal);
    }

    public void delete(String id) {

        String email = getCurrentUserEmail();

        CareerGoal goal = careerGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Objectif non trouvé"));

        if (!goal.getUserId().equals(email)) {
            throw new RuntimeException("Accès refusé");
        }

        careerGoalRepository.deleteById(id);
    }
}
