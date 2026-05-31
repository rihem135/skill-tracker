package tn.iteam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iteam.dto.TrainingProgressDTO;
import tn.iteam.service.UserTrainingsService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserTrainingController {

    private final UserTrainingsService userTrainingsService;

    @PostMapping("/trainings")
    public ResponseEntity<Void> save(@RequestBody List<String> ids) {

        userTrainingsService.saveUserTrainings(ids);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/trainings")
    public List<String> getUserTrainings() {
        return userTrainingsService.getUserTrainings();
    }

    @PostMapping("/training/progress")
    public ResponseEntity<Void> saveProgress(@RequestBody TrainingProgressDTO dto) {
        userTrainingsService.saveProgress(dto);
        return ResponseEntity.ok().build();
    }
}