package tn.iteam.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.iteam.model.Employee;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    List<Employee> findByUserId(String userId);

    List<Employee> findByUserIdAndDepartement(String userId, String departement);

    List<Employee> findByUserIdAndNiveauExperience(String userId, String niveauExperience);

    Optional<Employee> findByEmail(String email);
}
