package tn.iteam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;

    private String nom;

    private String prenom;

    @Builder.Default
    private String role = "EMPLOYEE"; // ADMIN, EMPLOYEE

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private boolean active = true;

    // ⭐ compétences sélectionnées
    @Builder.Default
    private List<String> selectedSkillIds = new ArrayList<>();

    // ⭐ formations sélectionnées (CORRIGÉ + SAFE)
    @Builder.Default
    private List<String> selectedTrainingIds = new ArrayList<>();

    private List<String> skills;

    private List<TrainingProgress> trainingProgress;
}