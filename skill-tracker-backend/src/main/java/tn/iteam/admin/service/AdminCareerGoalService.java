package tn.iteam.admin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.iteam.model.CareerGoal;
import tn.iteam.repository.CareerGoalRepository;
import tn.iteam.security.AdminSecurity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCareerGoalService {

    private final CareerGoalRepository careerGoalRepository;

    public List<CareerGoal> getAll() {
        AdminSecurity.checkAdmin();
        return careerGoalRepository.findAll();
    }

    public void delete(String id) {
        AdminSecurity.checkAdmin();
        careerGoalRepository.deleteById(id);
    }
}