package tn.iteam.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.admin.service.AdminCareerGoalService;
import tn.iteam.model.CareerGoal;

import java.util.List;

@RestController
@RequestMapping("/api/admin/career-goals")
@RequiredArgsConstructor
public class AdminCareerGoalController {

    private final AdminCareerGoalService adminCareerGoalService;

    @GetMapping
    public List<CareerGoal> getAll() {
        return adminCareerGoalService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        adminCareerGoalService.delete(id);
    }
}