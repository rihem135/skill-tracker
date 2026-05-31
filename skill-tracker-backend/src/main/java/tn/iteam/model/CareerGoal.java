package tn.iteam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "career_goals")
public class CareerGoal {

    @Id
    private String id;

    private String userId; // 🔥 IMPORTANT (sécurité)

    //private String employeeId;

    private String titre;
    private String description;
    private String statut;
    private LocalDate dateEcheance;
    private int progression;
    private List<String> skillsCibleesIds;
}