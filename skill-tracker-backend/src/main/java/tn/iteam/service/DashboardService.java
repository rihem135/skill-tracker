package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.dto.DashboardStatsDTO;
import tn.iteam.model.Recommendation;
import tn.iteam.repository.EmployeeRepository;
import tn.iteam.repository.RecommendationRepository;
import tn.iteam.repository.SkillRepository;
import tn.iteam.repository.TrainingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final TrainingRepository trainingRepository;
    private final RecommendationRepository recommendationRepository;

    private String getCurrentUserEmail() {
        return org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    public DashboardStatsDTO getStats() {

        String email = getCurrentUserEmail();

        // ✅ GLOBAL DATA (admin created)
        long totalCompetences = skillRepository.findAll().size();

        long totalFormations = trainingRepository.findAll().size();

        // ✅ USER FILTERED DATA
        long totalRecos = recommendationRepository.findAll()
                .stream()
                .filter(r -> email.equals(r.getUserId()))
                .count();

        List<Recommendation> toutesRecos = recommendationRepository.findAll()
                .stream()
                .filter(r -> email.equals(r.getUserId()))
                .toList();

        long recosSuivies = toutesRecos.stream()
                .filter(Recommendation::isSuivie)
                .count();

        double tauxSuivies = toutesRecos.isEmpty() ? 0 :
                Math.round((double) recosSuivies / toutesRecos.size() * 100.0 * 10) / 10.0;

        return DashboardStatsDTO.builder()
                .totalCompetences(totalCompetences)
                .totalFormations(totalFormations)
                .totalRecommandations(totalRecos)
                .tauxRecoSuivies(tauxSuivies)
                .build();
    }
}