package tn.iteam.dto;

import lombok.Data;

import java.util.List;

@Data
public class SaveSkillsRequest {

    private List<String> skillIds;
}