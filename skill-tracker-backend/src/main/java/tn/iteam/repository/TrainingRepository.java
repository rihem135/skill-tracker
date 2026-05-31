package tn.iteam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.iteam.model.Training;

import java.util.List;

public interface TrainingRepository extends MongoRepository<Training, String> {

    List<Training> findBySkillsCiblesIdsContaining(String skillId);

    List<Training> findByGratuit(boolean gratuit);
}