package tn.iteam.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iteam.dto.CareerGoalDTO;
import tn.iteam.model.CareerGoal;
import tn.iteam.service.CareerGoalService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/career-goals")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CareerGoalController {
    private final CareerGoalService careerGoalService;

    @GetMapping
    public ResponseEntity<List<CareerGoal>> getMyGoals() {
        return ResponseEntity.ok(careerGoalService.findMyGoals());
    }

    @PostMapping
    public ResponseEntity<CareerGoal> create(@RequestBody CareerGoalDTO dto) {
        return ResponseEntity.ok(careerGoalService.create(dto));
    }

    @PatchMapping("/{id}/progression")
    public ResponseEntity<CareerGoal> updateProgression(@PathVariable String id,
                                                        @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(careerGoalService.updateProgression(id, body.get("progression")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        careerGoalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
