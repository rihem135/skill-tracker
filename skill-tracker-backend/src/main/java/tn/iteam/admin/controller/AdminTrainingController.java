package tn.iteam.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.admin.service.AdminTrainingService;
import tn.iteam.model.Training;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trainings")
@RequiredArgsConstructor
public class AdminTrainingController {

    private final AdminTrainingService adminTrainingService;

    @GetMapping
    public List<Training> getAll() {
        return adminTrainingService.getAll();
    }

    @PostMapping
    public Training create(@RequestBody Training training) {
        return adminTrainingService.create(training);
    }

    @PutMapping("/{id}")
    public Training update(@PathVariable String id,
                           @RequestBody Training training) {
        return adminTrainingService.update(id, training);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        adminTrainingService.delete(id);
    }
}