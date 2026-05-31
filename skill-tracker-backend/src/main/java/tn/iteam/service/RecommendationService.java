package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.dto.RecommendationDTO;
import tn.iteam.model.Employee;
import tn.iteam.model.Recommendation;
import tn.iteam.model.Training;
import tn.iteam.repository.EmployeeRepository;
import tn.iteam.repository.RecommendationRepository;
import tn.iteam.repository.TrainingRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final EmployeeRepository employeeRepository;
    private final TrainingRepository trainingRepository;
    private final RecommendationRepository recommendationRepository;

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public List<RecommendationDTO> genererRecommandations() {

        String email = getCurrentUserEmail();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        Set<String> competencesMaitrisees = employee.getCompetences().stream()
                .filter(c -> c.getNiveau() >= 3)
                .map(Employee.CompetenceEntry::getSkillId)
                .collect(Collectors.toSet());

        List<RecommendationDTO> recommandations = trainingRepository.findAll().stream()
                .filter(f -> f.getSkillsCiblesIds() != null &&
                        f.getSkillsCiblesIds().stream()
                                .anyMatch(id -> !competencesMaitrisees.contains(id)))
                .map(f -> {
                    double score = calculerScore(f, employee);
                    return RecommendationDTO.builder()
                            .trainingId(f.getId())
                            .titreFormation(f.getTitre())
                            .plateforme(f.getPlateforme())
                            .url(f.getUrl())
                            .niveau(f.getNiveau())
                            .dureeHeures(f.getDureeHeures())
                            .rating(f.getRating())
                            .gratuit(f.isGratuit())
                            .scoreRelevance(score)
                            .raisonRecommandation(genererRaison(f, employee, score))
                            .build();
                })
                .sorted(Comparator.comparingDouble(RecommendationDTO::getScoreRelevance).reversed())
                .limit(10)
                .toList();

        sauvegarder(email, recommandations);

        return recommandations;
    }

    private double calculerScore(Training training, Employee employee) {
        double score = 0;

        score += training.getRating() * 8;

        if (correspondanceNiveau(training.getNiveau(), employee.getNiveauExperience()))
            score += 30;
        else
            score += 10;

        if (training.isGratuit()) score += 10;
        if (training.getDureeHeures() <= 20) score += 10;

        if ("Coursera".equalsIgnoreCase(training.getPlateforme())
                || "LinkedIn Learning".equalsIgnoreCase(training.getPlateforme())) {
            score += 5;
        }

        return Math.min(score, 100);
    }

    private boolean correspondanceNiveau(String nf, String ne) {
        if (nf == null || ne == null) return false;

        Map<String, Integer> niveaux = Map.of(
                "debutant", 1, "intermediaire", 2, "avance", 3,
                "junior", 1, "mid", 2, "senior", 3
        );

        return Math.abs(
                niveaux.getOrDefault(nf.toLowerCase(), 2)
                        - niveaux.getOrDefault(ne.toLowerCase(), 2)
        ) <= 1;
    }

    private String genererRaison(Training t, Employee e, double score) {
        if (score >= 80) return "Très pertinent pour votre profil";
        if (score >= 60) return "Recommandé pour progresser";
        return "Formation complémentaire";
    }

    private void sauvegarder(String userId, List<RecommendationDTO> dtos) {

        recommendationRepository.deleteAll(
                recommendationRepository.findByUserId(userId)
        );

        List<Recommendation> list = dtos.stream()
                .map(dto -> Recommendation.builder()
                        .userId(userId)
                        .trainingId(dto.getTrainingId())
                        .titreFormation(dto.getTitreFormation())
                        .plateforme(dto.getPlateforme())
                        .url(dto.getUrl())
                        .scoreRelevance(dto.getScoreRelevance())
                        .raisonRecommandation(dto.getRaisonRecommandation())
                        .vue(false)
                        .suivie(false)
                        .build())
                .toList();

        recommendationRepository.saveAll(list);
    }

    public List<Recommendation> findMyRecommendations() {
        return recommendationRepository.findByUserIdOrderByScoreRelevanceDesc(
                getCurrentUserEmail()
        );
    }

    public Recommendation marquerVue(String id) {
        Recommendation r = recommendationRepository.findById(id)
                .orElseThrow();
        r.setVue(true);
        return recommendationRepository.save(r);
    }

    public Recommendation marquerSuivie(String id) {
        Recommendation r = recommendationRepository.findById(id)
                .orElseThrow();
        r.setSuivie(true);
        return recommendationRepository.save(r);
    }
}
