package tn.iteam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.iteam.model.Recommendation;

import java.util.List;

@Repository
public interface RecommendationRepository extends MongoRepository<Recommendation, String> {

    List<Recommendation> findByUserIdOrderByScoreRelevanceDesc(String userId);

    //List<Recommendation> findByEmployeeIdAndVueFalse(String employeeId);

    // 🔥 AJOUT IMPORTANT
    //List<Recommendation> findByEmployeeId(String employeeId);
    List<Recommendation> findByUserId(String userId);
}
