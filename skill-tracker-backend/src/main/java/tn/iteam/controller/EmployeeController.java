package tn.iteam.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iteam.dto.EmployeeDTO;
import tn.iteam.model.Employee;
import tn.iteam.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    // GET /api/employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAll(
            @RequestParam(required = false) String departement,
            @RequestParam(required = false) String niveau) {

        if (departement != null) return ResponseEntity.ok(employeeService.findByDepartement(departement));
        if (niveau != null)      return ResponseEntity.ok(employeeService.findByNiveau(niveau));
        return ResponseEntity.ok(employeeService.findAll());
    }

    // GET /api/employees/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable String id) {
        return ResponseEntity.ok(employeeService.findById(id));
    }

    // POST /api/employees
    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.create(dto));
    }

    // PUT /api/employees/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable String id,
                                           @RequestBody @Valid EmployeeDTO dto) {
        return ResponseEntity.ok(employeeService.update(id, dto));
    }

    // DELETE /api/employees/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
