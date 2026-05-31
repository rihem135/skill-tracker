package tn.iteam.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import tn.iteam.model.Employee;

import java.util.List;

@Data
public class EmployeeDTO {
    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @Email
    @NotBlank
    private String email;

    private String telephone;

    @NotBlank
    private String poste;

    @NotBlank
    private String departement;

    private String niveauExperience;
    private List<Employee.CompetenceEntry> competences;
    private List<String> objectifsCarriereIds;
}
