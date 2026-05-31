package tn.iteam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "trainings")
public class Training {
    @Id
    private String id;
    private String userId;
    private String titre;
    private String description;
    private String plateforme;   // Udemy, Coursera, YouTube, LinkedIn Learning
    private String url;
    private String niveau;       // debutant, intermediaire, avance
    private int dureeHeures;
    private double rating;
    private boolean gratuit;

    private List<String> skillsCiblesIds;
}
