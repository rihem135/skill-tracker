package tn.iteam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationDTO {
    private String trainingId;
    private String titreFormation;
    private String plateforme;
    private String url;
    private String niveau;
    private int dureeHeures;
    private double rating;
    private boolean gratuit;
    private double scoreRelevance;
    private String raisonRecommandation;
}
