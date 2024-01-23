package com.jessicarosier.habittrackerjsp.models;

import jakarta.persistence.*;

import java.util.List;

    @Entity
    public class Category {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        private String color;


        @OneToMany(mappedBy = "category")
        private List<Habit> habits;

        public Category() {}

        public Category(String name, String color) {
            this.name = name;
            this.color = color;
        }

        public Category(Long id, String name, String color) {
            this.id = id;
            this.name = name;
            this.color = color;
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

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
}
