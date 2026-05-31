package tn.iteam.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.iteam.dto.SaveSkillsRequest;
import tn.iteam.service.UserSkillService;

@RestController
@RequestMapping("/api/user/skills")
@RequiredArgsConstructor
public class UserSkillController {

    private final UserSkillService userSkillService;

    @PostMapping("/save")
    public void saveSkills(@RequestBody SaveSkillsRequest request) {

        userSkillService.saveSkills(request);
    }
}