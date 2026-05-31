package tn.iteam.dto;

import lombok.Data;

@Data
public class TrainingProgressDTO {

    private String trainingId;
    private int timeSpentSeconds;
    private double progress;
    private String status;
}