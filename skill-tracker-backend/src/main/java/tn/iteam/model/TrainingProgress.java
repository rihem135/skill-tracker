package tn.iteam.model;

import lombok.Data;

@Data
public class TrainingProgress {

    private String trainingId;

    private int timeSpentSeconds;

    private double progress;

    private String status;
}