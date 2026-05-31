package tn.iteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iteam.dto.TrainingProgressDTO;
import tn.iteam.model.TrainingProgress;
import tn.iteam.model.User;
import tn.iteam.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserTrainingsService {

    private final UserRepository userRepository;

    // 💾 SAVE TRAININGS (CORRIGÉ - AJOUT SANS ÉCRASER)
    public void saveUserTrainings(List<String> ids) {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        // 🔥 initialisation sécurisée
        if (user.getSelectedTrainingIds() == null) {
            user.setSelectedTrainingIds(new ArrayList<>());
        }

        List<String> existing = user.getSelectedTrainingIds();

        // 🔥 AJOUT SANS SUPPRESSION DES ANCIENS
        for (String id : ids) {
            if (!existing.contains(id)) {
                existing.add(id);
            }
        }

        user.setSelectedTrainingIds(existing);

        userRepository.save(user);
    }

    // 💾 SAVE PROGRESS (OK)
    public void saveProgress(TrainingProgressDTO dto) {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        if (user.getTrainingProgress() == null) {
            user.setTrainingProgress(new ArrayList<>());
        }

        List<TrainingProgress> list = user.getTrainingProgress();

        // 🔥 remplacer ancien progress du même training
        list.removeIf(p -> p.getTrainingId().equals(dto.getTrainingId()));

        TrainingProgress progress = new TrainingProgress();
        progress.setTrainingId(dto.getTrainingId());
        progress.setTimeSpentSeconds(dto.getTimeSpentSeconds());
        progress.setProgress(dto.getProgress());
        progress.setStatus(dto.getStatus());

        list.add(progress);

        user.setTrainingProgress(list);

        userRepository.save(user);
    }

    // 📥 GET TRAININGS USER
    public List<String> getUserTrainings() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        return user.getSelectedTrainingIds();
    }
}