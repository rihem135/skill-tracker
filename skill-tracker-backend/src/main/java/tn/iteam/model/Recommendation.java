package tn.iteam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recommendations")
public class Recommendation {
    @Id
    private String id;
    private String userId;
    //private String employeeId;
    private String trainingId;
    private String titreFormation;
    private String plateforme;
    private String url;
    private double scoreRelevance;  // 0 a 100
    private String raisonRecommandation;
    private boolean vue;
    private boolean suivie;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
