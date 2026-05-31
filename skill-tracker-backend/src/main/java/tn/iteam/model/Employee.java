package tn.iteam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "employees")
public class Employee {
    @Id
    private String id;
    private String userId;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String poste;
    private String departement;
    private String niveauExperience; // junior, mid, senior


    @Builder.Default
    private List<CompetenceEntry> competences = new ArrayList<>();

    @Builder.Default
    private List<String> objectifsCarriereIds = new ArrayList<>();

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    // Classe interne pour les competences de l'employe
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompetenceEntry {
        private String skillId;
        private String nom;
        private int niveau;           // 1 a 5
        private String dateAcquisition;
        private String commentaire;
    }
}
