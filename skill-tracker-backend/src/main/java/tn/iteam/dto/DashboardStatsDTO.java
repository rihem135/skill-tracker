package tn.iteam.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsDTO {
    private long totalEmployes;
    private long totalCompetences;
    private long totalFormations;
    private long totalRecommandations;
    private double tauxRecoSuivies;
}
