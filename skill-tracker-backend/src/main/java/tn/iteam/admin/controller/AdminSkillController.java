package tn.iteam.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.model.Skill;
import tn.iteam.repository.SkillRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin/skills")
@RequiredArgsConstructor
public class AdminSkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAll() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill create(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public Skill update(@PathVariable String id, @RequestBody Skill skill) {
        skill.setId(id);
        return skillRepository.save(skill);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        skillRepository.deleteById(id);
    }
}