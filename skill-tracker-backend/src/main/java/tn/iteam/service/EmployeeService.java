package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.dto.EmployeeDTO;
import tn.iteam.model.Employee;
import tn.iteam.repository.EmployeeRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    // ─── Lister tous les employes ─────────────────────
    public List<Employee> findAll() {
        String email = getCurrentUserEmail();
        return employeeRepository.findByUserId(email);
    }

    // ─── Trouver par ID ───────────────────────────────
    public Employee findById(String id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé avec l'ID : " + id));

        String email = getCurrentUserEmail();

        if (!employee.getUserId().equals(email)) {
            throw new RuntimeException("Accès refusé");
        }

        return employee;
    }

    // ─── Creer un employe ─────────────────────────────
    public Employee create(EmployeeDTO dto) {

        String email = getCurrentUserEmail();

        Employee employee = Employee.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .poste(dto.getPoste())
                .departement(dto.getDepartement())
                .niveauExperience(dto.getNiveauExperience())
                .competences(dto.getCompetences() != null ? dto.getCompetences() : List.of())
                .objectifsCarriereIds(dto.getObjectifsCarriereIds() != null ? dto.getObjectifsCarriereIds() : List.of())
                .userId(email)   // 🔥 IMPORTANT
                .build();

        return employeeRepository.save(employee);
    }

    // ─── Mettre a jour un employe ─────────────────────
    public Employee update(String id, EmployeeDTO dto) {

        Employee existing = findById(id);

        String email = getCurrentUserEmail();

        if (!existing.getUserId().equals(email)) {
            throw new RuntimeException("Accès refusé");
        }

        existing.setNom(dto.getNom());
        existing.setPrenom(dto.getPrenom());
        existing.setEmail(dto.getEmail());
        existing.setTelephone(dto.getTelephone());
        existing.setPoste(dto.getPoste());
        existing.setDepartement(dto.getDepartement());
        existing.setNiveauExperience(dto.getNiveauExperience());
        if (dto.getCompetences() != null) existing.setCompetences(dto.getCompetences());
        existing.setUpdatedAt(LocalDateTime.now());

        return employeeRepository.save(existing);
    }

    // ─── Supprimer un employe ─────────────────────────
    public void delete(String id) {

        Employee existing = findById(id);

        String email = getCurrentUserEmail();

        if (!existing.getUserId().equals(email)) {
            throw new RuntimeException("Accès refusé");
        }

        employeeRepository.deleteById(id);
    }

    // ─── Recherche par departement ────────────────────
    public List<Employee> findByDepartement(String departement) {
        String email = getCurrentUserEmail();
        return employeeRepository.findByUserIdAndDepartement(email, departement);
    }

    // ─── Recherche par niveau ─────────────────────────
    public List<Employee> findByNiveau(String niveau) {
        String email = getCurrentUserEmail();
        return employeeRepository.findByUserIdAndNiveauExperience(email, niveau);
    }
}
