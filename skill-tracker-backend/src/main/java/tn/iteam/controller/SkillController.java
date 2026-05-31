package tn.iteam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.model.Skill;
import tn.iteam.service.SkillService;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    // ⭐ GET ALL
    @GetMapping
    public List<Skill> getAll() {
        return skillService.findAll();
    }

    // ⭐ GET BY ID
    @GetMapping("/{id}")
    public Skill getById(@PathVariable String id) {
        return skillService.findById(id);
    }

    // ⭐ CREATE
    @PostMapping
    public Skill create(@RequestBody Skill skill) {
        return skillService.create(skill);
    }

    // ⭐ UPDATE
    @PutMapping("/{id}")
    public Skill update(@PathVariable String id,
                        @RequestBody Skill skill) {
        return skillService.update(id, skill);
    }

    // ⭐ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        skillService.delete(id);
    }

    // ⭐ FILTER
    @GetMapping("/category/{categorie}")
    public List<Skill> byCategory(@PathVariable String categorie) {
        return skillService.findByCategorie(categorie);
    }

    // ⭐ SEARCH
    @GetMapping("/search")
    public List<Skill> search(@RequestParam String keyword) {
        return skillService.search(keyword);
    }

    // ⭐ USER SKILLS
    @GetMapping("/my-skills")
    public List<Skill> getMySkills() {
        return skillService.getUserSkills();
    }
}