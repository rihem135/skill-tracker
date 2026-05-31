package tn.iteam.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.repository.*;
import tn.iteam.security.AdminSecurity;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final TrainingRepository trainingRepository;

    public Map<String, Long> getStats() {
        AdminSecurity.checkAdmin();

        return Map.of(
                "users", userRepository.count(),
                "employees", employeeRepository.count(),
                "skills", skillRepository.count(),
                "trainings", trainingRepository.count()
        );
    }
}