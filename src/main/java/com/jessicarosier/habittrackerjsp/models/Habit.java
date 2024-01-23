package com.jessicarosier.habittrackerjsp.models;

import jakarta.persistence.*;


    @Entity
    public class Habit {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;


        private String name;

        private boolean completed;

        private String description;

        private String frequency;

        private String notes;

        private String priority;

        private Long catId;

        private Long streak;

        @ManyToOne
        private User user;

        @ManyToOne
        private Date date;


        @ManyToOne
        private Category category;

        public Habit() {
        }

        public Habit(Long id, String name, String frequency, Category category) {
            this.id = id;
            this.name = name;
            this.frequency = frequency;
            this.category = category;
        }

        public Habit(String name, String frequency, Category category) {
            this.name = name;
            this.frequency = frequency;
            this.category = category;
        }

        public Habit(String name, String frequency, Long catId) {
            this.name = name;
            this.frequency = frequency;
            this.catId = catId;
        }

        public Habit(Long id, String name, boolean completed, String description, String frequency, String notes, Category category, String priority) {
            this.id = id;
            this.name = name;
            this.completed = completed;
            this.description = description;
            this.frequency = frequency;
            this.notes = notes;
            this.category = category;
            this.priority = priority;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public boolean isCompleted() {
            return completed;
        }

        public void setCompleted(boolean completed) {
            this.completed = completed;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getFrequency() {
            return frequency;
        }

        public void setFrequency(String frequency) {
            this.frequency = frequency;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public Category getCategory() {
            return category;
        }

        public void setCategory(Category category) {
            this.category = category;
        }

        public String getPriority() {
            return priority;
        }

        public void setPriority(String priority) {
            this.priority = priority;
        }

        public Long getCatId() {
            return catId;
        }

        public void setCatId(Long catId) {
            this.catId = catId;
        }

    }
