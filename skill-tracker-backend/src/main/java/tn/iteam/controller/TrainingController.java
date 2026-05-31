package tn.iteam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.model.Training;
import tn.iteam.service.TrainingService;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;

    @GetMapping
    public List<Training> getAll() {
        return trainingService.findAll();
    }

    @PostMapping
    public Training create(@RequestBody Training training) {
        return trainingService.create(training);
    }

    @PutMapping("/{id}")
    public Training update(@PathVariable String id,
                           @RequestBody Training training) {
        return trainingService.update(id, training);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        trainingService.delete(id);
    }
}