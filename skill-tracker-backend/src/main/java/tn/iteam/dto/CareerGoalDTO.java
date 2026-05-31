package tn.iteam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CareerGoalDTO {
    @NotBlank
    private String titre;

    private String description;
    private String statut;
    private LocalDate dateEcheance;
    private int progression;
    private List<String> skillsCibleesIds;
}
