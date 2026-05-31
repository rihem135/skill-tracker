package tn.iteam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.iteam.model.CareerGoal;

import java.util.List;

@Repository
public interface CareerGoalRepository extends MongoRepository<CareerGoal, String> {
    //List<CareerGoal> findByEmployeeId(String employeeId);
    //List<CareerGoal> findByEmployeeIdAndStatut(String employeeId, String statut);
    List<CareerGoal> findByUserId(String userId);
    List<CareerGoal> findByUserIdAndStatut(String userId, String statut);
}
