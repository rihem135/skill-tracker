package tn.iteam.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "skills")
public class Skill {

    @Id
    private String id;
    private String userId;
    private String nom;
    private String description;
    private String categorie;
    private String niveauRequis;

    private List<String> technologiesAssociees;
}